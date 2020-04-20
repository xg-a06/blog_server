const server = require('../server');
const { db } = require('../../src/models/db');
const testData = require('./data');
const userData = require('../user/data');
const tagData = require('../tag/data');

describe('博客相关测试', () => {
  test('查询博客，应该不存在', async () => {
    const res = await server.post(`/api/blog/query`).send({
      title: testData[0].title,
      ...testData[1]
    });
    expect(res.body.code).toBe(10201);
  });

  test('创建博客，应该成功', async () => {
    const user = await server.post(`/api/user`).send(userData);
    testData[0].userId = user.body.data.id;
    const tag = await server.post(`/api/tag`).send(tagData[0]);
    testData[0].tagIds.push(tag.body.data.id);
    const res = await server.post(`/api/blog`).send(testData[0]);
    expect(res.body.code).toBe(10000);

    testData.id = res.body.data.id;
  });

  // test('查询博客，应该存在', async () => {
  //   const res = await server.post(`/api/blog/${testData.id}`);
  //   expect(res.body.code).toBe(10000);
  // });
  // test('查询一级标签，应该成功', async () => {
  //   const res = await server.get(`/api/blog/${encodeURIComponent(testData[0].name)}`);
  //   expect(res.body.code).toBe(10000);
  // });

  // test('删除二级标签，应该成功', async () => {
  //   const res = await server.delete(`/api/tag/${encodeURIComponent(testData[1].name)}`);
  //   expect(res.body.code).toBe(10000);
  // });

  afterAll(async done => {
    await db.close();
    done();
  });

});
