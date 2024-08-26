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
import session from "express-session";
import webhookRouter from "./routes/webhookRoute.js";

mongoose.connect(process.env.MONGO_URL);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.static(path.resolve(__dirname, "../frontend/dist")));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(cookieParser());

app.use("/api/webhook", webhookRouter);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/order", orderRouter);

/* app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"));
}); */

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is listening on port 3000");
});
