import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const contactAPI = {
  // Envoyer un message de contact
  send: async (contactData) => {
    try {
      const response = await axios.post(`${API_URL}/contact`, contactData);
      return response.data.data; // Supposant que cette structure est cohérente
    } catch (error) {
      // Amélioration de la gestion des erreurs
      console.error('Erreur lors de l\'envoi du message de contact :', error);
      throw new Error(error.response?.data?.message || 'Une erreur est survenue lors de l\'envoi du message');
    }
  },

  // Obtenir tous les messages (admin)
  getAll: async () => {
    try {
      const response = await axios.get(`${API_URL}/contact`);
      return response.data.data; // Supposant que cette structure est cohérente
    } catch (error) {
      // Amélioration de la gestion des erreurs
      console.error('Erreur lors de la récupération des messages de contact :', error);
      throw new Error(error.response?.data?.message || 'Une erreur est survenue lors de la récupération des messages');
    }
  }
};

export default contactAPI;