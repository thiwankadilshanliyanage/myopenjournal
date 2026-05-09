import { body, param } from 'express-validator';

export const createCommentValidator = [
  body('post').notEmpty().withMessage('Post is required'),
  body('content').trim().notEmpty().withMessage('Comment content is required').isLength({ max: 1000 }),
  body('parentComment').optional().isString()
];

export const getPostCommentsValidator = [
  param('postId').notEmpty().withMessage('Post id is required')
];
