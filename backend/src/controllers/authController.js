import User from '../models/User.js';
import { signToken } from '../utils/jwt.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const authResponse = (user) => ({
  id: user._id,
  username: user.username,
  name: user.name,
  avatar: user.avatar,
  role: user.role
});

export const register = asyncHandler(async (req, res) => {

  const {
    username,
    name,
    password,
    secretQuestion1,
    secretAnswer1,
    secretQuestion2,
    secretAnswer2
  } = req.body;

  const exists = await User.findOne({ username });

  if (exists) {
    return res.status(409).json({
      message: 'Username already exists'
    });
  }

  await User.create({
    username,
    name,
    password,
    secretQuestion1,
    secretAnswer1,
    secretQuestion2,
    secretAnswer2
  });

  res.status(201).json({
    message: 'Registration successful'
  });
});

export const login = asyncHandler(async (req, res) => {

  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({
      message: 'Invalid credentials'
    });
  }

  const token = signToken({
    id: user._id,
    role: user.role
  });

  res.json({
    token,
    user: authResponse(user)
  });
});

export const me = asyncHandler(async (req, res) => {

  res.json({
    user: authResponse(req.user)
  });
});

export const logout = asyncHandler(async (req, res) => {

  res.json({
    message: 'Logout successful'
  });
});

export const forgotPassword = asyncHandler(async (req, res) => {

  const { username } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).json({
      message: 'User not found'
    });
  }

  res.json({
    username: user.username,
    secretQuestion1: user.secretQuestion1,
    secretQuestion2: user.secretQuestion2
  });
});

export const resetPassword = asyncHandler(async (req, res) => {

  const {
    username,
    secretAnswer1,
    secretAnswer2,
    password
  } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).json({
      message: 'User not found'
    });
  }

  const valid1 = await user.compareSecretAnswer1(secretAnswer1);
  const valid2 = await user.compareSecretAnswer2(secretAnswer2);

  if (!valid1 || !valid2) {
    return res.status(401).json({
      message: 'Secret answers incorrect'
    });
  }

  user.password = password;

  await user.save();

  res.json({
    message: 'Password reset successful'
  });
});