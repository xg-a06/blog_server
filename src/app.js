/*
 * @Description:
 * @Author: xg-a06
 * @Date: 2019-04-27 06:38:40
 * @LastEditTime: 2019-06-07 00:47:40
 * @LastEditors: xg-a06
 */
const Koa = require('koa')
const router = require('./routes')

const app = new Koa()

router(app)

app.use(async (ctx, next) => {
  ctx.body = 'hello blog'
})

module.exports = app
