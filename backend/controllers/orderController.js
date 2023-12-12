import Stripe from "stripe";
import Product from "../models/productModel.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = async (items) => {
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
    amount: await calculateOrderAmount(items),
    currency: "usd",
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};
