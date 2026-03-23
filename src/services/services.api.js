import { api } from './api'

/**
 * Expected Service response from backend:
 * {
 *   id: string,
 *   title: string,
 *   icon: string,
 *   slug: string,
 *   shortDescription: string,
 *   sortOrder: number
 * }
 */


/**
 * Fetch all services
 */
export const fetchAllServices = async () => {
  try {
    const response = await api.get('/api/services/all');
    return response.data;
  } catch (error) {
    console.error('Error fetching all services:', error);
    throw error;
  }
};


/**
 * Fetch a single service by its ID
 */
export const fetchServiceById = async (id) => {
  try {
    const response = await api.get(`/api/services/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching service with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Create a new service
 * Expected serviceData: { title, shortDescription, slug, icon, isActive }
 */
export const createService = async (serviceData) => {
  try {
    const response = await api.post('/api/services/add', serviceData);
    return response.data;
  } catch (error) {
    console.error('Error creating service:', error);
    throw error;
  }
};

/**
 * Update an existing service
 * Expected serviceData: { title, shortDescription, slug, icon, isActive }
 */
export const updateService = async (id, serviceData) => {
  try {
    const response = await api.put(`/api/services/${id}`, serviceData);
    return response.data;
  } catch (error) {
    console.error(`Error updating service with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a service
 */
export const deleteService = async (id) => {
  try {
    const response = await api.delete(`/api/services/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting service with ID ${id}:`, error);
    throw error;
  }
};

