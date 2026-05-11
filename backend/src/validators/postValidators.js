import { body, param } from 'express-validator';

export const createPostValidator = [

  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 180 }),

  body('excerpt')
    .trim()
    .notEmpty()
    .withMessage('Excerpt is required')
    .isLength({ max: 320 }),

  body('content')
    .trim()
    .notEmpty()
    .withMessage('Content is required'),

  body('category')
    .notEmpty()
    .withMessage('Category is required'),

  body('status')
    .optional()
    .isIn(['draft', 'published'])
];

export const updatePostValidator = [
  param('id').notEmpty(),
  ...createPostValidator
];