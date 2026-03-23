import express from 'express';
import {
  createContact,
  getContacts,
  updateContactStatus
} from '../controllers/contactController.js';
import { createContactValidation } from '../validators/contactValidator.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

/**
 * ===============================
 * Routes publiques
 * ===============================
 */

// Envoyer un message via le formulaire de contact
router.post('/', createContactValidation, validate, createContact);


/**
 * ===============================
 * Routes admin (à sécuriser)
 * ===============================
 */

// Récupérer tous les messages
router.get('/', getContacts);

// Mettre à jour le statut d’un message (lu, traité, archivé…)
router.put('/:id', updateContactStatus);

export default router;