/*
 * @Description:
 * @Author: xg-a06
 * @Date: 2019-04-27 07:12:15
 * @LastEditTime: 2019-06-11 00:30:11
 * @LastEditors: xg-a06
 */
// const path = require('path');
// const koaBody = require('koa-body');
const bodyparser = require('koa-bodyparser');
const session = require('koa-generic-session')
const logger = require('./logger');
const error = require('./error');
const { SECRET_KEY } = require('../config/const');

module.exports = app => {
  //post 请求参数处理
  app.use(
    bodyparser({
      enableTypes: ['json', 'form', 'text']
    })
  );

  //access日志中间件
  app.use(logger());

  //错误处理
  app.use(error());

  // session 配置
  app.keys = [SECRET_KEY]
  app.use(session({
    key: 'xg.sid',
    // prefix: 'blog:sess:', // redis key 的前缀，默认是 `koa:sess:`
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000  // 单位 ms
    },
    // store: redisStore({
    //     all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
    // })
  }))
};
