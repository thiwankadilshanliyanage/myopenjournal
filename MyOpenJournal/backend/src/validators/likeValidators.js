import { body } from 'express-validator';

export const toggleLikeValidator = [
  body('postId').notEmpty().withMessage('Post id is required')
];
