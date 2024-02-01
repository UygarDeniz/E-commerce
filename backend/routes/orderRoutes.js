import express from "express";
import Stripe from "stripe";
import { createPaymentIntent, createOrder } from "../controllers/orderController.js";
import { authUser } from "../middleware/authMiddleware.js";
import { getOrders } from "../controllers/orderController.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

router.post("/create-payment-intent", authUser, createPaymentIntent);
router.post("/create-order", authUser, createOrder);
router.get("/", getOrders)
export default router;