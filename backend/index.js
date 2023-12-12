import "dotenv/config";
import express from "express";
import authRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
mongoose.connect(process.env.MONGO_URL);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/order", orderRouter);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
