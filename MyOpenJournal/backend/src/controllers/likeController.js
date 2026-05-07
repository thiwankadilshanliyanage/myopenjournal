import Like from '../models/Like.js';
import Post from '../models/Post.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const toggleLike = asyncHandler(async (req, res) => {
  const { postId } = req.body;

  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({
      success: false,
      message: 'Post not found'
    });
  }

  const existing = await Like.findOne({
    post: postId,
    user: req.user._id
  });

  if (existing) {
    await existing.deleteOne();
    await Post.findByIdAndUpdate(postId, { $inc: { likeCount: -1 } });

    return res.json({
      success: true,
      message: 'Post unliked',
      data: { liked: false }
    });
  }

  await Like.create({
    post: postId,
    user: req.user._id
  });

  await Post.findByIdAndUpdate(postId, { $inc: { likeCount: 1 } });

  res.json({
    success: true,
    message: 'Post liked',
    data: { liked: true }
  });
});
