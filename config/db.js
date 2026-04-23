import mongoose from 'mongoose';
import fp from 'fastify-plugin';
import dotenv from 'dotenv';

dotenv.config();

async function connectDB(fastify, options) {
  try {
    console.log('🔗 Connecting to MongoDB...');
    console.log(`🔗 Connection string: ${process.env.MONGODB_STRING}`);

    await mongoose.connect(process.env.MONGODB_STRING);

    console.log('✅ MongoDB connected with Mongoose');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
}

export default fp(connectDB);