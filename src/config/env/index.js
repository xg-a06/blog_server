const NODE_ENV = process.env.NODE_ENV || 'development';

let config = require(`./${NODE_ENV}.js`);

config = {
  NODE_ENV,
  ...config
};

module.exports = config;
