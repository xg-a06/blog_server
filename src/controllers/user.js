/**
 * @description user controller
 */
const UserService = require('../services/user');
const { doCrypto, success, error } = require('../utils/tools');
const { userNotExist, userIsExist, userAuthError, systemRefuse } = require('../config/const/errorCode');
const util = require('util');
const config = require('../config/env')
const axios = require('axios');
const WXBizDataCrypt = require('../utils/WXBizDataCrypt')

const userController = {
  /**
   * 检查用户名是否存在
   * @param {*} loginId 账号
   */
  async isExist (loginId) {
    const userInfo = await UserService.get(loginId);
    if (!userInfo) {
      return error(userNotExist);
    }
    return success(userInfo);
  },
  /**
   * 注册
   * @param {string} loginId 账号
   * @param {string} loginPWD 密码
   */
  async register ({ loginId, loginPWD }) {
    const userInfo = await UserService.get(loginId);
    if (userInfo) {
      return error(userIsExist);
    }

    const result = await UserService.create({
      loginId,
      loginPWD: doCrypto(loginPWD)
    });

    return success(result);
  },
  /**
   * 更新用户
   * @param {string} loginId 账号
   * @param {string} oldPwd 密码
   * @param {string} newPWD 密码
   * @param {string} nickName 昵称
   * @param {string} avatar 头像
  */
  async updatePwd ({ loginId, oldPwd, loginPWD }) {
    const result = await UserService.update({ loginPWD: doCrypto(loginPWD) }, { loginId, oldPwd: doCrypto(oldPwd) });
    if (!result) {
      return error(userAuthError);
    }
    return success(result);
  },
  /**
  * 删除用户
  * @param {string} loginId 账号
  */
  async delUser (loginId) {
    if (config.NODE_ENV !== 'test') {
      return error(systemRefuse);
    }

    const result = await UserService.delete(loginId);
    if (!result) {
      return error(userNotExist);
    }

    return success(result);
  },
  // async login ({ appId, appSecret, code }) {
  //   let url = 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code';
  //   url = util.format(url, appId, appSecret, code);
  //   const result = await axios.get(url);

  //   if (result.status === 200 && !result.data.errcode) {
  //     return success(result.data);
  //   } else {
  //     return error({ message: JSON.stringify(result.data) });
  //   }
  // },
  // async decryptData ({ appId, sessionKey, encryptedData, iv }) {
  //   const pc = new WXBizDataCrypt(appId, sessionKey)
  //   const data = pc.decryptData(encryptedData, iv)
  //   return success(data);
  // },
  // async token ({ appId, appSecret }) {
  //   let url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=%s&secret=%s';
  //   url = util.format(url, appId, appSecret);
  //   const result = await axios.get(url);
  //   if (result.status === 200) {
  //     return success(result.data);
  //   } else {
  //     return error({ message: JSON.stringify(result.data) });
  //   }
  // }
};

module.exports = userController;
