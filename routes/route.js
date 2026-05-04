import authRoutes from '../modules/auth/controller.js';
import itemRoutes from '../modules/item/controller.js';
import uploadRoutes from '../modules/upload/controller.js';
import contactRoutes from '../modules/contact/controller.js';

async function routes(app, options) {
  app.register(authRoutes, { prefix: '/auth' });
  app.register(itemRoutes, { prefix: '/items' });
  app.register(contactRoutes, { prefix: '/contacts' });
  app.register(uploadRoutes);
}

export default routes;