const Category = require('../models/category');

const categoryService = {
  /**
   * 创建分类
   * @param {string} name 分类名
   * @param {int} level 分类层级
   * @param {int} parentId 父分类id，没有则为null
   */
  async create ({
    name,
    level = 0,
    parentId = null
  }) {
    const result = await Category.create({
      name,
      level,
      parentId
    });

    const data = result.dataValues;

    return data;
  },
  /**
   * 获取分类
   * @param {string} name 分类名
   */
  async get (name) {
    const cond = { name };
    const result = await Category.findOne({
      attributes: ['id', 'name', 'level', 'parentId'],
      where: cond
    });

    if (!result) {
      return result;
    }

    const data = result.dataValues;

    return data;
  },
  /**
   * 根据父级id或者所有子分类
   * @param {int} parentId 父分类id
   */
  async getByParentId (parentId = null) {
    const cond = { parentId };
    const result = await Category.findAll({
      attributes: ['id', 'name', 'level', 'parentId'],
      where: cond
    });

    if (!result) {
      return result;
    }

    const data = result.dataValues;

    return data;
  },
  /**
   * 删除分类
   * @param {string} name 分类名
   */
  async delete (name) {
    const cond = { name };
    const result = await Category.destroy({
      where: cond
    });

    return result > 0;
  }
};

module.exports = categoryService;
