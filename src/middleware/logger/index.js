const ipAddr = require('ip');
const uuid = require('uuid');
const { logger } = require('../../utils/logger');

const formatStart = (data) => {
  const {
    accessId, ip, method, host, url, referer, userAgent,
  } = data;
  return `${accessId} ${ip} ${method} ${host + url} ${referer} '${userAgent}'`;
};

const formatEnd = (data) => {
  const { accessId, responseTime, error } = data;
  return `${accessId} ${responseTime} '${error || 'none'}'`;
};

module.exports = () => async (ctx, next) => {
  const start = Date.now();
  const ip = ipAddr.address();
  const requestId = uuid.v1();
  ctx.requestId = requestId;
  const {
    method, url, host, headers,
  } = ctx.request;

  let data = {
    requestId,
    ip,
    method,
    url,
    host,
    referer: headers.referer || null,
    userAgent: headers['user-agent'],
  };
  logger.http(formatStart(data));
  await next();
  data = {
    requestId,
    responseTime: `${Date.now() - start}ms`,
  };
  logger.http(formatEnd(data));
};
