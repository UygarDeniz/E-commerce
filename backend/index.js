import "dotenv/config";
import express from "express";

import { fileURLToPath } from "url";
import path, { dirname } from "path";

import authRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import Stripe from "stripe";
import bodyParser from "body-parser";
import session from "express-session";
import Order from "./models/orderModel.js";

mongoose.connect(process.env.MONGO_URL);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.static(path.resolve(__dirname, "../frontend/dist")));

app.use(
  session({
    secret: "your secret here",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(cookieParser());

app.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        req.headers["stripe-signature"],
        process.env.STRIPE_WEBHOOK
      );
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;
      const order = await Order.findOne({ paymentIntentId: paymentIntent.id });

      if (order) {
        console.log(`Payment for order ${order.id} was successful!`);
        order.isPaid = true;
        await order.save();
      } else {
        console.log(`No order found for payment intent ${paymentIntent.id}`);
      }
    }

    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
  }
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/order", orderRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"));
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is listening on port 3000");
});
