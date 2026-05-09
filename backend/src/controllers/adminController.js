import User from '../models/User.js';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getAdminStats = asyncHandler(async (req, res) => {
  const [users, posts, comments, latestPosts, latestComments] = await Promise.all([
    User.countDocuments(),
    Post.countDocuments(),
    Comment.countDocuments(),
    Post.find().sort({ createdAt: -1 }).limit(5).populate('author', 'name').populate('category', 'name'),
    Comment.find().sort({ createdAt: -1 }).limit(5).populate('user', 'name').populate('post', 'title slug')
  ]);

  res.json({
    success: true,
    data: {
      stats: { users, posts, comments },
      latestPosts,
      latestComments
    }
  });
});

export const getAdminPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .populate('author', 'name')
    .populate('category', 'name slug');

  res.json({
    success: true,
    data: { posts }
  });
});

export const getAdminComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find()
    .sort({ createdAt: -1 })
    .populate('user', 'name email')
    .populate('post', 'title slug');

  res.json({
    success: true,
    data: { comments }
  });
});

export const deleteAdminComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findByIdAndDelete(req.params.id);

  if (!comment) {
    return res.status(404).json({
      success: false,
      message: 'Comment not found'
    });
  }

  res.json({
    success: true,
    message: 'Comment deleted successfully'
  });
});
