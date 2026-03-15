// src/pages/admin/tests/components/AdminServices.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import AdminAddService from '../../services/AdminAddService';
import AdminEditService from '../../services/AdminEditService';
import AdminServicesList from '../../services/AdminServicesList';

// Mock the API
vi.mock('../../../../services/services.api', () => ({
  createService: vi.fn(),
  fetchServiceById: vi.fn(),
  updateService: vi.fn(),
  fetchAllServices: vi.fn(),
  deleteService: vi.fn(),
}));

import {
  createService,
  fetchServiceById,
  updateService,
  fetchAllServices,
  deleteService,
} from '../../../../services/services.api';

beforeEach(() => {
  vi.resetAllMocks();
});

describe('Admin Services Components', () => {

  it('renders AdminAddService and submits form', async () => {
    createService.mockResolvedValue({ id: 1 });

    await act(async () => {
      render(<AdminAddService />, { wrapper: MemoryRouter });
    });

    fireEvent.change(screen.getByPlaceholderText(/e.g. Web Development/i), { target: { value: 'Test Service' } });
    fireEvent.change(screen.getByPlaceholderText(/e.g. web-development/i), { target: { value: 'test-service' } });
    fireEvent.change(screen.getByPlaceholderText(/Briefly describe this service/i), { target: { value: 'A test service' } });

    await act(async () => {
      fireEvent.click(screen.getByText(/Save New Service/i));
    });

    expect(createService).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Test Service', slug: 'test-service', shortDescription: 'A test service' })
    );
  });

  it('renders AdminServicesList and can delete a service', async () => {
    fetchAllServices.mockResolvedValue([
      { id: 1, title: 'Service 1', shortDescription: 'Desc 1', icon: '🛠️', isActive: true }
    ]);
    deleteService.mockResolvedValue({});

    await act(async () => {
      render(<AdminServicesList />, { wrapper: MemoryRouter });
    });

    await waitFor(() => screen.getByText('Service 1'));

    vi.stubGlobal('confirm', () => true); // simulate user clicking "OK" on confirm

    await act(async () => {
      fireEvent.click(screen.getByTitle('Delete'));
    });

    await waitFor(() => {
      expect(screen.queryByText('Service 1')).not.toBeInTheDocument();
    });

    vi.unstubAllGlobals();
  });

});