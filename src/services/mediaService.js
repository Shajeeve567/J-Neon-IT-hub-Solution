import { api } from './api';

export const mediaService = {
    getAllMedia: async () => {
        const response = await api.get('/api/media');
        return response.data;
    },
    uploadMedia: async (file, altText, caption) => {
        const formData = new FormData();
        formData.append('file', file);
        if (altText) formData.append('altText', altText);
        if (caption) formData.append('caption', caption);

        const response = await api.post('/api/media/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },
    deleteMedia: async (id) => {
        const response = await api.delete(`/api/media/${id}`);
        return response.data;
    }
};
