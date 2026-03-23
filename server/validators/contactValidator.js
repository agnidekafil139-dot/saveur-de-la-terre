import { body } from 'express-validator';

export const createContactValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Le nom est requis')
    .isLength({ min: 2, max: 100 })
    .withMessage('Le nom doit contenir entre 2 et 100 caractères'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage("L'email est requis")
    .isEmail()
    .withMessage('Email invalide')
    .normalizeEmail(),
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Le téléphone est requis'),
  body('subject')
    .trim()
    .notEmpty()
    .withMessage('Le sujet est requis')
    .isIn(['reservation', 'menu', 'evenement', 'suggestion', 'reclamation', 'carriere', 'autre'])
    .withMessage('Sujet invalide'),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Le message est requis')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Le message doit contenir entre 10 et 1000 caractères')
];
