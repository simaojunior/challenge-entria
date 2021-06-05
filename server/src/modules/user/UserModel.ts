import mongoose, { Document, Model } from 'mongoose';

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},

		email: {
			type: String,
			required: true,
		},

		password: {
			type: String,
			required: true,
			hidden: true,
		},
	},
	{
		timestamps: {
			createdAt: 'createAt',
			updatedAt: 'updateAt',
		},
		collection: 'User',
	},
);

export interface IUser extends Document {
	name: string;
	email: string;
	password: string;
	createAt: Date;
	updateAt: Date;
}

const UserModel: Model<IUser> = mongoose.model('User', UserSchema);

export default UserModel;
