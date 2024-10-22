import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import createError from '../utils/errorHandle.js';

export const signup = async (req, res, next) => {
	try {
		const user = await User.findOne({ username: req.body.username });
		if (user?._id) {
			next(createError(400, 'User already exists!'));
		}
		const pass = req.body.password;
		const hashedPass = bcrypt.hashSync(pass, 11);
		const newUser = new User({
			...req.body,
			password: hashedPass,
		});
		await newUser.save();
		return res.status(201).send('User created successfully!');
	} catch (err) {
		console.log(err);
		next(err);
	}
};

export const login = async (req, res, next) => {
	try {
		const user = await User.findOne({ username: req.body.username });
		if (!user) {
			next(createError(404, 'User not found!'));
		}

		const isCorrPass = bcrypt.compareSync(
			req.body.password.toString(),
			user.password.toString()
		);

		if (!isCorrPass) {
			// console.log(user.password);
			next(createError(401, 'Invalid username or password!'));
		}

		const token = jwt.sign(
			{ id: user._id, isSeller: user.isSeller },
			process.env.JWT_SECRET
		);
		const { password, ...userInfo } = user?._doc;
		return res
			.cookie('accessToken', token, {
				httpOnly: true,
			})
			.status(200)
			.send(userInfo);
	} catch (err) {
		console.log(err);
		next(err);
	}
};

export const logout = async (req, res) => {
	try {
		return res
			.clearCookie('accessToken', {
				secure: true,
				httpOnly: true,
				sameSite: 'none', // As client and server are on different ports
			})
			.status(200)
			.send('User logged out successfully!');
	} catch (err) {
		next(err);
	}
};
