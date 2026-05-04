import ContactService from "./service.js";
import { contactSchema } from "./schema.js";
import { verifyToken } from '../../middleware/auth.js';

const service = new ContactService();

async function contactRoutes(app, options) {

  // Submit contact form
  app.post("/", contactSchema, async (req, reply) => {
    try {
      const result = await service.createContact(req.body);

      reply.code(201).send({
        status: true,
        data: result
      });

    } catch (err) {
      reply.code(400).send({
        status: false,
        message: err.message
      });
    }
  });

  app.get("/", { preHandler: verifyToken }, async (req, reply) => {
    try {
      const data = await service.getAllContacts();
      reply.send({status: true,data});
    } catch (err) {
      reply.code(500).send({
        status: false,
        message: err.message
      });
    }
  });
}

export default contactRoutes;