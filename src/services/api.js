import axios from 'axios';

// Set up base URL using Vite's environment variable syntax
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const api = axios.create({
  baseURL: API_BASE_URL,
});
