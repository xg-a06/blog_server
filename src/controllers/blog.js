const BlogService = require('../services/blog');
const TagBlogService = require('../services/tagBlog');
const { success, error } = require('../utils/tools');
const { blogNotExist } = require('../config/const/errorCode');
const axios = require('axios');

const blogController = {
  /**
   * 新增标签
   * @param {string} title 博客标题
   * @param {string} cover 博客封面
   * @param {string} content 博客内容
   * @param {string} userId 创建人id
   */
  async addBlog ({ title, cover, content, userId, tagIds = [] }) {
    const result = await BlogService.create({ title, cover, content, userId });
    for (let tagId of tagIds) {
      await TagBlogService.create({ tagId: tagId, blogId: result.id });
    }
    return success(result);
  },
  /**
   * 根据id获取博客
   * @param {string} id 博客id
   */
  async findById (id) {
    const blogInfo = await BlogService.get(id);
    if (!blogInfo) {
      return error(blogNotExist);
    }
    return success(blogInfo);
  },
  /**
   * 根据id获取博客
   * @param {string} title 博客标题
   * @param {string} tagId 标签id
   * @param {int} pageIndex 分页页码
   * @param {int} pageSize 分页大小
   */
  async findByConds ({ title, tagId, pageIndex, pageSize }) {
    const blogInfo = await BlogService.getListByPage({ title, tagId, pageIndex, pageSize });
    if (!blogInfo) {
      return error(blogNotExist);
    }
    return success(blogInfo);
  },
  /**
   * 删除标签
   * @param {string} id 标签id
  */
  async delBlog (id) {
    const result = await BlogService.delete(id);
    await TagBlogService.delete(id);
    return success(result);
  }


};

module.exports = blogController;
