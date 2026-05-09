import Post from '../models/Post.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { getPostList } from '../services/postService.js';
import slugify from 'slugify';

// ✅ GET POSTS
export const getPosts = asyncHandler(async (req, res) => {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 9);
  const search = req.query.search || '';
  const category = req.query.category || '';

  const result = await getPostList({ page, limit, search, category });

  res.json({
    success: true,
    data: result
  });
});

// ✅ GET SINGLE POST
export const getPostBySlug = asyncHandler(async (req, res) => {
  const post = await Post.findOne({
    slug: req.params.slug,
    status: 'published'
  })
    .populate('author', 'name avatar')
    .populate('category', 'name slug');

  if (!post) {
    return res.status(404).json({
      success: false,
      message: 'Post not found'
    });
  }

  res.json({
    success: true,
    data: { post }
  });
});

// ✅ CREATE POST (FIXED)
export const createPost = asyncHandler(async (req, res) => {
  let baseSlug = slugify(req.body.title || 'post', { lower: true });
  let slug = baseSlug;
  let count = 1;

  // 🔥 ensure unique slug
  while (await Post.findOne({ slug })) {
    slug = `${baseSlug}-${count}`;
    count++;
  }

  const post = await Post.create({
    ...req.body,
    slug, // ✅ auto generated slug
    coverImage: req.body.coverImage || '',
    author: req.user._id
  });

  res.status(201).json({
    success: true,
    message: 'Post created successfully',
    data: { post }
  });
});

// ✅ UPDATE POST (FIXED)
export const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({
      success: false,
      message: 'Post not found'
    });
  }

  let slug = post.slug;

  // 🔥 update slug only if title changed
  if (req.body.title && req.body.title !== post.title) {
    let baseSlug = slugify(req.body.title, { lower: true });
    slug = baseSlug;
    let count = 1;

    while (await Post.findOne({ slug, _id: { $ne: post._id } })) {
      slug = `${baseSlug}-${count}`;
      count++;
    }
  }

  Object.assign(post, {
    ...req.body,
    slug,
    coverImage: req.body.coverImage || post.coverImage
  });

  await post.save();

  res.json({
    success: true,
    message: 'Post updated successfully',
    data: { post }
  });
});

// ✅ DELETE POST
export const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);

  if (!post) {
    return res.status(404).json({
      success: false,
      message: 'Post not found'
    });
  }

  res.json({
    success: true,
    message: 'Post deleted successfully'
  });
});