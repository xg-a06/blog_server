/*
 * @Description:
 * @Author: xg-a06
 * @Date: 2019-06-07 00:19:19
 * @LastEditTime: 2019-06-11 00:32:48
 * @LastEditors: xg-a06
 */
const Router = require('koa-router');
const compose = require('koa-compose');


const router = new Router();

router.get('/', async (ctx, next) => {
  ctx.status = 301;
  ctx.redirect('/index');
});

router.get('/index', async (ctx, next) => {
  ctx.info('asdasdasd');
  ctx.body = '这是首页';
});


module.exports = () => compose([router.routes(), router.allowedMethods()]);
