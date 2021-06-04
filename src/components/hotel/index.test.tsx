import React from 'react';
import { render, screen } from '@testing-library/react';
import Hotel from './index';
import hotel from '../../../mock/hotel';

test('Renders Hotel', () => {
  render(<Hotel
    hotel={hotel}
  />);
  const item = screen.getByRole('article');
  expect(item).toBeInTheDocument();

  const price = screen.getByText(/Price:/i);
  expect(price).toBeInTheDocument();

  const group = screen.queryByRole('group');
  expect(group).toBeNull();
});