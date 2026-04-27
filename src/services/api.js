import axios from 'axios';

// Set up base URL using Vite's environment variable syntax
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://j-neon-it-hub-backend-54hj.onrender.com';

export const api = axios.create({
  baseURL: API_BASE_URL,
});
