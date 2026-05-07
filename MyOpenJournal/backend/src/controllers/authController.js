import crypto from 'crypto';
import User from '../models/User.js';
import { signToken } from '../utils/jwt.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendEmail } from '../utils/email.js';

const authResponse = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  avatar: user.avatar,
  role: user.role
});

// ✅ REGISTER
export const register = asyncHandler(async (req, res) => {

  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });

  if (exists) {
    return res.status(409).json({
      success: false,
      message: 'Email already exists'
    });
  }

  const token = crypto.randomBytes(32).toString("hex");

  const user = await User.create({
    name,
    email,
    password,
    emailVerificationToken: token
  });

  const verifyUrl =
    `${process.env.CLIENT_URL}/verify-email/${token}`;

  // send email safely
  await sendEmail(
    user.email,
    "Verify Your Email",
    `Click the link below to verify your email:\n\n${verifyUrl}`
  );

  return res.status(201).json({
    success: true,
    message: "Registration successful. Please verify your email."
  });
});

// ✅ VERIFY EMAIL
export const verifyEmail = asyncHandler(async (req, res) => {
  const user = await User.findOne({
    emailVerificationToken: req.params.token
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid token" });
  }

  user.isVerified = true;
  user.emailVerificationToken = undefined;
  await user.save();

  res.json({ message: "Email verified successfully" });
});

// ✅ LOGIN
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  if (!user.isVerified) {
    return res.status(401).json({ message: "Please verify your email" });
  }

  const token = signToken({ id: user._id, role: user.role });

  res.json({
    token,
    user: authResponse(user)
  });
});

// ✅ LOGOUT (FIXED ERROR)
export const logout = asyncHandler(async (req, res) => {
  res.json({
    message: "Logout successful"
  });
});

// ✅ CURRENT USER
export const me = asyncHandler(async (req, res) => {
  res.json({
    user: authResponse(req.user)
  });
});

// ✅ FORGOT PASSWORD
export const forgotPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.json({ message: "If account exists, email sent" });

  const rawToken = crypto.randomBytes(32).toString("hex");

  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex");

  user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;

  await user.save();

  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${rawToken}`;

  await sendEmail(user.email, "Reset Password", resetUrl);

  res.json({ message: "Reset email sent" });
});

// ✅ RESET PASSWORD
export const resetPassword = asyncHandler(async (req, res) => {
  const hashed = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashed,
    resetPasswordExpires: { $gt: Date.now() }
  });

  if (!user) {
    return res.status(400).json({ message: "Token expired" });
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  res.json({ message: "Password reset successful" });
});