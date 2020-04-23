const UserService = require('../services/user');
const { doCrypto, success, error } = require('../utils/tools');
const { userNotExist, userIsExist, userAuthError, systemRefuse } = require('../config/const/errorCode');
const config = require('../config/env')
const axios = require('axios');

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
   * @param {string} id 用户id
  */
  async delUser (id) {
    if (config.NODE_ENV !== 'test') {
      return error(systemRefuse);
    }

    const result = await UserService.delete(id);
    if (!result) {
      return error(userNotExist);
    }

    return success(result);
  },
  /**
   * 登录
   * @param {string} loginId 账号
   * @param {string} loginPWD 密码
   * @param {object} session session
  */
  async login ({ loginId, loginPWD, session }) {
    const userInfo = await UserService.get(loginId, doCrypto(loginPWD));
    if (!userInfo) {
      return error(userNotExist);
    }

    if (session.userInfo == null) {
      session.userInfo = userInfo;
    }

    return success(userInfo);
  },
  /**
   * 退出
   * @param {object} session session
  */
  async logout ({ session }) {
    delete session.userInfo;

    return success();
  }
};

module.exports = userController;
