const server = require('../server');
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

  // test('登录，应该成功', async () => {
  //   const res = await server.post('/api/user/login').send({
  //     userName,
  //     password
  //   });
  //   expect(res.body.errno).toBe(0);

  //   // 获取 cookie
  //   COOKIE = res.headers['set-cookie'].join(';');
  // });

  // test('修改密码，应该成功', async () => {
  //   const res = await server
  //     .patch('/api/user/changePassword')
  //     .send({
  //       password,
  //       newPassword: `p_${Date.now()}`
  //     })
  //     .set('cookie', COOKIE);
  //   expect(res.body.errno).toBe(0);
  // });
  // test('删除用户，应该成功', async () => {
  //   const res = await server.post('/api/user/delete').set('cookie', COOKIE);
  //   expect(res.body.errno).toBe(0);
  // });
});
