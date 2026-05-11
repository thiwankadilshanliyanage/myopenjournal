import { Router } from 'express';

import {
  getLikeStatus,
  toggleLike
} from '../controllers/likeController.js';

import { protect } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/errorMiddleware.js';
import { toggleLikeValidator } from '../validators/likeValidators.js';

const router = Router();

router.get('/status/:postId', protect, getLikeStatus);

router.post(
  '/toggle',
  protect,
  toggleLikeValidator,
  validateRequest,
  toggleLike
);

export default router;