import Comment from '../models/Comment.js';
import Post from '../models/Post.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { buildCommentTree } from '../services/commentService.js';

export const getCommentsByPost = asyncHandler(async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId })
    .populate('user', 'name avatar role')
    .sort({ createdAt: 1 });

  const tree = buildCommentTree(comments);

  res.json({
    success: true,
    data: { comments: tree }
  });
});

export const createComment = asyncHandler(async (req, res) => {
  const { post, content, parentComment } = req.body;

  const postExists = await Post.findById(post);
  if (!postExists) {
    return res.status(404).json({
      success: false,
      message: 'Post not found'
    });
  }

  const comment = await Comment.create({
    post,
    user: req.user._id,
    content,
    parentComment: parentComment || null
  });

  await Post.findByIdAndUpdate(post, { $inc: { commentCount: 1 } });

  const populated = await Comment.findById(comment._id).populate('user', 'name avatar role');

  res.status(201).json({
    success: true,
    message: parentComment ? 'Reply added successfully' : 'Comment added successfully',
    data: { comment: populated }
  });
});

export const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return res.status(404).json({
      success: false,
      message: 'Comment not found'
    });
  }

  const isOwner = String(comment.user) === String(req.user._id);
  const isAdmin = req.user.role === 'admin';

  if (!isOwner && !isAdmin) {
    return res.status(403).json({
      success: false,
      message: 'You do not have permission to delete this comment'
    });
  }

  await Comment.findByIdAndDelete(comment._id);
  await Post.findByIdAndUpdate(comment.post, { $inc: { commentCount: -1 } });

  res.json({
    success: true,
    message: 'Comment deleted successfully'
  });
});
