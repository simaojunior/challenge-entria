import mongoose, { Document, Model, Types } from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

const TweetSchema = new mongoose.Schema(
	{
		content: {
			type: String,
			required: true,
		},
		author: {
			type: ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: {
			createdAt: 'createAt',
			updatedAt: 'updateAt',
		},
		collection: 'Tweet',
	},
);

export interface ITweet extends Document {
	content: string;
	author: Types.ObjectId;
	createAt: Date;
	updateAt: Date;
}

const TweetModel: Model<ITweet> = mongoose.model('Tweet', TweetSchema);

export default TweetSchema;
