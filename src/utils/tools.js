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

module.exports = {
  md5,
  doCrypto
};
