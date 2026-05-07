import { Router } from 'express';
import { uploadImage } from '../controllers/uploadController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = Router();

router.post('/image', protect, adminOnly, upload.single('image'), uploadImage);

export default router;
