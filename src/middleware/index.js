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

module.exports = app => {
  app.use(
    bodyparser({
      enableTypes: ['json', 'form', 'text']
    })
  );
  app.use(logger());
  // app.use(
  //   koaBody({
  //     multipart: true, // 支持文件上传
  //     formidable: {
  //       uploadDir: path.join(__dirname, '../../upload/'), // 设置文件上传目录
  //       keepExtensions: true, // 保持文件的后缀
  //       maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
  //       onFileBegin: (name, file) => {
  //         // 文件上传前的设置
  //         // console.log(`name: ${name}`);
  //         // console.log(file);
  //       },
  //     },
  //   }),
  // );
};
