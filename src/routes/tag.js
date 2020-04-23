const Router = require('koa-router');
const TagController = require('../controllers/tag');

// const compose = require('koa-compose');

const router = new Router();

router.prefix('/api/tag');


router.get('/:name', async (ctx, next) => {
  const { name } = ctx.params;
  ctx.body = await TagController.isExist(name);
});

router.post('/', async (ctx, next) => {
  const { name, level, parentId } = ctx.request.body;
  ctx.body = await TagController.add({ name, level, parentId });
});

router.post('/query', async (ctx, next) => {
  const { parentId } = ctx.request.body;
  ctx.body = await TagController.findByParentId(parentId);
});

router.delete('/:id', async (ctx, next) => {
  const { id } = ctx.params;
  ctx.body = await TagController.delTag(id);
});

module.exports = router;