// src/pages/admin/tests/components/AdminPortfolioList.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import AdminPortfolioList from '../../AdminPortfolioList';

// Mock the portfolioService entirely
vi.mock('../../../../services/portfolioService', () => ({
  getPortfolioItems: vi.fn(),
  getPortfolioImages: vi.fn(),
  deletePortfolioItem: vi.fn(),
}));

import { getPortfolioItems, getPortfolioImages, deletePortfolioItem } from '../../../../services/portfolioService';

const mockProjects = [
  { id: 1, title: 'Project One', summary: 'Web App', clientName: 'Alice', description: 'Description 1', technologies: ['React', 'Node'] },
  { id: 2, title: 'Project Two', summary: 'Mobile App', clientName: 'Bob', description: 'Description 2', technologies: ['Flutter'] },
];

beforeEach(() => {
  vi.resetAllMocks(); // Reset mocks before each test
});

describe('AdminPortfolioList Component', () => {

  it('renders loading state initially', () => {
    render(<AdminPortfolioList />, { wrapper: MemoryRouter });
    expect(screen.getByText(/Loading projects.../i)).toBeInTheDocument();
  });

  it('renders portfolio items after fetch', async () => {
    getPortfolioItems.mockResolvedValue(mockProjects);
    getPortfolioImages.mockImplementation(async (id) => [{ imageUrl: `url-${id}` }]);

    await act(async () => {
      render(<AdminPortfolioList />, { wrapper: MemoryRouter });
    });

    await waitFor(() => {
      expect(screen.getByText('Project One')).toBeInTheDocument();
      expect(screen.getByText('Project Two')).toBeInTheDocument();
    });
  });

  it('renders empty state if no projects', async () => {
    getPortfolioItems.mockResolvedValue([]);
    await act(async () => {
      render(<AdminPortfolioList />, { wrapper: MemoryRouter });
    });

    await waitFor(() => {
      expect(screen.getByText(/No projects found/i)).toBeInTheDocument();
    });
  });

  it('opens delete modal when Delete is clicked', async () => {
    getPortfolioItems.mockResolvedValue(mockProjects);
    getPortfolioImages.mockResolvedValue([{ imageUrl: 'url-1' }]);

    await act(async () => {
      render(<AdminPortfolioList />, { wrapper: MemoryRouter });
    });

    await waitFor(() => screen.getByText('Project One'));

    fireEvent.click(screen.getAllByTitle('Delete')[0]);
    expect(screen.getByText(/Confirm Deletion/i)).toBeInTheDocument();
  });

  it('deletes project when confirm is clicked', async () => {
    getPortfolioItems.mockResolvedValue(mockProjects);
    getPortfolioImages.mockResolvedValue([{ imageUrl: 'url-1' }]);
    deletePortfolioItem.mockResolvedValue({});

    await act(async () => {
      render(<AdminPortfolioList />, { wrapper: MemoryRouter });
    });

    await waitFor(() => screen.getByText('Project One'));

    fireEvent.click(screen.getAllByTitle('Delete')[0]); // Open modal
    fireEvent.click(screen.getByText('Delete')); // Confirm delete

    await waitFor(() => {
      expect(screen.queryByText('Project One')).not.toBeInTheDocument();
    });
  });

});