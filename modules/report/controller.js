import ReportService from './service.js';
import { verifyToken } from '../../middleware/auth.js';
const service = new ReportService();

export default async function reportRoutes(app, options) {
  app.post('/',  { preHandler: verifyToken }, async (req, reply) => {
    try {
      const result = await service.report(req.body.itemId,req.user.userId);
      reply.code(201).send({ status: true, data: result });
    } catch (err) {
      reply.code(400).send({ status: false, message: err.message });
    }
  });
}