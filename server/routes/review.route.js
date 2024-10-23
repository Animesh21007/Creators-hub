import express from 'express';
import { verifyToken } from '../middlewares/jAuth.js';
import {
	getReviews,
	deleteReview,
	createReview,
} from '../controllers/review.controller.js';

const router = express.Router();

router.get('/:gigId', getReviews);
router.post('/create', verifyToken, createReview);
router.delete('/:id', verifyToken, deleteReview);

export default router;
