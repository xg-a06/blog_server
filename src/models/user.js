/*
 * @Description:
 * @Author: xg-a06
 * @Date: 2019-06-10 15:44:33
 * @LastEditTime: 2019-06-10 15:53:49
 * @LastEditors: xg-a06
 */
const { exec, escape } = require('../utils/db')

module.exports = {
  login(loginID, pwd) {
    loginID = escape(loginID)
    pwd = genPassword(pwd)
    pwd = escape(pwd)
    const sql = `select id,nick_name, login_id from user_info where login_id=${login_id} and login_pwd=${pwd}`
    return exec(sql).then(rows => {
      console.log(rows)
      return rows[0] || {}
    })
  }
}
