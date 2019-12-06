/**
 * @description user service
 */
const { DEFAULT_AVATAR } = require('../config/const');
const User = require('../models/user');

const userService = {
  /**
   * 创建用户
   * @param {string} loginId 账号
   * @param {string} loginPWD 密码
   * @param {string} nickName 昵称
   * @param {string} avatar 头像
   */
  async create ({
    loginId,
    loginPWD,
    nickName = loginId,
    avatar = DEFAULT_AVATAR
  }) {
    const result = await User.create({
      loginId,
      loginPWD,
      nickName,
      avatar
    });

    const data = result.dataValues;

    return data;
  },
  /**
   * 获取用户
   * @param {string} loginId 账号
   * @param {string} loginPWD 密码
   */
  async get (loginId, loginPWD) {
    const cond = { loginId };
    if (loginPWD) {
      cond.loginPWD = loginPWD;
    }
    const result = await User.findOne({
      attributes: ['id', 'loginId', 'loginPWD', 'nickName', 'avatar'],
      where: cond
    });

    if (!result) {
      return result;
    }

    const data = result.dataValues;

    return data;
  },
  /**
   * 删除用户,自动化测试专用
   * @param {string} loginId 账号
   * @param {string} loginPWD 密码
   */
  async delete (loginId) {

    const cond = { loginId };
    const result = await User.destroy({
      where: cond
    });

    return result > 0;
  },
  /**
   * 更新用户
   * @param {string} loginId 账号
   * @param {string} oldPwd 旧密码
   * @param {string} loginPWD 密码
   * @param {string} nickName 昵称
   * @param {string} avatar 头像
   */
  async update ({ loginPWD, nickName, avatar }, { loginId, oldPwd }) {
    const cond = { loginId };

    if (oldPwd) {
      cond.loginPWD = oldPwd;
    }
    const data = {}
    if (loginPWD) {
      data.loginPWD = loginPWD
    }
    if (nickName) {
      data.nickName = nickName
    }
    if (avatar) {
      data.avatar = avatar
    }
    const result = await User.update(data, {
      where: cond
    })

    return result[0] > 0
  }
};

module.exports = userService;
