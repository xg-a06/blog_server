const { db, Sequelize } = require('./db');

const User = db.define('user', {
  userName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    comment: '用户名，唯一'
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '密码'
  }
});

module.exports = User;
