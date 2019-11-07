const server = require('../server');
const testData = require('./data');

test('查询注册的用户名，应该存在', async () => {
  console.log(testData);

  const res = await server.post('/api/user/isExist').send({ loginId: testData.loginId });
  expect(res.body.errno).toEqual(undefined);
})