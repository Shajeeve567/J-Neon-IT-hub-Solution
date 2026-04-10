// src/tests/components/Footer.test.jsx
import { screen } from '@testing-library/react';
import Footer from '../../components/Footer';
import { renderWithRouter } from '../utils/renderWithRouter';

describe('Footer component', () => {
  test('renders contact information', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByText(/hello@j-neon\.com/i)).toBeInTheDocument();
    expect(screen.getByText(/\+94 77 3079 159/i)).toBeInTheDocument();
    expect(screen.getByText(/NALLAYAN STREET/i)).toBeInTheDocument();
  });

  test('renders copyright', () => {
    renderWithRouter(<Footer />);
    // Using a function matcher to handle "© 2026 J-NEON IT HUB. All rights reserved."
    expect(
      screen.getByText((content) => content.includes('© 2026 J-NEON IT HUB'))
    ).toBeInTheDocument();
  });
});