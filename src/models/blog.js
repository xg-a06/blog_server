const { db, Sequelize } = require('./db');
const User = require('./user');

const Blog = db.define('blog', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING(20),
    allowNull: false
  },
  cover: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  userId: {
    type: Sequelize.UUID,
    allowNull: false
  },
});

Blog.belongsTo(User, {
  foreignKey: 'userId'
})

module.exports = Blog;
