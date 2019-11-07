/**
 * @description user controller
 */
const UserService = require('../services/user');
const { doCrypto } = require('../utils/tools');

const userController = {
  /**
   * 检查用户名是否存在
   * @param {*} loginId 账号
   */
  async isExist (loginId) {
    const userInfo = await UserService.getUser(loginId);
    return userInfo;
  },
  /**
   *
   * @param {string} loginId 账号
   * @param {string} loginPWD 密码
   */
  async register ({ loginId, loginPWD }) {
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
      // 用户名已存在
    }
    const result = await UserService.createUser({
      loginId,
      password: doCrypto(loginPWD),
      gender
    })
  }
};

module.exports = userController;
