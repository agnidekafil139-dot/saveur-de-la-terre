import { body, query } from 'express-validator';

export const createReservationValidation = [
  body('customerName')
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
  body('date')
    .notEmpty()
    .withMessage('La date est requise')
    .isISO8601()
    .withMessage('Format de date invalide (ISO 8601)')
    .custom((value) => {
      const date = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (date < today) {
        throw new Error('La date ne peut pas être dans le passé');
      }
      return true;
    }),
  body('time')
    .trim()
    .notEmpty()
    .withMessage("L'heure est requise")
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage("Format d'heure invalide (HH:MM)"),
  body('numberOfGuests')
    .notEmpty()
    .withMessage('Le nombre de personnes est requis')
    .isInt({ min: 1, max: 20 })
    .withMessage('Le nombre de personnes doit être entre 1 et 20')
    .toInt(),
  body('specialRequest')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('La demande spéciale ne peut pas dépasser 500 caractères'),
  body('occasion')
    .optional()
    .isIn(['aucune', 'anniversaire', 'celebration', 'premiere_visite', 'autre'])
    .withMessage('Occasion invalide')
];

export const checkAvailabilityValidation = [
  query('date')
    .notEmpty()
    .withMessage('La date est requise')
    .isISO8601()
    .withMessage('Format de date invalide'),
  query('time')
    .notEmpty()
    .withMessage("L'heure est requise")
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage("Format d'heure invalide (HH:MM)")
];
