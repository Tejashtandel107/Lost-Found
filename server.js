import fastify from 'fastify';
import 'dotenv/config';
import cors from '@fastify/cors';
import dbConnector from './config/db.js';
import routes from './routes/route.js';
import multipart from '@fastify/multipart';

const app = fastify({ logger: true });

// plugins
app.register(cors, { origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE'] });
app.register(multipart); 
app.register(dbConnector);
app.register(routes, { prefix: '/api' });

const start = async () => {
  try {
    const PORT = process.env.PORT || 3000;
    await app.listen({ port: PORT, host: '0.0.0.0' });
    console.log(`Server running on port ${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();