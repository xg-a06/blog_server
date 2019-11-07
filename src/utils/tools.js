const crypto = require('crypto');
const { SECRET_KEY } = require('../config/const');

/**
 * 获取md5值
 * @param {string} content 加密内容
 */
function md5(content) {
  const md5 = crypto.createHash('md5');
  return md5.update(content).digest('hex');
}

/**
 * MD5加盐加密
 * @param {string} content 加密内容
 */
function doCrypto(content) {
  const str = `password=${password}&key=${SECRET_KEY}`;
  return md5(str);
}

/**
 * 成功的数据模型
 * @param {any} data
 */
function success(data = {}) {
  return {
    code: 10000,
    data
  };
}

/**
 * 失败返回模型
 * @param {object} data { code, message }
 */
function error({ code, message }) {
  return { code, message };
}

module.exports = {
  md5,
  doCrypto,
  success,
  error
};
