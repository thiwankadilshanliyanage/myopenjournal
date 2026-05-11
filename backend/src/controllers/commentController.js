import Comment from '../models/Comment.js';
import Post from '../models/Post.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { buildCommentTree } from '../services/commentService.js';

export const getCommentsByPost = asyncHandler(async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId })
    .populate('user', 'name username avatar role')
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

  if (parentComment) {
    const parentExists = await Comment.findOne({
      _id: parentComment,
      post
    });

    if (!parentExists) {
      return res.status(404).json({
        success: false,
        message: 'Parent comment not found'
      });
    }
  }

  const comment = await Comment.create({
    post,
    user: req.user._id,
    content,
    parentComment: parentComment || null
  });

  await Post.findByIdAndUpdate(post, {
    $inc: { commentCount: 1 }
  });

  const populated = await Comment.findById(comment._id).populate(
    'user',
    'name username avatar role'
  );

  res.status(201).json({
    success: true,
    message: parentComment
      ? 'Reply added successfully'
      : 'Comment added successfully',
    data: {
      comment: {
        ...populated.toObject(),
        replies: []
      }
    }
  });
});

export const updateComment = asyncHandler(async (req, res) => {
  const { content } = req.body;

  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return res.status(404).json({
      success: false,
      message: 'Comment not found'
    });
  }

  const isOwner = String(comment.user) === String(req.user._id);

  if (!isOwner) {
    return res.status(403).json({
      success: false,
      message: 'You do not have permission to edit this comment'
    });
  }

  comment.content = content;
  await comment.save();

  const populated = await Comment.findById(comment._id).populate(
    'user',
    'name username avatar role'
  );

  res.json({
    success: true,
    message: 'Comment updated successfully',
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

  const idsToDelete = [comment._id];

  const childComments = await Comment.find({
    parentComment: comment._id
  }).select('_id');

  childComments.forEach((child) => idsToDelete.push(child._id));

  await Comment.deleteMany({
    _id: { $in: idsToDelete }
  });

  await Post.findByIdAndUpdate(comment.post, {
    $inc: { commentCount: -idsToDelete.length }
  });

  res.json({
    success: true,
    message: 'Comment deleted successfully'
  });
});