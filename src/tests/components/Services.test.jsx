// src/tests/components/Services.test.jsx
import { screen } from '@testing-library/react';
import Services from '../../components/Services';
import { renderWithRouter } from '../utils/renderWithRouter';
import * as api from '../../services/api'; // Import fetchAllServices

vi.mock('../../services/api');

describe('Services component', () => {
  beforeEach(() => {
    api.fetchAllServices.mockResolvedValue([
      { id: 1, title: 'Web Development' },
      { id: 2, title: 'Cloud Solutions' },
      { id: 3, title: 'Cyber Security' },
    ]);
  });

  test('renders services section title', () => {
    renderWithRouter(<Services />);
    expect(screen.getByRole('heading', { name: /our services/i })).toBeInTheDocument();
  });

  test('renders all service cards', async () => {
    renderWithRouter(<Services />);
    expect(await screen.findByText(/web development/i)).toBeInTheDocument();
    expect(screen.getByText(/cloud solutions/i)).toBeInTheDocument();
    expect(screen.getByText(/cyber security/i)).toBeInTheDocument();
  });
});