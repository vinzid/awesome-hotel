import React from 'react';
import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import App from './App';
import hotels from '../mock/hotels';
import pricesUSD from '../mock/prices-USD';
import pricesSGD from '../mock/prices-SGD';

const endpoint = '/api/';

const waitForLoading = async () => {
  const loading = await screen.findByText(/loading.../i);
  await waitForElementToBeRemoved(loading);
};

const expectRole = (role: string, length: number) => {
  const items = screen.queryAllByRole(role);
  expect(items).toBeInstanceOf(Array);
  expect(items.length).toBe(length);
}

const server = setupServer(
  rest.get(`${endpoint}tokyo.json`, (req, res, ctx) => {
    return res(ctx.json(hotels));
  }),
  rest.get(`${endpoint}USD.json`, (req, res, ctx) => {
    return res(ctx.json(pricesUSD));
  }),
  rest.get(`${endpoint}SGD.json`, (req, res, ctx) => {
    return res(ctx.json(pricesSGD));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers())
afterAll(() => server.close());

test('Renders App', async () => {
  const { rerender } = render(<App endpoint={endpoint} />);
  const headerElement = screen.getByText(/Awesome Hotel/i);
  expect(headerElement).toBeInTheDocument();
  let select = screen.getByDisplayValue(/U\.S\. Dollar/i);
  expect(select).toBeInTheDocument();

  await waitForLoading();
  expectRole('article', 6);
  expectRole('group', 4);
  expectRole('note', 0);

  fireEvent.change(select, {
    target: {
      value: "SGD",
    },
  });
  await waitForLoading();
  expectRole('note', 4);

  rerender(<App endpoint={endpoint} />);
  select = screen.getByDisplayValue(/Singapore Dollar/i);
  expect(select).toBeInTheDocument();
});