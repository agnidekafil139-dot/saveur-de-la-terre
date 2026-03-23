import express from 'express';
import {
  getReviews,
  createReview,
  getReviewStats,
  approveReview
} from '../controllers/reviewController.js';
import { createReviewValidation } from '../validators/reviewValidator.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

/**
 * ===============================
 * Routes publiques
 * ===============================
 */

// Récupérer les avis approuvés
router.get('/', getReviews);

// Statistiques des avis (doit être avant /:id)
router.get('/stats', getReviewStats);

// Créer un avis
router.post('/', createReviewValidation, validate, createReview);


/**
 * ===============================
 * Routes admin (à protéger)
 * ===============================
 */

// Approuver un avis
router.put('/:id/approve', approveReview);

export default router;