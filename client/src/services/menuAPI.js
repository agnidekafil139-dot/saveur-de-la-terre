import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const menuAPI = {
  getAll: async () => {
    const response = await axios.get(`${API_URL}/menu`);
    return response.data.data;
  },

  getFavorites: async () => {
    const response = await axios.get(`${API_URL}/menu/favorites`);
    return response.data.data;
  },

  getById: async (id) => {
    const response = await axios.get(`${API_URL}/menu/${id}`);
    return response.data.data;
  }
};

export default menuAPI;