import mongoose, { Schema } from 'mongoose';

const gigSchema = new Schema(
	{
		userId: {
			type: String,
			required: true,
		},
		// gigId: {
		// 	type: String,
		// 	requied: true,
		// },
		title: {
			type: String,
			required: true,
		},
		desc: {
			type: String,
			required: true,
		},
		cat: {
			type: String,
			required: true,
		},
		price: {
			type: String,
			required: true,
		},
		cover: {
			type: String,
			required: true,
		},
		images: {
			type: [String],
			required: false,
		},
		totalStars: {
			type: Number,
			default: 0,
		},
		starNumber: {
			type: Number,
			default: 0,
		},
		shortTitle: {
			type: String,
			required: true,
		},
		shortDesc: {
			type: String,
			required: false,
		},
		deliveryTime: {
			type: Number,
			requied: true,
		},
		revisionNumber: {
			type: Number,
			default: 0,
		},
		features: {
			type: [String],
			requied: false,
		},
		sales: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('Gig', gigSchema);
