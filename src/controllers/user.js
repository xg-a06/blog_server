/**
 * @description user controller
 */
const UserService = require('../services/user');
const { doCrypto, success, error } = require('../utils/tools');
const { userNotExist, userIsExist } = require('../config/const/errorCode');
const util = require('util');
const axios = require('axios');
const WXBizDataCrypt = require('../utils/WXBizDataCrypt')

const userController = {
  /**
   * 检查用户名是否存在
   * @param {*} loginId 账号
   */
  async isExist (loginId) {
    const userInfo = await UserService.getUser(loginId);
    if (!userInfo) {
      return error(userNotExist);
    }
    return success(userInfo);
  },
  /**
   *
   * @param {string} loginId 账号
   * @param {string} loginPWD 密码
   */
  async register ({ loginId, loginPWD }) {
    const userInfo = await UserService.getUser(loginId);
    if (userInfo) {
      return error(userIsExist);
    }

    const result = await UserService.createUser({
      loginId,
      loginPWD: doCrypto(loginPWD)
    });

    return success(result);
  },
  async login ({ appId, appSecret, code }) {
    let url = 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code';
    url = util.format(url, appId, appSecret, code);
    const result = await axios.get(url);

    if (result.status === 200 && !result.data.errcode) {
      return success(result.data);
    } else {
      return error({ message: JSON.stringify(result.data) });
    }
  },
  async decryptData ({ appId, sessionKey, encryptedData, iv }) {
    const pc = new WXBizDataCrypt(appId, sessionKey)
    const data = pc.decryptData(encryptedData, iv)
    return success(data);
  }
};

module.exports = userController;
