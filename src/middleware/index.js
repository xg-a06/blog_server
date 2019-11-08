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
const logger = require('./logger');
const error = require('./error');

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
};
