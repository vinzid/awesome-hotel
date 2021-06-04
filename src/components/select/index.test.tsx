import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Select from './index';

const currencies = {
  ABC: {
    name: 'ABC Currency',
    symbol: '!',
  },
  DEF: {
    name: 'DEF Currency',
    symbol: '@',
  },
  GHI: {
    name: 'GHI Currency',
    symbol: '#',
  },
  JKL: {
    name: 'JKL Currency',
    symbol: '%',
  },
};
const currency = 'ABC';
const changeCurrency = jest.fn();

test('Renders Select', () => {
  render(<Select
    currencies={currencies}
    currency={currency}
    changeCurrency={changeCurrency}
  />);
  let select = screen.getByDisplayValue(/ABC Currency/i);
  expect(select).toBeInTheDocument();
  fireEvent.change(select, {
    target: {
      value: "GHI",
    },
  });
  select = screen.getByDisplayValue(/GHI Currency/i);
  expect(select).toBeInTheDocument();
  expect(changeCurrency).toHaveBeenCalled();
});