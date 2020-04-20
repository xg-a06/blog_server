const { db, Sequelize } = require('./db');
const Tag = require('./tag');
const Blog = require('./blog');

const TagBlog = db.define('tagBlog', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  }
});

Tag.belongsToMany(Blog, { through: TagBlog });
Blog.belongsToMany(Tag, { through: TagBlog });

module.exports = TagBlog;

