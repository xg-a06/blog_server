/*
 * @Description:
 * @Author: xg-a06
 * @Date: 2019-04-27 07:12:35
 * @LastEditTime: 2019-06-07 00:46:56
 * @LastEditors: xg-a06
 */

const homeRouter = require('./home');

module.exports = (app) => {
  app.use(homeRouter());
};
