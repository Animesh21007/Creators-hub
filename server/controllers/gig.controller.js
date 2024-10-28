import Gig from '../models/gig.model.js';
import createError from '../utils/errorHandle.js';

export const createGig = async (req, res, next) => {
	console.log(req);
	if (!req.isSeller)
		return next(createError(403, 'Only seller can create Gigs!'));
	try {
		const newGig = new Gig({
			userId: req.userID,
			...req.body,
		});
		const savedGig = await newGig.save();
		res.status(201).json(savedGig);
	} catch (err) {
		console.log('Error : ', err);
		next(err);
	}
};
export const deleteGig = async (req, res, next) => {
	const gig = await Gig.findById(req.params.id);
	if (gig.userId !== req.userID)
		return next(createError(403, 'You can only delete your gigs!'));

	try {
		await Gig.findByIdAndDelete(req.params.id);
		return res.status(200).send('Gig deleted successfully!');
	} catch (err) {
		console.log('Error : ', err);
		next(err);
	}
};
export const getGig = async (req, res, next) => {
	try {
		const gig = await Gig.findById(req.params.id);
		if (!gig) return next(createError(404, 'Gig not found!'));

		return res.status(200).send(gig);
	} catch (err) {
		console.log('Error : ', err);
		next(err);
	}
};
export const getGigs = async (req, res, next) => {
	const qur = req.query;
	console.log(qur);
	const filter = {
		...(qur.userId && { userId: qur.userId }),
		...(qur.cat && { cat: qur.cat }),
		...(qur.search && {
			title: {
				$regex: qur.search,
				$options: 'i',
			},
		}),
	};

	if (qur.min || qur.max) {
		filter.price = {};
		if (qur.min !== 'undefined' && !isNaN(qur.min)) {
			filter.price = { ...filter.price, $gt: Number(qur.min) };
		}
		if (qur.max !== 'undefined' && !isNaN(qur.max)) {
			filter.price = { ...filter.price, $lt: Number(qur.max) };
		}
		// console.log(filter);
		if (Object.keys(filter.price).length === 0) {
			delete filter.price;
		}
	}

	try {
		const gigs = await Gig.find(filter).sort({ [qur.sort]: -1 });
		// console.log('Gell\n');
		if (!gigs) return next(createError(404, 'No gigs found!'));
		res.status(200).send(gigs);
	} catch (err) {
		console.log('Error : ', err);
		next(err);
	}
};
