import { Router } from 'express';
import { createComment, deleteComment, getCommentsByPost } from '../controllers/commentController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/errorMiddleware.js';
import { commentLimiter } from '../middleware/rateLimiters.js';
import { createCommentValidator, getPostCommentsValidator } from '../validators/commentValidators.js';

const router = Router();

router.get('/:postId', getPostCommentsValidator, validateRequest, getCommentsByPost);
router.post('/', protect, commentLimiter, createCommentValidator, validateRequest, createComment);
router.delete('/:id', protect, deleteComment);

export default router;
