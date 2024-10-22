import mongoose, { Schema } from 'mongoose';

const conversationSchema = new Schema(
	{
		id: {
			type: String,
			required: true,
			unique: true,
		},
		sellerId: {
			type: String,
			required: true,
		},
		buyerId: {
			type: String,
			required: true,
		},
		readBySeller: {
			type: Boolean,
			default: false,
			required: true,
		},
		readByBuyer: {
			type: Boolean,
			default: false,
			required: true,
		},
		lastMsg: {
			type: String,
			required: false,
		},
	},
	{
		// Automatically creates created at and updated at timestamps for schema
		timestamps: true,
	}
);

export default mongoose.model('Conversation', conversationSchema);
