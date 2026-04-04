import axios from 'axios';

// The chatbot backend runs on a different service, default 8000
const CHATBOT_API_URL = import.meta.env.VITE_CHATBOT_API_URL || 'http://localhost:8000';

const chatbotApi = axios.create({
  baseURL: CHATBOT_API_URL,
});

export const chatbotService = {
  getDocuments: async () => {
    const response = await chatbotApi.get('/documents');
    return response.data;
  },
  uploadDocument: async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await chatbotApi.post('/upload-doc', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
};
