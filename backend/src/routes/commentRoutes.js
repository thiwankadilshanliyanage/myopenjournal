import { Router } from 'express';

import {
  createComment,
  deleteComment,
  getCommentsByPost,
  updateComment
} from '../controllers/commentController.js';

import { protect } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/errorMiddleware.js';
import { commentLimiter } from '../middleware/rateLimiters.js';

import {
  createCommentValidator,
  getPostCommentsValidator,
  updateCommentValidator
} from '../validators/commentValidators.js';

const router = Router();

router.get(
  '/:postId',
  getPostCommentsValidator,
  validateRequest,
  getCommentsByPost
);

router.post(
  '/',
  protect,
  commentLimiter,
  createCommentValidator,
  validateRequest,
  createComment
);

router.put(
  '/:id',
  protect,
  updateCommentValidator,
  validateRequest,
  updateComment
);

router.delete(
  '/:id',
  protect,
  deleteComment
);

export default router;