import authRoutes from '../modules/auth/controller.js';
import itemRoutes from '../modules/item/controller.js';
import uploadRoutes from '../modules/upload/controller.js';

async function routes(app, options) {
  app.register(authRoutes, { prefix: '/auth' });
  app.register(itemRoutes, { prefix: '/items' });
  app.register(uploadRoutes);
}

export default routes;