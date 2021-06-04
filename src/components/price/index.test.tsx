import React from 'react';
import { render, screen } from '@testing-library/react';
import Price from './index';
import price from '../../../mock/price';

test('Renders Price', () => {
  render(<Price
    price={price}
  />);
  const note = screen.getByRole('note');
  expect(note).toBeInTheDocument();
});

test('Renders Price without price', () => {
  render(<Price />);
  const unavailable = screen.getByText(/Rates unavailable/);
  expect(unavailable).toBeInTheDocument();
});