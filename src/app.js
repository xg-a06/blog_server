/*
 * @Description:
 * @Author: xg-a06
 * @Date: 2019-04-27 06:38:40
 * @LastEditTime: 2019-06-11 00:29:47
 * @LastEditors: xg-a06
 */
const Koa = require('koa');
const router = require('./routes');
const middleware = require('./middleware');
const { logger } = require('./utils/logger');

const app = new Koa();

middleware(app);
router(app);

app.on('error', (err, ctx) => {
  const exception = err;
  exception.message = `${ctx.requestId} ${err.message}`;
  logger.error(exception);
});
module.exports = app;
