import express from 'express';

import {
  createPaymentIntent,
  createOrder,
  getTotalOrders,
  getTotalMyOrders,
  getMyOrders,
  getOrders,
} from '../controllers/orderController.js';
import { authUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/myorders', authUser, getMyOrders);
router.get('/myorders/total', authUser, getTotalMyOrders);
router.post('/create-payment-intent', authUser, createPaymentIntent);
router.post('/create-order', authUser, createOrder);
router.get('/', getOrders);
router.get('/total', getTotalOrders);
export default router;
