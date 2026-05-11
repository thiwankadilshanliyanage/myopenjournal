import User from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { uploadBufferToCloudinary } from '../services/cloudinaryService.js';

export const getProfile = asyncHandler(async (req, res) => {

  res.json({
    success: true,
    data: {
      user: req.user
    }
  });
});

export const updateProfile = asyncHandler(async (req, res) => {

  const {
    name,
    username,
    currentPassword
  } = req.body;

  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  const isPasswordCorrect =
    await user.comparePassword(currentPassword);

  if (!isPasswordCorrect) {
    return res.status(401).json({
      success: false,
      message: 'Current password is incorrect'
    });
  }

  const existingUser = await User.findOne({
    username,
    _id: { $ne: user._id }
  });

  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: 'Username already taken'
    });
  }

  user.name = name;
  user.username = username;

  await user.save();

  res.json({
    success: true,
    message: 'Profile updated successfully',
    data: {
      user
    }
  });
});

export const updateAvatar = asyncHandler(async (req, res) => {

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'Please upload an image file'
    });
  }

  const uploaded =
    await uploadBufferToCloudinary(
      req.file.buffer,
      'sakura-note/avatars'
    );

  const user =
    await User.findByIdAndUpdate(
      req.user._id,
      {
        avatar: uploaded.secure_url
      },
      {
        new: true
      }
    ).select('-password');

  res.json({
    success: true,
    message: 'Avatar updated successfully',
    data: {
      user
    }
  });
});