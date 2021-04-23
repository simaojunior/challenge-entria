import Koa from 'koa';
import Router from 'koa-router';

const router = new Router();

const app = new Koa();

router.get('/', async (ctx: any) => {
  ctx.body = 'hello world!';
});

app.listen(3333, () => {
  console.log('Server running.');
});
