import express from 'express';
import {
  createReservation,
  getReservations,
  checkAvailability,
  updateReservation,
  deleteReservation
} from '../controllers/reservationController.js';

const router = express.Router();

/**
 * ===============================
 * Routes publiques
 * ===============================
 */

// Créer une réservation
router.post('/', createReservation);

// Vérifier les disponibilités
router.get('/availability', checkAvailability);


/**
 * ===============================
 * Routes admin (à sécuriser plus tard)
 * ===============================
 */

// Récupérer toutes les réservations
router.get('/', getReservations);

// Mettre à jour une réservation
router.put('/:id', updateReservation);

// Supprimer une réservation
router.delete('/:id', deleteReservation);

export default router;