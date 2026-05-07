import { Router } from 'express';
import {
  forgotPassword,
  login,
  logout,
  me,
  register,
  resetPassword,
   verifyEmail
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/errorMiddleware.js';
import { authLimiter } from '../middleware/rateLimiters.js';
import {
  forgotPasswordValidator,
  loginValidator,
  registerValidator,
  resetPasswordValidator
} from '../validators/authValidators.js';

const router = Router();

router.post('/register', authLimiter, registerValidator, validateRequest, register);
router.post('/login', authLimiter, loginValidator, validateRequest, login);
router.post('/logout', logout);
router.post('/forgot-password', authLimiter, forgotPasswordValidator, validateRequest, forgotPassword);
router.post('/reset-password/:token', authLimiter, resetPasswordValidator, validateRequest, resetPassword);
router.get('/me', protect, me);
router.get('/verify-email/:token', verifyEmail);

export default router;
