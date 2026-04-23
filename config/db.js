import mongoose from 'mongoose';
import fp from 'fastify-plugin';
import dotenv from 'dotenv';

dotenv.config();

async function connectDB(fastify, options) {
  try {
    await mongoose.connect(process.env.MONGODB_STRING);
  } catch (err) {
    console.error('❌ MongoDB connection error:');
    console.error(err.message);
    console.error(err.stack);     

    throw err; 
  }
}

export default fp(connectDB);