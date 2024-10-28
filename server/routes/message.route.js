import express from 'express';
import {
	createMessage,
	getMessages,
} from '../controllers/message.controller.js';
import { verifyToken } from '../middlewares/jAuth.js';

const router = express.Router();

router.get('/:id', verifyToken, getMessages);
router.post('/', verifyToken, createMessage);

export default router;
