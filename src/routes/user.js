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
  ctx.body = 'index';
});

router.get('/isExist/:loginId', async (ctx, next) => {
  const { loginId } = ctx.params;
  ctx.body = await UserController.isExist(loginId);
});

router.post('/register', async (ctx, next) => {
  console.log(123);
  const { loginId, loginPWD } = ctx.request.body;
  ctx.body = await UserController.register({ loginId, loginPWD });
});

module.exports = router;
// module.exports = () => compose([router.routes(), router.allowedMethods()]);
