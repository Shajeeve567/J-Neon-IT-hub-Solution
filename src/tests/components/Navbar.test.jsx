import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../../components/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';

const renderWithRouter = (ui) => render(<Router>{ui}</Router>);

describe('Navbar component', () => {
  test('renders navigation links', () => {
    renderWithRouter(<Navbar />);
    const homeLinks = screen.getAllByRole('link', { name: /home/i });
    expect(homeLinks.length).toBeGreaterThan(0);
  });

test('menu toggle button works', () => {
  const { container } = renderWithRouter(<Navbar />);

  // Menu button
  const menuButton = screen.getByRole('button', { name: /toggle menu/i });

  // Mobile menu container
  const mobileMenu = container.querySelector('.navbar__mobile');

  // Initially hidden (you may have a CSS class controlling this)
  expect(mobileMenu).toBeInTheDocument();

  // Click toggle
  fireEvent.click(menuButton);

  // Now a mobile link should be visible
  const homeLink = mobileMenu.querySelector('a[href="/"]');
  expect(homeLink).toBeVisible();
});
});