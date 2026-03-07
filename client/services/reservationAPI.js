import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const reservationAPI = {
  create: async (reservationData) => {
    const response = await axios.post(`${API_URL}/reservations`, reservationData);
    return response.data.data;
  },

  getAll: async () => {
    const response = await axios.get(`${API_URL}/reservations`);
    return response.data.data;
  }
};

export default reservationAPI;