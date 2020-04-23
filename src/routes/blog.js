const Router = require('koa-router');
const BlogController = require('../controllers/blog');

const router = new Router();

router.prefix('/api/blog');

router.get('/:id', async (ctx, next) => {
  const { id } = ctx.params;
  ctx.body = await BlogController.findById(id);
});

router.post('/', async (ctx, next) => {
  const { title, cover, content, userId, tagIds } = ctx.request.body;
  ctx.body = await BlogController.addBlog({ title, cover, content, userId, tagIds });
});

router.post('/query', async (ctx, next) => {
  const { title, tagId, pageIndex, pageSize } = ctx.request.body;
  ctx.body = await BlogController.findByConds({ title, tagId, pageIndex, pageSize });
});

router.delete('/:id', async (ctx, next) => {
  const { id } = ctx.params;
  ctx.body = await BlogController.delBlog(id);
});

module.exports = router;