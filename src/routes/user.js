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

router.get('/welcome', async (ctx, next) => {
  ctx.body = 'welcome';
});

router.get('/:loginId', async (ctx, next) => {
  const { loginId } = ctx.params;
  ctx.body = await UserController.isExist(loginId);
});

router.post('/', async (ctx, next) => {
  const { loginId, loginPWD } = ctx.request.body;
  ctx.body = await UserController.register({ loginId, loginPWD });
});

router.delete('/:loginId', async (ctx, next) => {
  const { loginId } = ctx.params;
  ctx.body = await UserController.delUser(loginId);
});

// router.post('/login', async (ctx, next) => {
//   let appId = 'wx3984f435dcd5bd6f';
//   let appSecret = '';
//   const { code } = ctx.request.body;
//   ctx.body = await UserController.login({ appId, appSecret, code });
// });

// router.post('/decrypt', async (ctx, next) => {
//   let appId = 'wx3984f435dcd5bd6f';
//   const { sessionKey, encryptedData, iv } = ctx.request.body;
//   ctx.body = await UserController.decryptData({ appId, sessionKey, encryptedData, iv });
// });

// router.get('/token', async (ctx, next) => {
//   let appId = 'wx3984f435dcd5bd6f';
//   let appSecret = '';
//   ctx.body = await UserController.token({ appId, appSecret });
// });

module.exports = router;
// module.exports = () => compose([router.routes(), router.allowedMethods()]);
