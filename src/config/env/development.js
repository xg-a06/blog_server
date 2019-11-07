module.exports = {
  PORT: process.env.PORT || 13000,
  MYSQL_CONF: {
    host: 'jser.site',
    user: 'xg',
    password: 'mysql__)(!^',
    port: '13306',
    database: 'blog',
    logging: false,
    timezone: '+08:00',
    pool: {
      max: 10,
      min: 0,
      idle: 10000
    }
  },
  REDIS_CONF: {
    port: 6379,
    host: '127.0.0.1',
    password: '12345'
  }
};
