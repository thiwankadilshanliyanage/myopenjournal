import { Router } from 'express';
import { getProfile, updateAvatar, updateProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/errorMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';
import { updateProfileValidator } from '../validators/userValidators.js';

const router = Router();

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfileValidator, validateRequest, updateProfile);
router.put('/avatar', protect, upload.single('image'), updateAvatar);

export default router;
