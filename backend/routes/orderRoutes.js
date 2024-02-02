import express from "express";

import {
  createPaymentIntent,
  createOrder,
} from "../controllers/orderController.js";
import { authUser } from "../middleware/authMiddleware.js";
import { getOrders } from "../controllers/orderController.js";

import { getMyOrders } from "../controllers/orderController.js";

const router = express.Router();

router.post("/create-payment-intent", authUser, createPaymentIntent);
router.post("/create-order", authUser, createOrder);
router.get("/", getOrders);
router.get("/myorders", authUser, getMyOrders);
export default router;
