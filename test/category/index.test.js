const server = require('../server');
const { db } = require('../../src/models/db');
const testData = require('./data');

describe('分类相关测试', () => {
  test('查询分类，应该不存在', async (done) => {
    const res = await server.get(`/api/category/${encodeURIComponent(testData[0].name)}`);
    expect(res.body.code).toBe(10101);
    done();
  });

  test('添加一级分类，应该成功', async () => {
    const res = await server.post(`/api/category`).send(testData[0]);
    expect(res.body.code).toBe(10000);

    testData[1].parentId = res.body.data.id;
  });

  test('添加二级分类，应该成功', async () => {
    const res = await server.post(`/api/category`).send(testData[1]);
    expect(res.body.code).toBe(10000);
  });

  test('查询一级分类，应该成功', async () => {
    const res = await server.get(`/api/category/${encodeURIComponent(testData[0].name)}`);
    expect(res.body.code).toBe(10000);
  });

  test('查询二级分类，应该成功', async () => {
    const res = await server.post(`/api/category/query`).send(testData[1].parentId);
    expect(res.body.code).toBe(10000);
  });

  test('删除一级分类，应该成功', async () => {
    const res = await server.delete(`/api/category/${encodeURIComponent(testData[0].name)}`);
    expect(res.body.code).toBe(10000);
  });

  test('删除二级分类，应该成功', async () => {
    const res = await server.delete(`/api/category/${encodeURIComponent(testData[1].name)}`);
    expect(res.body.code).toBe(10000);
  });

  afterAll(async done => {
    await db.close();
    done();
  });

});
