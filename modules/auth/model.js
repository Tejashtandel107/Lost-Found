import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  enrollmentNo: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  contactNumber: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  branch: {
    type: String,
    required: true,
    default: 'CSE'
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;