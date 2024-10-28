import createError from '../utils/errorHandle.js';
import Conversation from '../models/conversation.model.js';

export const createConvo = async (req, res, next) => {
	const newConvo = new Conversation({
		id: req.isSeller ? req.userID + req.body.to : req.body.to + req.userID,
		sellerId: req.isSeller ? req.userID : req.body.to,
		buyerId: req.isSeller ? req.body.to : req.userID,
		readBySeller: req.isSeller,
		readByBuyer: !req.isSeller,
	});

	// console.log(newConvo);

	try {
		const savedConvo = await newConvo.save();
		return res.status(201).send(savedConvo);
	} catch (err) {
		next(err);
	}
};

export const getConvos = async (req, res, next) => {
	try {
		const convos = await Conversation.find(
			req.isSeller ? { sellerId: req.userID } : { buyerId: req.userID }
		);
		// console.log(req.useID, req.isSeller, 'vghcc');
		return res.status(200).send(convos);
	} catch (err) {
		next(err);
	}
};

export const getConvo = async (req, res, next) => {
	try {
		const convo = await Conversation.findOne({ id: req.params.id });
		if (!convo) return next(createError(404, 'Conversation not found'));
		return res.status(200).send(convo);
	} catch (err) {
		next(err);
	}
};

export const updateConvo = async (req, res, next) => {
	try {
		const newConvo = await Conversation.findOneAndUpdate(
			{
				id: req.params.id,
			},
			{
				$set: {
					...(req.isSeller ? { readBySeller: true } : { readByBuyer: true }),
				},
			},
			{ new: true }
		);

		return res.status(200).send(newConvo);
	} catch (err) {
		next(err);
	}
};
