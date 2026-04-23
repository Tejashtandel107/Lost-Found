import AuthService from './service.js';
import { registerSchema, loginSchema,forgotPasswordSchema,resetPasswordSchema } from './schema.js';

const service = new AuthService();

async function authRoutes(app, options) {
  app.post('/register', registerSchema, async (req, reply) => {
    try {
      const result = await service.register(req.body);
      reply.code(201).send({ status: true, data: result });
    } catch (err) {
      reply.code(400).send({ status: false, message: err.message });
    }
  });

  app.post('/login', loginSchema, async (req, reply) => {
    try {
      const { email, password } = req.body;
      const result = await service.login(email, password);
      reply.code(200).send({ status: true, data: result });
    } catch (err) {
      reply.code(400).send({ status: false, message: err.message });
    }
  });

  app.post("/forgot-password",forgotPasswordSchema, async (req, reply) => {
    try {
      const { email } = req.body;
      const result = await service.forgotPassword(email);
      reply.send({status: true,message: result.message,token: result.resetToken,});
    } catch (err) {
      reply.code(400).send({status: false,message: err.message});
    }
  });

  app.post("/reset-password",resetPasswordSchema, async (req, reply) => {
    try {
      const result = await service.resetPassword(req.body.token, req.body.password);
      reply.send({status: true,message: result.message});
    } catch (err) {
      reply.code(400).send({status: false,message: err.message});
    }
  });
}

export default authRoutes;