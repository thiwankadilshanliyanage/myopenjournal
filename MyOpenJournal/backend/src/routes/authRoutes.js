import { Router } from 'express';

import {
  forgotPassword,
  login,
  logout,
  me,
  register,
  resetPassword
} from '../controllers/authController.js';

import { protect } from '../middleware/authMiddleware.js';

import { validateRequest } from '../middleware/errorMiddleware.js';

import {
  registerValidator,
  loginValidator,
  forgotPasswordValidator,
  resetPasswordValidator
} from '../validators/authValidators.js';

const router = Router();

router.post(
  '/register',
  registerValidator,
  validateRequest,
  register
);

router.post(
  '/login',
  loginValidator,
  validateRequest,
  login
);

router.post('/logout', logout);

router.post(
  '/forgot-password',
  forgotPasswordValidator,
  validateRequest,
  forgotPassword
);

router.post(
  '/reset-password',
  resetPasswordValidator,
  validateRequest,
  resetPassword
);

router.get('/me', protect, me);

export default router;