/**
 * @description user controller
 */
const UserService = require('../services/user');
const { doCrypto, success, error } = require('../utils/tools');
const { userNotExist, userIsExist } = require('../config/const/errorCode');

const userController = {
  /**
   * 检查用户名是否存在
   * @param {*} loginId 账号
   */
  async isExist(loginId) {
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
  async register({ loginId, loginPWD }) {
    const userInfo = await UserService.getUser(loginId);
    if (userInfo) {
      return error(userIsExist);
    }

    const result = await UserService.createUser({
      loginId,
      loginPWD: doCrypto(loginPWD)
    });

    return success(result);
  }
};

module.exports = userController;
