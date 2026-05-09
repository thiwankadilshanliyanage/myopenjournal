import { Router } from 'express';
import {
  deleteAdminComment,
  getAdminComments,
  getAdminPosts,
  getAdminStats
} from '../controllers/adminController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';

const router = Router();

router.use(protect, adminOnly);
router.get('/stats', getAdminStats);
router.get('/posts', getAdminPosts);
router.get('/comments', getAdminComments);
router.delete('/comments/:id', deleteAdminComment);

export default router;
