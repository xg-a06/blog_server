const { error } = require('../../utils/tools');
const { systemError } = require('../../config/const/errorCode');
const { logger } = require('../../utils/logger');

module.exports = () => async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    const exception = err;
    exception.message = `catch ${ctx.requestId} ${err.message}`;
    logger.error(exception);
    ctx.status = 200;
    ctx.body = error(systemError);
  }
};
