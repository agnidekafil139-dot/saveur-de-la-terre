import express from 'express';
import {
  createReservation,
  getReservations,
  checkAvailability,
  updateReservation,
  deleteReservation
} from '../controllers/reservationController.js';
import {
  createReservationValidation,
  checkAvailabilityValidation
} from '../validators/reservationValidator.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

/**
 * ===============================
 * Routes publiques
 * ===============================
 */

// Vérifier les disponibilités (doit être avant /:id)
router.get('/availability', checkAvailabilityValidation, validate, checkAvailability);

// Créer une réservation
router.post('/', createReservationValidation, validate, createReservation);


/**
 * ===============================
 * Routes admin (à sécuriser plus tard)
 * ===============================
 */

// Récupérer toutes les réservations
router.get('/', getReservations); // GET /api/reservations (liste)

// Mettre à jour une réservation
router.put('/:id', updateReservation);

// Supprimer une réservation
router.delete('/:id', deleteReservation);

export default router;