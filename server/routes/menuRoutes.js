import express from 'express';
import {
  getMenuItems,
  getMenuItem,
  getFavoriteItems
} from '../controllers/menuController.js';

const router = express.Router();

/**
 * ===============================
 * Routes publiques
 * ===============================
 */

// Récupérer tout le menu
router.get('/', getMenuItems);

// Récupérer les plats favoris
router.get('/favorites', getFavoriteItems);

// Récupérer un plat par ID
router.get('/:id', getMenuItem);

export default router;