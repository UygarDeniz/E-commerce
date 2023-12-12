import express from "express";
import Stripe from "stripe";
import { createPaymentIntent } from "../controllers/orderController.js";
import { authUser } from "../middleware/authMiddleware.js";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

router.post("/create-payment-intent", authUser, createPaymentIntent);

export default router;