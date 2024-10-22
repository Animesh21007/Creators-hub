import express from 'express';
import { verifyToken } from './../middlewares/jAuth.js';
import {
	getGig,
	getGigs,
	createGig,
	deleteGig,
} from './../controllers/gig.controller.js';

const router = express.Router();

router.get('/', verifyToken, getGigs);
router.get('/single/:id', verifyToken, getGig);
router.post('/newGig', verifyToken, createGig);
router.delete('/delGig/:id', verifyToken, deleteGig);

export default router;
