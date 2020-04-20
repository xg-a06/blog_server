const Tag = require('../models/tag');

const tagService = {
  /**
   * 创建标签
   * @param {string} name 标签名
   * @param {int} level 标签层级
   * @param {int} parentId 父标签id，没有则为null
   */
  async create ({
    name,
    level = 0,
    parentId = null
  }) {
    const result = await Tag.create({
      name,
      level,
      parentId
    });

    const data = result.dataValues;

    return data;
  },
  /**
   * 获取标签
   * @param {string} name 标签名
   */
  async get (name) {
    const cond = { name };
    const result = await Tag.findOne({
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
   * 根据父级id或者所有子标签
   * @param {int} parentId 父标签id
   */
  async getByParentId (parentId = null) {
    const cond = { parentId };
    const result = await Tag.findAll({
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
   * 删除标签
   * @param {string} name 标签名
   */
  async delete (name) {
    const cond = { name };
    const result = await Tag.destroy({
      where: cond
    });

    return result > 0;
  }
};

module.exports = tagService;
