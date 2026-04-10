// src/tests/pages/PortfolioPage.test.jsx
import { screen } from '@testing-library/react';
import PortfolioPage from '../../pages/PortfolioPage';
import { renderWithRouter } from '../utils/renderWithRouter';

describe('PortfolioPage', () => {
  test('renders page hero title', () => {
    renderWithRouter(<PortfolioPage />);
    expect(screen.getByRole('heading', { name: /our portfolio/i })).toBeInTheDocument();
  });

  test('renders portfolio cards', () => {
    renderWithRouter(<PortfolioPage />);
    // Check for at least one portfolio card label
    expect(screen.getByText(/cyber defense/i)).toBeInTheDocument();
  });
});