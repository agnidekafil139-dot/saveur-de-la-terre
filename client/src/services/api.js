import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
// Créer une instance axios avec configuration par défaut
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 secondes
});
// Intercepteur pour gérer les erreurs globalement
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Le serveur a répondu avec un code d'erreur
      console.error('Erreur API:', error.response.data);
    } else if (error.request) {
      // La requête a été faite mais pas de réponse
      console.error('Pas de réponse du serveur');
    } else {
      // Erreur lors de la configuration de la requête
      console.error('Erreur:', error.message);
    }
    return Promise.reject(error);
  }
);
// ============ MENU API ============
export const menuAPI = {
  // Obtenir tous les plats
  getAll: (params = {}) => api.get('/menu', { params }),
  // Obtenir un plat par ID
  getById: (id) => api.get(`/menu/${id}`),
  // Obtenir les plats favoris
  getFavorites: () => api.get('/menu/favorites'),
  // Filtrer par catégorie
  getByCategory: (category) => api.get('/menu', { params: { category } }),
};
// ============ RÉSERVATIONS API ============
export const reservationAPI = {
  // Créer une réservation
  create: (data) => api.post('/reservations', data),
  // Vérifier la disponibilité
  checkAvailability: (params) => api.get('/reservations/availability', { params }),
  // Obtenir toutes les réservations (admin)
  getAll: (params = {}) => api.get('/reservations', { params }),
};
// ============ AVIS API ============
export const reviewAPI = {
  // Obtenir tous les avis approuvés
  getAll: () => api.get('/reviews'),
  // Créer un nouvel avis
  create: (data) => api.post('/reviews', data),
  // Obtenir les statistiques
  getStats: () => api.get('/reviews/stats'),
};
// ============ CONTACT API ============
export const contactAPI = {
  // Envoyer un message
  send: (data) => api.post('/contact', data),
};
export default api;