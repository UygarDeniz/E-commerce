import Stripe from 'stripe';
import Product from '../models/productModel.js';
import Order from '../models/orderModel.js';
import { ORDERS_PAGE_SIZE } from '../constants.js';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const calculateTotalPrice = async (items) => {
  let total = 0;

  try {
    for (let i = 0; i < items.length; i++) {
      const product = await Product.findById(items[i]._id);
      total += product.price * items[i].quantity;
    }
    return total * 100;
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

export const createPaymentIntent = async (req, res) => {
  const { items } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: await calculateTotalPrice(items),
      currency: 'usd',
    });

    req.session.paymentIntentId = paymentIntent.id;
    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

export const createOrder = async (req, res) => {
  const { itemsFromClient, shippingAddress } = req.body;

  try {
    const itemsFromDatabase = await Product.find({
      _id: { $in: itemsFromClient.map((item) => item._id) },
    });

    const updatedItemsWithPrice = itemsFromClient.map((itemFromClient) => {
      const foundItem = itemsFromDatabase.find(
        (itemFromDB) =>
          itemFromDB._id.toString() === itemFromClient._id.toString()
      );

      return {
        ...itemFromClient,
        price: foundItem.price,
        product: foundItem._id,
      };
    });
    for (const item of updatedItemsWithPrice) {
      if (item.quantity > item.countInStock) {
        return res.status(400).json({
          message: `Not enough stock for product ${item.product}. Available: ${item.countInStock}, Requested: ${item.quantity}`,
        });
      }
    }

    const totalPrice = updatedItemsWithPrice.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const newOrder = new Order({
      user: req.user._id,
      products: updatedItemsWithPrice,
      shippingAddress,
      totalPrice,
      paymentIntentId: req.session.paymentIntentId,
      isPaid: false,
    });

    await newOrder.save();
    for (const item of updatedItemsWithPrice) {
      await Product.updateOne(
        { _id: item.product },
        { $inc: { countInStock: -item.quantity } }
      );
    }

    res.status(201).json(newOrder);
  } catch (error) {
    console.log(error);
  }
};

export const getOrders = async (req, res) => {
  const page = Number(req.query.page) || 1;

  try {
    const orders = await Order.find({})
      .populate('user')
      .sort({ createdAt: -1 })
      .limit(ORDERS_PAGE_SIZE)
      .skip(ORDERS_PAGE_SIZE * (page - 1));
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
  }
};

export const getTotalOrders = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments({});
    const totalPages = Math.ceil(totalOrders / ORDERS_PAGE_SIZE);
    return res.status(200).json({ totalPages });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

export const getMyOrders = async (req, res) => {
  const page = Number(req.query.page) || 1;

  try {
    const orders = await Order.find({ user: req.user._id })
      .limit(ORDERS_PAGE_SIZE)
      .skip(ORDERS_PAGE_SIZE * (page - 1))
      .sort({
        createdAt: -1,
      });
    if (!orders) {
      return res.status(404).json({
        message: 'Orders not found',
      });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
  }
};

export const getTotalMyOrders = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments({ user: req.user._id });
    const totalPages = Math.ceil(totalOrders / ORDERS_PAGE_SIZE);
    return res.status(200).json({ totalPages });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};
