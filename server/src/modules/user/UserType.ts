import { GraphQLObjectType, GraphQLString } from 'graphql';

import { IUser } from './UserModel';
import TweetType from '../tweet/TweetType';

const UserType = new GraphQLObjectType<IUser>({
	name: 'User',
	description: 'User data',
	fields: () => ({
		name: {
			type: GraphQLString,
			resolve: user => user.name,
		},
		email: {
			type: GraphQLString,
			resolve: user => user.email,
		},
		tweets: {
			type: TweetType,
		},
	}),
});

export default UserType;
