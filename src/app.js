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
