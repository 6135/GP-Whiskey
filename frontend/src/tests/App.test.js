import { render, screen } from '@testing-library/react';
import Homepage from '../components/homepage/homepage';

test('renders homepage', () => {
  render(<Homepage />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
