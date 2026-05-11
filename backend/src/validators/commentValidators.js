import { body, param } from 'express-validator';

export const createCommentValidator = [
  body('post')
    .notEmpty()
    .withMessage('Post is required'),

  body('content')
    .trim()
    .notEmpty()
    .withMessage('Comment content is required')
    .isLength({ max: 1000 })
    .withMessage('Comment must be less than 1000 characters'),

  body('parentComment')
    .optional()
    .isString()
];

export const updateCommentValidator = [
  param('id')
    .notEmpty()
    .withMessage('Comment id is required'),

  body('content')
    .trim()
    .notEmpty()
    .withMessage('Comment content is required')
    .isLength({ max: 1000 })
    .withMessage('Comment must be less than 1000 characters')
];

export const getPostCommentsValidator = [
  param('postId')
    .notEmpty()
    .withMessage('Post id is required')
];