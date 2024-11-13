import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import gigRouter from './routes/gig.route.js';
import orderRouter from './routes/order.route.js';
import messageRouter from './routes/message.route.js';
import reviewRouter from './routes/review.route.js';
import conversationRouter from './routes/conversation.route.js';
import authRouter from './routes/auth.route.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import compression from 'compression';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;
const connectionString = process.env.MONGO_DB_URL;
mongoose.set('strictQuery', true);

const connection = async () => {
	try {
		await mongoose.connect(connectionString);
		console.log('Connected to database sucessfully!');
	} catch (error) {
		console.log('Error while connecting to database!', error);
	}
};

// app.use(bodyParser());
app.use(express.json());
app.use(cookieParser());
app.use(compression());
app.use(
	cors({
		origin: [
			'http://localhost:5173',
			'http://localhost:5174',
			'https://api.cloudinary.com/v1_1/dagb2yluc/image/upload',
			'https://creatorshub.netlify.app',
		],
		methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
		credentials: true,
		// For allowing cookies
		// TODO : search on gpt for the how requesting user to allow cookies works
	})
);

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/messages', messageRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/conversations', conversationRouter);
app.use('/api/gigs', gigRouter);

app.use((err, req, res, next) => {
	const errStatus = err.status || 500;
	const errMsg = err.message || 'Something went wrong!';
	console.log(err);
	return res.status(errStatus).send(errMsg);
});

app.listen(PORT, () => {
	connection();
	console.log('Listening on port', PORT);
});
