import { validationResult } from 'express-validator';

/**
 * Middleware qui vérifie les erreurs de validation et retourne 400 si invalide
 */
export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = errors.array().map((err) => ({
    field: err.path,
    message: err.msg
  }));

  return res.status(400).json({
    success: false,
    message: 'Données invalides',
    errors: extractedErrors
  });
};
