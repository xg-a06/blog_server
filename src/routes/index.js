const userRouter = require('./user');

const routes = [userRouter];

const registerRouter = (app, routes) => {
  routes.forEach(router => {
    app.use(router.routes(), router.allowedMethods());
  });
};

module.exports = app => {
  registerRouter(app, routes);
};
