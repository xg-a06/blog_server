/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

let config;

if (process && process.env && process.env.NODE_ENV) {
  config = require(`./env/${process.env.NODE_ENV}.js`);
} else {
  config = require('./env/development.js');
}
config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  ...config,
};
module.exports = config;
