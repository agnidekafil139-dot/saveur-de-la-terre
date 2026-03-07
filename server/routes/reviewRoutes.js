import express from 'express';
import {
  getReviews,
  createReview,
  getReviewStats,
  approveReview
} from '../controllers/reviewController.js';

const router = express.Router();

/**
 * ===============================
 * Routes publiques
 * ===============================
 */

// Récupérer les avis approuvés
router.get('/', getReviews);

// Créer un avis
router.post('/', createReview);

// Statistiques des avis
router.get('/stats', getReviewStats);


/**
 * ===============================
 * Routes admin (à protéger)
 * ===============================
 */

// Approuver un avis
router.put('/:id/approve', approveReview);

export default router;