import React from 'react';
import { render, screen } from '@testing-library/react';
import Competitors from './index';
import competitors from '../../../mock/competitors';

test('Renders Competitors', () => {
  render(<Competitors
    competitors={competitors}
  />);
  const rows = screen.getAllByRole('row');
  expect(rows).toBeInstanceOf(Array);
  expect(rows.length).toBe(4);
});