import { render, screen } from '@testing-library/react';
import App from './App';

test('renders dashboard component when the route is /', () => {
  render(<App />);
  
  // Look for an element that is unique to the Dashboard component
  const dashboardElement = screen.getByText(/Welcome to Dashboard/i);
  
  // Assert that the element is in the document
  expect(dashboardElement).toBeInTheDocument();
});