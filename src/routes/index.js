const userRouter = require('./user');
const categoryRouter = require('./category');

const routes = [userRouter, categoryRouter];

const registerRouter = (app, routes) => {
  routes.forEach(router => {
    app.use(router.routes(), router.allowedMethods());
  });
};

module.exports = app => {
  registerRouter(app, routes);
};
