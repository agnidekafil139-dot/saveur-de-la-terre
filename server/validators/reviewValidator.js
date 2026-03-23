import { body } from 'express-validator';

export const createReviewValidation = [
  body('customerName')
    .trim()
    .notEmpty()
    .withMessage('Le nom est requis')
    .isLength({ min: 2, max: 100 })
    .withMessage('Le nom doit contenir entre 2 et 100 caractères'),
  body('rating')
    .notEmpty()
    .withMessage('La note est requise')
    .isInt({ min: 1, max: 5 })
    .withMessage('La note doit être comprise entre 1 et 5')
    .toInt(),
  body('comment')
    .trim()
    .notEmpty()
    .withMessage('Le commentaire est requis')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Le commentaire doit contenir entre 10 et 1000 caractères'),
  body('visitDate')
    .optional()
    .isISO8601()
    .withMessage('Format de date invalide')
];
