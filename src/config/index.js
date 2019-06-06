/*
 * @Description:
 * @Author: xg-a06
 * @Date: 2019-06-07 00:07:50
 * @LastEditTime: 2019-06-07 00:13:25
 * @LastEditors: xg-a06
 */

let config

if (process && process.env && process.env.NODE_ENV) {
  config = require(`./env/${process.env.NODE_ENV}.js`)
} else {
  config = require(`./env/development.js`)
}

module.exports = config
