import createError from '../utils/errorHandle.js';
import Review from '../models/review.model.js';
import Order from '../models/order.model.js';
import Gig from '../models/gig.model.js';

export const createReview = async (req, res, next) => {
	if (req.isSeller)
		return next(createError(403, "As a seller you can't create review!"));

	const newReview = new Review({
		userId: req.userID,
		gigId: req.body.gigId,
		desc: req.body.desc,
		star: req.body.star,
	});
	try {
		const review = await Review.findOne({
			gigId: req.body.gigId,
			userId: req.userID,
		});
		if (review?.length > 0 || review)
			return next(createError(403, 'You have already given a review!'));

		const order = await Order.findOne({
			gigId: req.body.gigId,
			buyerId: req.userID,
		});

		if (!order)
			return next(createError(403, "You haven't purchased this gig yet!"));

		await Gig.findByIdAndUpdate(req.body.gigId, {
			$inc: { totalStars: req.body.star, starNumber: 1 },
		});

		const savedReview = await newReview.save();
		res.status(201).send(savedReview);
	} catch (err) {
		next(err);
	}
};

export const deleteReview = async (req, res, next) => {
	if (req.isSeller)
		return next(createError(403, "As a seller you can't delete the review!"));

	try {
		const review = await Review.findById(req.params.id);
		if (review.userId !== req.userID)
			return next(createError(403, 'You can only delete your reviews!'));

		const rest = await Review.findByIdAndDelete(review._id);
		return res.status(200).send('Review deleted successfully!');
	} catch (err) {
		next(err);
	}
};

export const getReviews = async (req, res, next) => {
	try {
		const reviews = await Review.find({ gigId: req.params.gigId });
		return res.status(200).send(reviews);
	} catch (err) {
		next(err);
	}
};
