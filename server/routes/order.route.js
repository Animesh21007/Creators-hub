import express from 'express';
import { verifyToken } from '../middlewares/jAuth.js';
import { createOrder, getOrders } from '../controllers/order.controller.js';

const router = express.Router();

router.post(`/newOrder/:gigId`, verifyToken, createOrder);
router.get('/', verifyToken, getOrders);

export default router;
