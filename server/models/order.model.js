import mongoose, { Schema } from 'mongoose';

const orderSchema = new Schema(
	{
		gigId: {
			type: String,
			required: true,
			// unique: true,
		},
		title: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		img: {
			type: String,
			required: false,
		},
		sellerId: {
			type: String,
			required: false,
		},
		buyerId: {
			type: String,
			default: false,
		},
		payment_intent: {
			type: String,
			required: false,
		},
		isCompleted: {
			type: Boolean,
			default: false,
		},
		// orderId: {
		// 	type: String,
		// 	required: true,
		// },
	},
	{
		// Automatically creates created at and updated at timestamps for schema
		timestamps: true,
	}
);

export default mongoose.model('Order', orderSchema);
