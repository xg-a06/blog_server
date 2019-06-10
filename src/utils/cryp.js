/*
 * @Description:
 * @Author: xg-a06
 * @Date: 2019-06-10 15:54:36
 * @LastEditTime: 2019-06-10 15:58:33
 * @LastEditors: xg-a06
 */
const crypto = require('crypto')

const SECRET_KEY = 'Xg_a06#'

function md5(content) {
  let md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}

function genPassword(password) {
  const str = `password=${password}&key=${SECRET_KEY}`
  return md5(str)
}

module.exports = {
  genPassword
}
