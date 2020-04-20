const server = require('../server');
const { db } = require('../../src/models/db');
const testData = require('./data');

describe('用户相关测试', () => {
  test('查询用户，应该不存在', async () => {
    const res = await server.get(`/api/user/${testData.loginId}`);
    expect(res.body.code).toBe(10001);
  });

  test('注册用户，应该成功', async () => {
    const res = await server.post(`/api/user`).send(testData);
    expect(res.body.code).toBe(10000);
  });

  test('查询用户，应该存在', async () => {
    const res = await server.get(`/api/user/${testData.loginId}`);
    expect(res.body.code).toBe(10000);
  });

  test('重复注册用户，应该失败', async () => {
    const res = await server.post(`/api/user`).send(testData);
    expect(res.body.code).toBe(10002);
  });

  test('登录用户，应该成功', async () => {
    const res = await server.post(`/api/user/login`).send(testData);
    expect(res.body.code).toBe(10000);

    testData.cookie = res.headers['set-cookie'].join(';');
  });

  test('退出用户，应该成功', async () => {
    const res = await server.post(`/api/user/logout`).set('cookie', testData.cookie);
    expect(res.body.code).toBe(10000);

    testData.cookie = '';
  });

  test('更新用户密码，应该成功', async () => {
    testData.oldPwd = testData.loginPWD;
    testData.loginPWD = testData.loginPWD + 1;
    const res = await server.put(`/api/user`).send(testData);
    expect(res.body.code).toBe(10000);
  });

  test('删除用户，应该成功', async () => {
    const res = await server.delete(`/api/user/${testData.loginId}`);
    expect(res.body.code).toBe(10000);
  });

  afterAll(async done => {
    await db.close();
    done();
  });

});
