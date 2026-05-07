import { Router } from 'express';
import {
  createPost,
  deletePost,
  getPostBySlug,
  getPosts,
  updatePost
} from '../controllers/postController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/errorMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';
import { createPostValidator, updatePostValidator } from '../validators/postValidators.js';

const router = Router();

router.get('/', getPosts);
router.get('/:slug', getPostBySlug);
router.post('/', protect, adminOnly, upload.single('image'), createPostValidator, validateRequest, createPost);
router.put('/:id', protect, adminOnly, upload.single('image'), updatePostValidator, validateRequest, updatePost);
router.delete('/:id', protect, adminOnly, deletePost);

export default router;
