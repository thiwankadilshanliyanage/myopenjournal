import { body } from 'express-validator';

export const updateProfileValidator = [
  body('name').optional().trim().isLength({ min: 2, max: 80 }),
  body('email').optional().isEmail().normalizeEmail()
];
