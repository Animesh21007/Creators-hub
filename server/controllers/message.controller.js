import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';

export const createMessage = async (req, res, next) => {
	const newMsg = new Message({
		userId: req.userID,
		desc: req.body.desc,
		conversationId: req.body.conversationId,
	});

	try {
		const savedMsg = await newMsg.save();
		await Conversation.findOneAndUpdate(
			{
				id: req.body.conversationId,
			},
			{
				$set: {
					readBySeller: req.isSeller,
					readByBuyer: !req.isSeller,
					lastMsg: req.body.desc,
				},
			},
			{
				new: true,
			}
		);
		// console.log(savedMsg);
		res.status(201).send(savedMsg);
	} catch (err) {
		next(err);
	}
};

export const getMessages = async (req, res, next) => {
	try {
		const msgs = await Message.find({
			conversationId: req.params.id,
		});
		res.status(200).send(msgs);
	} catch (err) {
		next(err);
	}
};
