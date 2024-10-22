import mongoose, { Schema } from 'mongoose';

const messageSchema = new Schema(
	{
		userId: {
			type: String,
			required: true,
		},
		conversationId: {
			type: String,
			required: true,
		},
		desc: {
			type: String,
			required: false,
		},
	},
	{
		// Automatically creates created at and updated at timestamps for schema
		timestamps: true,
	}
);

export default mongoose.model('Message', messageSchema);
