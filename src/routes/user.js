/*
 * @Description:
 * @Author: xg-a06
 * @Date: 2019-06-07 00:19:19
 * @LastEditTime: 2019-06-07 01:00:44
 * @LastEditors: xg-a06
 */
const Router = require('koa-router')
const compose = require('koa-compose')

const router = new Router()

router.get('/', async (ctx, next) => {
  ctx.status = 301
  ctx.redirect('/login')
})
router.get('/login', async (ctx, next) => {
  ctx.body = '这是登录页'
})

router.post('/doLogin', async (ctx, next) => {
  ctx.body = '这是登录接口'
})

router.post('/doLogout', async (ctx, next) => {
  ctx.body = '这是退出接口'
})

module.exports = () => {
  return compose([router.routes(), router.allowedMethods()])
}
