import express from 'express';
import { verifyToken } from '../middlewares/jAuth.js';
import {
	createPayment,
	getOrders,
	confirm,
} from '../controllers/order.controller.js';

const router = express.Router();

// router.post(`/newOrder/:gigId`, verifyToken, createOrder);
router.get('/', verifyToken, getOrders);
router.post('/create-payment-intent/:id', createPayment);
router.put('/', verifyToken, confirm);

export default router;
