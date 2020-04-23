const TagService = require('../services/tag');
const { success, error } = require('../utils/tools');
const { tagNotExist, tagIsExist } = require('../config/const/errorCode');
const axios = require('axios');

const tagController = {
  /**
   * 检查标签是否存在
   * @param {string} name 标签
   */
  async isExist (name) {
    const tagInfo = await TagService.get(name);
    if (!tagInfo) {
      return error(tagNotExist);
    }
    return success(tagInfo);
  },
  /**
   * 新增标签
   * @param {string} name 标签
   * @param {int} level 标签层级
   * @param {string} parentId 父级标签id
   */
  async add ({ name, level, parentId }) {
    const tagInfo = await TagService.get(name);
    if (tagInfo) {
      return error(tagIsExist);
    }

    const result = await TagService.create({
      name, level, parentId
    });

    return success(result);
  },
  /**
   * 根据父标签id查询所有子标签
   * @param {string} parentId 父级标签id
   */
  async findByParentId (parentId) {
    const tagInfos = await TagService.getByParentId(parentId);
    return success(tagInfos);
  },
  /**
   * 删除标签
   * @param {string} id 标签id
  */
  async delTag (id) {
    const result = await TagService.delete(id);
    if (!result) {
      return error(tagNotExist);
    }

    return success(result);
  }
};

module.exports = tagController;
