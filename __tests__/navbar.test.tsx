import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Navbar from '../src/components/Navbar';

describe('Navbar', () => {
  it('renders the JanVote logo', () => {
    render(<Navbar />);
    expect(screen.getByText('Jan')).toBeInTheDocument();
    expect(screen.getByText('Vote')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Navbar />);
    expect(screen.getByText('How to Vote')).toBeInTheDocument();
    expect(screen.getAllByText(/Register/i).length).toBeGreaterThan(0);
    expect(screen.getByText('Find Booth')).toBeInTheDocument();
  });
});
