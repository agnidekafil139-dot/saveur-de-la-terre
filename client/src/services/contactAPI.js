
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const contactAPI = {
  send: async (contactData) => {
    const response = await axios.post(`${API_URL}/contact`, contactData);
    return response.data.data;
  },

  getAll: async () => {
    const response = await axios.get(`${API_URL}/contact`);
    return response.data.data;
  }
};

export default contactAPI;
