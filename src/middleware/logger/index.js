const ipAddr = require('ip');
const uuid = require('uuid');
const { logger } = require('../../utils/logger');

const formatStart = data => {
  const { requestId, ip, method, host, url, referer, userAgent } = data;
  return `${requestId} ${ip} ${method} ${host + url} ${referer} '${userAgent}'`;
};

const formatEnd = data => {
  const { requestId, responseTime } = data;
  return `${requestId} ${responseTime}`;
};

module.exports = () => async (ctx, next) => {
  const requestId = uuid.v1();
  ctx.info = message => {
    logger.info(`${requestId} ${message}`);
  };
  ctx.requestId = requestId;
  const start = Date.now();
  const ip = ipAddr.address();
  const { method, url, host, headers } = ctx.request;
  let data = {
    requestId,
    ip,
    method,
    url,
    host,
    referer: headers.referer || null,
    userAgent: headers['user-agent']
  };
  logger.http(formatStart(data));
  await next();
  data = {
    requestId,
    responseTime: `${Date.now() - start}ms`
  };
  logger.http(formatEnd(data));
};
