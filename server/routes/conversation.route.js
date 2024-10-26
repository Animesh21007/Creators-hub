import express from 'express';
import { verifyToken } from '../middlewares/jAuth.js';
import {
	createConvo,
	getConvo,
	getConvos,
	updateConvo,
} from '../controllers/conversation.controller.js';

const router = express.Router();

router.post('/createConvo', verifyToken, createConvo);
router.get('/', verifyToken, getConvos);
router.get('/single/:id', verifyToken, getConvo);
router.post('/:id', verifyToken, updateConvo);

export default router;
