/**
 * @description user router
 */

const Router = require('koa-router');
const UserController = require('../controllers/user');
// const compose = require('koa-compose');

const router = new Router();

router.prefix('/api/user');

router.get('/', async (ctx, next) => {
  ctx.status = 301;
  ctx.redirect('/index');
});

router.get('/index', async (ctx, next) => {
  ctx.info('asdasdasd');
  ctx.body = '这是首页';
});

router.get('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body;
  ctx.body = await isExist(userName);
});

module.exports = router;
// module.exports = () => compose([router.routes(), router.allowedMethods()]);
