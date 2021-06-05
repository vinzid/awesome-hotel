import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

  const more = screen.getByText(/Read More/i);
  expect(more).toBeInTheDocument();
  const brief = screen.getByText(/brief description/i);
  expect(brief).toBeInTheDocument();
  let extra = screen.queryByText(/extra description/i);
  expect(extra).toBeNull();
  fireEvent.click(more);
  extra = screen.getByText(/extra description/i);
  expect(extra).toBeInTheDocument();
});