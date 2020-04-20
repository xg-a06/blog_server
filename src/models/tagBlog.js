const { db, Sequelize } = require('./db');
const Tag = require('./tag');
const Blog = require('./blog');

const TagBlog = db.define('tagBlog', {
  tagId: {
    type: Sequelize.UUID,
    allowNull: false
  },
  blogId: {
    type: Sequelize.UUID,
    allowNull: false
  }
});

Tag.hasMany(TagBlog, {
  foreignKey: 'tagId'
});

Blog.hasMany(TagBlog, {
  foreignKey: 'blogId'
});

module.exports = TagBlog;

