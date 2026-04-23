import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  try {
    console.log('🔗 Connecting to MongoDB...');
    console.log(`🔗 Connection string: ${process.env.MONGODB_STRING}`);

    await mongoose.connect(process.env.MONGODB_STRING);
    console.log('✅ MongoDB connected with Mongoose');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;