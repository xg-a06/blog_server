/*
 * @Description:
 * @Author: xg-a06
 * @Date: 2019-04-27 07:11:11
 * @LastEditTime: 2019-06-11 00:38:16
 * @LastEditors: xg-a06
 */
module.exports = {
  PORT: process.env.PORT || 13000,
  MYSQL_CONF: {
    host: '127.0.0.1',
    user: 'xg',
    password: 'mysql__)(!^',
    port: '13306',
    database: 'blog',
  },
  REDIS_CONF: {
    port: 6379,
    host: '127.0.0.1',
    password: '12345',
  },
};