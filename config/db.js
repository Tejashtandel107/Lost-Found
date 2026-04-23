import mongoose from 'mongoose';
import fp from 'fastify-plugin';
import dotenv from 'dotenv';

dotenv.config();

async function connectDB(fastify, options) {
  try {
    console.log('🔗 Connecting to MongoDB...');

    await mongoose.connect(process.env.MONGODB_STRING, {
      serverSelectionTimeoutMS: 5000
    });

    console.log('✅ MongoDB connected with Mongoose');
  } catch (err) {
    console.error('❌ MongoDB connection error:');
    console.error(err.message);   // 👈 important
    console.error(err.stack);     // 👈 important

    // ❌ REMOVE this (for debugging)
    // process.exit(1);

    throw err; // ✅ let Fastify show proper error
  }
}

export default fp(connectDB);