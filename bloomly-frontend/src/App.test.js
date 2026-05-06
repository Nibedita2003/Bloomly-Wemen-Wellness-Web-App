import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('react-calendar', () => () => <div>Calendar</div>);

test('renders the login screen by default', () => {
  render(<App />);
  expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
});
