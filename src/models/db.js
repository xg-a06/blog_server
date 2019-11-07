const Sequelize = require('sequelize');
const config = require('../config/env');

let { MYSQL_CONF } = config;

const db = new Sequelize(
  MYSQL_CONF.database,
  MYSQL_CONF.user,
  MYSQL_CONF.password,
  {
    dialect: 'mysql',
    host: MYSQL_CONF.host,
    port: MYSQL_CONF.port,
    pool: MYSQL_CONF.pool,
    logging: MYSQL_CONF.logging,
    timezone: MYSQL_CONF.timezone
  }
);

db.sync({ alter: true });

module.exports = {
  db,
  Sequelize
};
