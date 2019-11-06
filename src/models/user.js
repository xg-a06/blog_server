const { db, Sequelize } = require('./db');

const User = db.define('user', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
  loginId: {
    type: Sequelize.STRING(20),
    allowNull: false,
    unique: true
    // comment: '用户名，唯一'
  },
  loginPWD: {
    type: Sequelize.STRING(20),
    allowNull: false
  },
  nickName: {
    type: Sequelize.STRING(20)
  },
  avatar: {
    type: Sequelize.STRING
  }
});

module.exports = User;
