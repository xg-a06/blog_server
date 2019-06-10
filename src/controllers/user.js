/*
 * @Description:
 * @Author: xg-a06
 * @Date: 2019-06-10 23:59:21
 * @LastEditTime: 2019-06-11 00:48:26
 * @LastEditors: xg-a06
 */
const { genPassword } = require('../utils/cryp')
const user = require('../models/user')

module.exports = {
  async login(ctx) {
    let { loginID, pwd } = ctx.request.body
    pwd = genPassword(pwd)
    let ret = await user.checkUser(loginID, pwd)
    if (ret !== null) {
      ctx.body = ret
    }
  }
}
