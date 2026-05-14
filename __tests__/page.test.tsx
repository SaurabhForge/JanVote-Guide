import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import HomePage from '../src/app/page';

describe('HomePage', () => {
  it('renders the hero section correctly', () => {
    render(<HomePage />);
    expect(screen.getByText(/Your Voice/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Your Vote/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Your Future/i)).toBeInTheDocument();
  });

  it('renders the features section correctly', () => {
    render(<HomePage />);
    expect(screen.getByText('Everything You Need to')).toBeInTheDocument();
    expect(screen.getByText('Vote Smart')).toBeInTheDocument();
    expect(screen.getAllByText('Voter Registration').length).toBeGreaterThan(0);
    expect(screen.getAllByText('How to Vote').length).toBeGreaterThan(0);
    expect(screen.getByText('Find Your Booth')).toBeInTheDocument();
    expect(screen.getByText('Election Schedule')).toBeInTheDocument();
  });

  it('renders call to action buttons', () => {
    render(<HomePage />);
    // Check for hero CTAs
    const registerBtns = screen.getAllByText(/Register/i);
    expect(registerBtns.length).toBeGreaterThan(0);
  });
});
