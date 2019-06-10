/*
 * @Description:
 * @Author: xg-a06
 * @Date: 2019-06-10 15:44:33
 * @LastEditTime: 2019-06-11 00:47:44
 * @LastEditors: xg-a06
 */
const { exec, escape } = require('../utils/db')

module.exports = {
  checkUser(loginID, pwd) {
    loginID = escape(loginID)
    pwd = escape(pwd)
    const sql = `select id,nick_name, login_id from user_info where login_id=${loginID} and login_pwd=${pwd}`
    return exec(sql).then(rows => {
      return rows[0] || null
    })
  }
}
