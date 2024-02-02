import Stripe from "stripe";
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";

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
    console.log(error);
  }
};

export const createPaymentIntent = async (req, res) => {
  const { items } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: await calculateTotalPrice(items),
    currency: "usd",
  });

  req.session.paymentIntentId = paymentIntent.id;
  res.status(200).send({
    clientSecret: paymentIntent.client_secret,
  });
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

    res.status(201).json(newOrder);
  } catch (error) {
    console.log(error);
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user");
    res.json(orders);
  } catch (error) {
    console.log(error);
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    if (!orders) {
      return res.status(404).json({
        message: "Orders not found",
      });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
  }
};
