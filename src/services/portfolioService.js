import axios from 'axios';

// Ensure this matches your backend endpoint
const API_URL = '/api/portfolio-items';

export const getPortfolioItems = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching portfolio items", error);
        throw error;
    }
};

export const getPortfolioItemById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching portfolio item with id ${id}`, error);
        throw error;
    }
};

export const createPortfolioItem = async (portfolioData) => {
    try {
        const response = await axios.post(API_URL, portfolioData);
        return response.data;
    } catch (error) {
        console.error("Error creating portfolio item", error);
        throw error;
    }
};

export const updatePortfolioItem = async (id, portfolioData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, portfolioData);
        return response.data;
    } catch (error) {
        console.error(`Error updating portfolio item with id ${id}`, error);
        throw error;
    }
};

export const deletePortfolioItem = async (id) => {
    try {
        // Fallback for missing backend cascade delete: manually remove images first
        try {
            const images = await getPortfolioImages(id);
            if (images && images.length > 0) {
                await Promise.all(images.map(img =>
                    deletePortfolioImage(id, img.id)
                ));
            }
        } catch (imgError) {
            console.warn(`Could not delete associated images for portfolio item ${id}`, imgError);
        }

        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error(`Error deleting portfolio item with id ${id}`, error);
        throw error;
    }
};

// --- Portfolio Images ---

const IMAGE_API_URL = '/api/admin/portfolio-items';

export const getPortfolioImages = async (portfolioItemId) => {
    try {
        const response = await axios.get(`${IMAGE_API_URL}/${portfolioItemId}/images`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching images for portfolio item ${portfolioItemId}`, error);
        throw error;
    }
};

export const addPortfolioImage = async (portfolioItemId, imageData) => {
    try {
        const response = await axios.post(`${IMAGE_API_URL}/${portfolioItemId}/images`, imageData);
        return response.data;
    } catch (error) {
        console.error(`Error adding image to portfolio item ${portfolioItemId}`, error);
        throw error;
    }
};

export const updatePortfolioImage = async (portfolioItemId, imageId, imageData) => {
    // Note: The backend PUT endpoint is actually /api/admin/portfolio-items/{portfolioItemId}/images/{imageId}
    try {
        const response = await axios.put(`${IMAGE_API_URL}/${portfolioItemId}/images/${imageId}`, imageData);
        return response.data;
    } catch (error) {
        console.error(`Error updating image ${imageId}`, error);
        throw error;
    }
};

export const deletePortfolioImage = async (portfolioItemId, imageId) => {
    try {
        await axios.delete(`${IMAGE_API_URL}/${portfolioItemId}/images/${imageId}`);
    } catch (error) {
        console.error(`Error deleting image ${imageId}`, error);
        throw error;
    }
};
