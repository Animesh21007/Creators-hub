import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		img: {
			type: String,
			required: false,
		},
		desc: {
			type: String,
			required: false,
		},
		isSeller: {
			type: Boolean,
			default: false,
		},
		phone: {
			type: String,
			required: false,
		},
		country: {
			type: String,
			required: true,
		},
	},
	{
		// Automatically creates created at and updated at timestamps for schema
		timestamps: true,
	}
);

export default mongoose.model('User', userSchema);
