const CategoryService = require('../services/category');
const { success, error } = require('../utils/tools');
const { categoryNotExist, categoryIsExist } = require('../config/const/errorCode');
const axios = require('axios');

const userController = {
  /**
   * 检查分类是否存在
   * @param {string} name 分类
   */
  async isExist (name) {
    const categoryInfo = await CategoryService.get(name);
    if (!categoryInfo) {
      return error(categoryNotExist);
    }
    return success(categoryInfo);
  },
  /**
   * 新增分类
   * @param {string} name 分类
   * @param {int} level 分类层级
   * @param {string} parentId 父级分类id
   */
  async add ({ name, level, parentId }) {
    const categoryInfo = await CategoryService.get(name);
    if (categoryInfo) {
      return error(categoryIsExist);
    }

    const result = await CategoryService.create({
      name, level, parentId
    });

    return success(result);
  },
  /**
   * 根据父分类id查询所有子分类
   * @param {string} parentId 父级分类id
   */
  async findByParentId (parentId) {
    const categoryInfos = await CategoryService.getByParentId(parentId);
    return success(categoryInfos);
  },
  /**
   * 删除分类
   * @param {string} name 分类
  */
  async delCategory (name) {
    const result = await CategoryService.delete(name);
    if (!result) {
      return error(categoryNotExist);
    }

    return success(result);
  }
};

module.exports = userController;
