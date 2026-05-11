import Like from '../models/Like.js';
import Post from '../models/Post.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getLikeStatus = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const post = await Post.findById(postId);

  if (!post) {
    return res.status(404).json({
      success: false,
      message: 'Post not found'
    });
  }

  const like = await Like.findOne({
    post: postId,
    user: req.user._id
  });

  res.json({
    success: true,
    data: {
      liked: Boolean(like),
      likeCount: post.likeCount || 0
    }
  });
});

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

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $inc: { likeCount: -1 } },
      { new: true }
    );

    return res.json({
      success: true,
      message: 'Post unliked',
      data: {
        liked: false,
        likeCount: Math.max(updatedPost.likeCount || 0, 0)
      }
    });
  }

  await Like.create({
    post: postId,
    user: req.user._id
  });

  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    { $inc: { likeCount: 1 } },
    { new: true }
  );

  res.json({
    success: true,
    message: 'Post liked',
    data: {
      liked: true,
      likeCount: updatedPost.likeCount || 0
    }
  });
});