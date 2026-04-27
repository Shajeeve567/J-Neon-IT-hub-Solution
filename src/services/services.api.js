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
    const response = await api.get('https://j-neon-it-hub-backend-54hj.onrender.com/api/services/all');
    console.log('Fetched services:', response.data);
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
    const response = await api.get(`https://j-neon-it-hub-backend-54hj.onrender.com/api/services/${id}`);
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
    const response = await api.post('https://j-neon-it-hub-backend-54hj.onrender.com/api/services/add', serviceData);
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
    const response = await api.put(`https://j-neon-it-hub-backend-54hj.onrender.com/api/services/${id}`, serviceData);
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
    const response = await api.delete(`https://j-neon-it-hub-backend-54hj.onrender.com/api/services/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting service with ID ${id}:`, error);
    throw error;
  }
};


export const createServicePlan = async (planData) => {
  try {
    const response = await api.post('https://j-neon-it-hub-backend-54hj.onrender.com/api/service/plans', planData);
    return response.data;
  } catch (error) {
    console.error('Error creating service plan:', error);
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
    }
    throw error;
  }
};

/**
 * Update an existing service plan
 * Expected planData includes id field
 */
// =============================================
// Service Plans API calls
// =============================================

/**
 * Fetch all plans for a specific service
 */
export const fetchServicePlans = async (serviceId) => {
  try {
    const response = await api.get(`https://j-neon-it-hub-backend-54hj.onrender.com/api/service/plans/serviceId/${serviceId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching service plans:', error);
    throw error;
  }
};

/**
 * Fetch a single plan by its ID
 */
export const fetchPlanById = async (planId) => {
  try {
    const response = await api.get(`/api/service/plans/${planId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching plan with ID ${planId}:`, error);
    throw error;
  }
};

/**
 * Fetch all plans (across all services)
 */
export const fetchAllPlans = async () => {
  try {
    const response = await api.get('https://j-neon-it-hub-backend-54hj.onrender.com/api/service/plans/all');
    return response.data;
  } catch (error) {
    console.error('Error fetching all plans:', error);
    throw error;
  }
};
export const updateServicePlan = async (planData) => {
  try {
    const response = await api.put('https://j-neon-it-hub-backend-54hj.onrender.com/api/service/plans/id', planData);
    return response.data;
  } catch (error) {
    console.error('Error updating service plan:', error);
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
    }
    throw error;
  }
};

export const deleteServicePlan = async (planId) => {
  try {
    const response = await api.delete(`https://j-neon-it-hub-backend-54hj.onrender.com/api/service/plans/${planId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting service plan:', error);
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
    }
    throw error;
  }
};
