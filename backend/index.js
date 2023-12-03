import "dotenv/config";
import express from "express";
import authRouter from "./routes/userRoutes.js";
import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URL)

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use("/api/auth", authRouter);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
