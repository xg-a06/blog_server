/*
 * @Description:
 * @Author: xg-a06
 * @Date: 2019-04-27 06:38:40
 * @LastEditTime: 2019-06-06 23:59:58
 * @LastEditors: xg-a06
 */
const Koa = require('koa')

const app = new Koa()

app.use(async (ctx, next) => {
  ctx.body = 'hello blog'
})

module.exports = app
