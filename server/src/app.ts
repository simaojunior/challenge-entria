import Koa, { Request, Response } from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import convert from 'koa-convert';
import cors from 'koa-cors';

import { koaPlayground } from 'graphql-playground-middleware';
import graphqlHTTP from 'koa-graphql';
import { buildSchema } from 'graphql';

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(convert(cors({ maxAge: 86400, credentials: true })));

const schema = buildSchema(`
	type Query {
		hello: String
	}

`);

router.get('/', ctx => {
	const info = ['/graphql -- GraphiQL', '/playground -- GraphQL Playground'];

	ctx.status = 200;
	ctx.body = info.join('/n');
});

router.all('/playground', koaPlayground({ endpoint: '/graphql' }));

const appGraphQL = convert(
	graphqlHTTP(async (request: Request, ctx: Response, koaContext) => {
		return {
			graphiql: false,
			schema,
			rootValue: {
				request: ctx.req,
			},
			context: {
				koaContext,
			},
		};
	}),
);

// router.all(
// 	'/graphql',
// 	graphqlHTTP({
// 		schema,
// 		graphiql: true,
// 		rootValue: root,
// 	}),
// );
router.all('/graphql', appGraphQL);

app.use(router.routes()).use(router.allowedMethods());

export default app;
