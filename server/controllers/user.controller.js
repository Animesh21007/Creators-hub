import User from '../models/user.model.js';
import createError from '../utils/errorHandle.js';

export const deleteUser = async (req, res, next) => {
	try {
		const userID = req.params.id;
		const user = await User.findById(req.params.id.toString());
		if (!user) {
			next(createError(404, 'User not found!'));
		}
		if (req.userID?.toString() !== userID) {
			next(createError(403, 'You are not authorized to delete!'));
		} else {
			await User.findByIdAndDelete(userID);
			return res.status(200).send('Successfully logged out!');
		}
	} catch (err) {
		console.log(err);
		next(err);
	}
};

export const getUser = async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id.toString());
		if (!user) return next(createError(404, 'User not found!'));
		return res.status(200).send(user);
	} catch (err) {
		console.log(err);
		next(err);
	}
};
