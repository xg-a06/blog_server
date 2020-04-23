const TagBlog = require('../models/tagBlog');

const tagBlogService = {
  /**
   * 创建
   * @param {string} name 标签名
   * @param {int} level 标签层级
   * @param {int} parentId 父标签id，没有则为null
   */
  async create ({
    tagId,
    blogId
  }) {
    const result = await TagBlog.create({
      tagId,
      blogId
    });

    const data = result.dataValues;

    return data;
  },
  /**
   * 删除
   * @param {string} blogId 博客id
   */
  async delete (blogId) {
    const cond = { blogId };
    const result = await TagBlog.destroy({
      where: cond
    });
    debugger;
    return result > 0;
  }
};

module.exports = tagBlogService;
