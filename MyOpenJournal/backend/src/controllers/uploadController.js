import { asyncHandler } from '../utils/asyncHandler.js';
import { uploadBufferToCloudinary } from '../services/cloudinaryService.js';

export const uploadImage = asyncHandler(async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image file'
      });
    }

    const uploaded = await uploadBufferToCloudinary(
      req.file.buffer,
      'sakura-note/posts'
    );

    res.status(201).json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        imageUrl: uploaded.secure_url
      }
    });
  } catch (error) {
    console.error('UPLOAD ERROR:', error);

    res.status(500).json({
      success: false,
      message: error.message || 'Upload failed'
    });
  }
});