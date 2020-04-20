const server = require('../server');
const { db } = require('../../src/models/db');
const testData = require('./data');

describe('标签相关测试', () => {
  test('查询标签，应该不存在', async () => {
    const res = await server.get(`/api/tag/${encodeURIComponent(testData[0].name)}`);
    expect(res.body.code).toBe(10101);
  });

  test('添加一级标签，应该成功', async () => {
    const res = await server.post(`/api/tag`).send(testData[0]);
    expect(res.body.code).toBe(10000);

    testData[1].parentId = res.body.data.id;
  });

  test('添加二级标签，应该成功', async () => {
    const res = await server.post(`/api/tag`).send(testData[1]);
    expect(res.body.code).toBe(10000);
  });

  test('查询一级标签，应该成功', async () => {
    const res = await server.get(`/api/tag/${encodeURIComponent(testData[0].name)}`);
    expect(res.body.code).toBe(10000);
  });

  test('查询二级标签，应该成功', async () => {
    const res = await server.post(`/api/tag/query`).send(testData[1].parentId);
    expect(res.body.code).toBe(10000);
  });

  test('删除一级标签，应该成功', async () => {
    const res = await server.delete(`/api/tag/${encodeURIComponent(testData[0].name)}`);
    expect(res.body.code).toBe(10000);
  });

  test('删除二级标签，应该成功', async () => {
    const res = await server.delete(`/api/tag/${encodeURIComponent(testData[1].name)}`);
    expect(res.body.code).toBe(10000);
  });

  afterAll(async done => {
    await db.close();
    done();
  });

});
