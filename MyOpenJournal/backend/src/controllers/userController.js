import User from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { uploadBufferToCloudinary } from '../services/cloudinaryService.js';

export const getProfile = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    data: { user: req.user }
  });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const updates = {
    ...(req.body.name ? { name: req.body.name } : {}),
    ...(req.body.email ? { email: req.body.email } : {})
  };

  const existing = req.body.email
    ? await User.findOne({ email: req.body.email, _id: { $ne: req.user._id } })
    : null;

  if (existing) {
    return res.status(409).json({
      success: false,
      message: 'Email is already in use'
    });
  }

  const user = await User.findByIdAndUpdate(req.user._id, updates, {
    new: true
  }).select('-password');

  res.json({
    success: true,
    message: 'Profile updated successfully',
    data: { user }
  });
});

export const updateAvatar = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'Please upload an image file'
    });
  }

  const uploaded = await uploadBufferToCloudinary(
    req.file.buffer,
    'sakura-note/avatars'
  );

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { avatar: uploaded.secure_url },
    { new: true }
  ).select('-password');

  res.json({
    success: true,
    message: 'Avatar updated successfully',
    data: { user }
  });
});