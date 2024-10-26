import createError from './../utils/errorHandle.js';
import Order from '../models/order.model.js';
import Gig from '../models/gig.model.js';

export const createOrder = async (req, res, next) => {
	try {
		const gig = await Gig.findById(req.params.gigId);

		const newOrder = new Order({
			gigId: gig._id,
			img: gig.cover,
			title: gig.title,
			buyerId: req.userID,
			sellerId: gig.userId,
			price: gig.price,
			payment_intent: 'Temp',
		});

		await newOrder.save();
		return res.status(201).send('Order placed successfully!');
	} catch (err) {
		console.log(err);
		next(err);
	}
};

export const getOrders = async (req, res, next) => {
	try {
		const orders = await Order.find({
			// isCompleted: true,
			...(req.isSeller ? { sellerId: req.userID } : { buyerId: req.userID }),
		});
		return res.status(200).send(orders);
	} catch (err) {
		console.log(err);
		next(err);
	}
};
