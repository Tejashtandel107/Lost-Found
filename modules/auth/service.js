// modules/auth/service.js
import bcrypt from 'bcrypt';
import User from './model.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import transporter from '../../config/mail.js';

export default class AuthService {
  async register(body) {
    const { name,enrollmentNo,email,contactNumber,password,confirmPassword } = body;

    if (password !== confirmPassword) throw new Error('Passwords do not match');

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      enrollmentNo,
      email,
      contactNumber,
      password: hashedPassword
    });

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    return {
      name: user.name,
      email: user.email,
      enrollmentNo: user.enrollmentNo,
      contactNumber: user.contactNumber,
      token
    };
  }

  async login(email, password) {    
    const user = await User.findOne({ email });

    if (!user) throw new Error('Please register before logging in');
    
    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new Error('Invalid credentials')

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    return {
      name: user.name,
      email: user.email,
      enrollmentNo: user.enrollmentNo,
      contactNumber: user.contactNumber,
      token
    };
  }

  async forgotPassword(email) {
    const user = await User.findOne({ email });

    if (!user) throw new Error("User not found");
    
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    await user.save();

    return {message: "Token generated",resetToken};
  }

  async resetPassword(token, newPassword) {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // 2. Find user with valid token + not expired
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) throw new Error("Invalid or expired reset token");

    // 3. Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 4. Update password & clear reset fields
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return { message: "Password reset successfully" };
  }
}