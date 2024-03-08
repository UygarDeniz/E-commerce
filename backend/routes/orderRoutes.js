import express from "express";

import {
  createPaymentIntent,
  createOrder,
} from "../controllers/orderController.js";
import { authUser } from "../middleware/authMiddleware.js";
import { getOrders } from "../controllers/orderController.js";

import { getMyOrders } from "../controllers/orderController.js";

const router = express.Router();

router.get("/myorders", authUser, getMyOrders);
router.post("/create-payment-intent", authUser, createPaymentIntent);
router.post("/create-order", authUser, createOrder);
router.get("/", getOrders);
export default router;
