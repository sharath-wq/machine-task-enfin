import { body } from 'express-validator';

const validateBook = [
    body('name').isString().withMessage('Name must be a string').notEmpty().withMessage('Name is required'),
    body('description')
        .isString()
        .withMessage('Description must be a string')
        .notEmpty()
        .withMessage('Description is required'),
    body('publishDate')
        .isISO8601()
        .withMessage('Publish date must be a valid ISO 8601 date')
        .notEmpty()
        .withMessage('Publish date is required')
        .toDate(),
    body('price')
        .isFloat({ gt: 0 })
        .withMessage('Price must be a number greater than 0')
        .notEmpty()
        .withMessage('Price is required'),
    body('imageUrl')
        .isString()
        .withMessage('Image URL must be a string')
        .notEmpty()
        .withMessage('Image URL is required')
        .isURL()
        .withMessage('Image URL must be a valid URL'),
];

export { validateBook };
