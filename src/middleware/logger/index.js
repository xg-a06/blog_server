
const ipAddr = require('ip');
const uuid = require('uuid');
const { accessLogger } = require('../../utils/logger');

const formatStart = (data) => {
  const {
    accessId,
    ip,
    method,
    host,
    url,
    referer,
    userAgent,
  } = data;
  return `${accessId} ${ip} ${method} ${host + url} ${referer} '${userAgent}'`;
};

const formatEnd = (data) => {
  const {
    accessId,
    responseTime,
    error,
  } = data;
  return `${accessId} ${responseTime} '${error || 'none'}'`;
};

module.exports = () => async (ctx, next) => {
  const start = Date.now();
  const ip = ipAddr.address();
  const accessId = uuid.v1();
  const {
    method,
    url,
    host,
    headers,
  } = ctx.request;

  let data = {
    accessId,
    ip,
    method,
    url,
    host,
    referer: headers.referer || null,
    userAgent: headers['user-agent'],
  };
  accessLogger.info(formatStart(data));
  try {
    await next();
    data = {
      accessId,
      responseTime: `${Date.now() - start}ms`,
    };
    accessLogger.info(formatEnd(data));
  } catch (err) {
    data = {
      accessId,
      responseTime: `${Date.now() - start}ms`,
      error: err.message,
    };
    accessLogger.error(formatEnd(data));
    ctx.throw(err);
  }
};
