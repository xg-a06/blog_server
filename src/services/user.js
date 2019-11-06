/**
 * @description user service
 */

const User = require('../models/user');

const userService = {
  /**
   * 创建用户
   * @param {string} loginId 账号
   * @param {string} loginPWD 密码
   * @param {string} nickName 昵称
   * @param {string} avatar 头像
   */
  createUser({
    loginId,
    loginPWD,
    nickName = loginId,
    avatar = '/uploads/avatars/avatar.png'
  }) {
    const result=await User.create({
      loginId,
      loginPWD,
      nickName ,
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
  getUser(loginId,loginPWD){
    const cond={ loginId };
    if(loginPWD){
      cond.loginPWD=loginPWD;
    }
    const result=await User.findOne({
      attributes: ['id', 'loginId', 'loginPWD', 'nickName', 'avatar'],
      where: cond
    });

    if (!result) {
      return result;
    }
  
    const data = result.dataValues;
  
    return data;
  }
};

module.exports = userService;
