import jwt from 'jsonwebtoken';
import createError from '../utils/errorHandle.js';

export const verifyToken = async (req, res, next) => {
	try {
		const token = req.cookies.accessToken;
		if (!token) {
			next(createError(403, 'You are not logged in!'));
		}

		jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
			if (err) next(createError(403, 'Invalid token!'));
			// console.log(payload);
			req.userID = payload.id;
			req.isSeller = payload.idSelller;
		});
		// console.log(req);
		next();
	} catch (err) {
		console.log(err);
		next(err);
	}
};
