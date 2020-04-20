const userRouter = require('./user');
const tagRouter = require('./tag');
const blogRouter = require('./blog');

const routes = [userRouter, tagRouter, blogRouter];

const registerRouter = (app, routes) => {
  routes.forEach(router => {
    app.use(router.routes(), router.allowedMethods());
  });
};

module.exports = app => {
  registerRouter(app, routes);
};
