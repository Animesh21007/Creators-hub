import createError from './../utils/errorHandle.js';
import Order from '../models/order.model.js';
import Gig from '../models/gig.model.js';
import Stripe from 'stripe';

export const createPayment = async (req, res, next) => {
	try {
		const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

		const gig = await Gig.findById(req.params.id);

		const payment_intent = await stripe.paymentIntents.create({
			amount: gig.price,
			currency: 'usd',
			automatic_payment_methods: {
				enabled: true,
			},
		});

		const newOrder = new Order({
			gigId: gig._id,
			img: gig.cover,
			title: gig.title,
			buyerId: req.userID,
			sellerId: gig.userId,
			price: gig.price,
			payment_intent: payment_intent.id,
		});
		// console.log(newOrder, req.userID, 'This is req something');

		await newOrder.save();
		res.status(201).send({ clientSecret: payment_intent.client_secret });
	} catch (err) {
		next(err);
	}
};

export const getOrders = async (req, res, next) => {
	try {
		const orders = await Order.find({
			// isCompleted: true,
			...(req.isSeller ? { sellerId: req.userID } : { buyerId: req.userID }),
		});
		// console.log(orders);
		return res.status(200).send(orders);
	} catch (err) {
		console.log(err);
		next(err);
	}
};

export const confirm = async (req, res, next) => {
	try {
		const order = await Order.findOneAndUpdate(
			{
				payment_intent: req.body.payment_intent,
			},
			{
				$set: {
					isCompleted: true,
				},
			},
			{ new: true }
		);
		res.status(200).send('Order has been confirmed!');
	} catch (err) {
		next(err);
	}
};
