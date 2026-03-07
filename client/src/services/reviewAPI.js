import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const reviewAPI = {
  getAll: async () => {
    const response = await axios.get(`${API_URL}/reviews`);
    return response.data.data;
  },

  create: async (reviewData) => {
    const response = await axios.post(`${API_URL}/reviews`, reviewData);
    return response.data.data;
  },

  getStats: async () => {
    const response = await axios.get(`${API_URL}/reviews/stats`);
    return response.data.data;
  }
};

export default reviewAPI;