import ItemService from './service.js';
import { reportItemSchema, getItemsSchema,getItemByIdSchema,updateItemSchema,deleteItemSchema } 
from './schema.js';
import { verifyToken } from '../../middleware/auth.js';

const service = new ItemService();

export default async function itemRoutes(app, options) {
  app.post('/report-item',  { preHandler: verifyToken, ...reportItemSchema }, async (req, reply) => {
    try {
      const result = await service.createItem(req.body);
      reply.code(201).send({ status: true, data: result });
    } catch (err) {
      reply.code(400).send({ status: false, message: err.message });
    }
  });

  app.post('/update-report-item',  { preHandler: verifyToken }, async (req, reply) => {
    try {
      const result = await service.report(req.body.itemId,req.user.userId);
      reply.code(201).send({ status: true, data: result });
    } catch (err) {
      reply.code(400).send({ status: false, message: err.message });
    }
  });

  app.get('/', getItemsSchema, async (req, reply) => {
    try {
      const result = await service.getItems(req.query);
      reply.send({ status: true, data: result });
    } catch (err) {
      reply.code(400).send({ status: false, message: err.message });
    }
  });

  app.get('/:id',getItemByIdSchema,async (req, reply) => {
    try {
      const result = await service.getItemById(req.params.id);
      return reply.send({ status: true, data: result });
    } catch (err) {
      return reply.code(err.statusCode || 400).send({
        status: false,
        message: err.message
      });
    }
  });

  app.put('/:id',updateItemSchema,async (req, reply) => {
    try {
      const result = await service.updateItem(req.params.id, req.body);
      return reply.send({ status: true, data: result });
    } catch (err) {
      return reply.code(err.statusCode || 400).send({
        status: false,
        message: err.message
      });
    }
  });

  app.delete('/:id',deleteItemSchema,async (req, reply) => {
    try {
      await service.deleteItem(req.params.id);
      return reply.send({status: true,message: "Deleted successfully"});
    } catch (err) {
      return reply.code(err.statusCode || 400).send({status: false,message: err.message});
    }
  });
}