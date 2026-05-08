import { body } from 'express-validator';

export const registerValidator = [
  body('username').trim().notEmpty().withMessage('Username is required'),
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('secretQuestion1').trim().notEmpty().withMessage('Secret question 1 is required'),
  body('secretAnswer1').trim().notEmpty().withMessage('Secret answer 1 is required'),
  body('secretQuestion2').trim().notEmpty().withMessage('Secret question 2 is required'),
  body('secretAnswer2').trim().notEmpty().withMessage('Secret answer 2 is required')
];

export const loginValidator = [
  body('username').trim().notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required')
];

export const forgotPasswordValidator = [
  body('username').trim().notEmpty().withMessage('Username is required')
];

export const resetPasswordValidator = [
  body('username').trim().notEmpty().withMessage('Username is required'),
  body('secretAnswer1').trim().notEmpty().withMessage('Secret answer 1 is required'),
  body('secretAnswer2').trim().notEmpty().withMessage('Secret answer 2 is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];