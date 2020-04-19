const Router = require('koa-router');
const CategoryController = require('../controllers/category');

// const compose = require('koa-compose');

const router = new Router();

router.prefix('/api/category');


router.get('/:name', async (ctx, next) => {
  const { name } = ctx.params;
  ctx.body = await CategoryController.isExist(name);
});

router.post('/', async (ctx, next) => {
  const { name, level, parentId } = ctx.request.body;
  ctx.body = await CategoryController.add({ name, level, parentId });
});

router.post('/query', async (ctx, next) => {
  const { parentId } = ctx.request.body;
  ctx.body = await CategoryController.findByParentId(parentId);
});

router.delete('/:name', async (ctx, next) => {
  const { name } = ctx.params;
  ctx.body = await CategoryController.delCategory(name);
});

module.exports = router;