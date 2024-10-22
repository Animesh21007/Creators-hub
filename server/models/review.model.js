import mongoose, { Schema } from 'mongoose';

const reviewSchema = new Schema(
	{
		gigId: {
			type: String,
			required: true,
		},
		userId: {
			type: String,
			requied: true,
		},
		desc: {
			type: String,
			requied: true,
		},
		star: {
			type: Number,
			requied: true,
			enum: [1, 2, 3, 4, 5],
		},
	},
	{
		// Automatically creates created at and updated at timestamps for schema
		timestamps: true,
	}
);

export default mongoose.model('Review', reviewSchema);
