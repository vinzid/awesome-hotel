import React from 'react';
import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import App from './App';
import hotels from '../mock/hotels';
import pricesUSD from '../mock/prices-USD';
import pricesSGD from '../mock/prices-SGD';

const endpoint = '/api/';

// The loading indicator shown and hide means the request finished
const waitForLoading = async () => {
  const loading = await screen.findByText(/loading.../i);
  await waitForElementToBeRemoved(loading);
};

const expectRole = (role: string, length: number) => {
  const items = screen.queryAllByRole(role);
  expect(items).toBeInstanceOf(Array);
  expect(items.length).toBe(length);
}

// Sep up normal server for hotels and prices request
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

// Set up error router for hotels request
const hotelsError = server => {
  server.use(
    rest.get(endpoint, (req, res, ctx) => {
      return res(ctx.status(500))
    })
  );
};

// Set up error router for prices request
const pricesError = server => {
  server.use(
    rest.get(`${endpoint}/1/USD`, (req, res, ctx) => {
      return res(ctx.status(500))
    })
  );
};

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  localStorage.clear();
})
afterAll(() => server.close());

test('Renders App', async () => {
  const { rerender } = render(<App endpoint={endpoint} />);
  // Make sure the header is rendered properly
  const headerElement = screen.getByText(/Awesome Hotel/i);
  expect(headerElement).toBeInTheDocument();
  // The default currency should be U.S. Dollar 
  let select = screen.getByDisplayValue(/U\.S\. Dollar/i);
  expect(select).toBeInTheDocument();

  await waitForLoading();
  // There are 6 hotel items (with role as article)
  expectRole('article', 6);
  // 4 hotel items have competitors data (with role as group)
  expectRole('group', 4);
  // None of hotel item has tax & fees data (with role as note)
  expectRole('note', 0);

  // Select the Singapore Dollar
  fireEvent.change(select, {
    target: {
      value: "SGD",
    },
  });
  await waitForLoading();
  // 4 hotel items have tax & fees data in Singapore Dollar currency
  expectRole('note', 4);

  // Visit this page the second time after currency selection
  rerender(<App endpoint={endpoint} />);
  // The default currency should be the last selected currency
  select = screen.getByDisplayValue(/Singapore Dollar/i);
  expect(select).toBeInTheDocument();
});

test('Hotels Request Error', async () => {
  hotelsError(server);
  render(<App endpoint={endpoint} />);
  await waitForLoading();
  // Hotels request error message should be shown
  const error = await screen.findByText(/Request Hotels Error/i);
  expect(error).toBeInTheDocument();
});

test('Prices Request Error', async () => {
  pricesError(server);
  render(<App endpoint={endpoint} />);
  await waitForLoading();
  // Prices request error message should be shown
  const error = await screen.findByText(/Request Prices Error/i);
  expect(error).toBeInTheDocument();
  // All the 6 hotel items should be shown with the unavailable rates
  const prices = await screen.findAllByText(/Rates unavailable/i);
  expect(prices).toBeInstanceOf(Array);
  expect(prices.length).toBe(6);
});

test('Hotels & Prices Request Error', async () => {
  hotelsError(server);
  pricesError(server);
  render(<App endpoint={endpoint} />);
  await waitForLoading();
  // Hotels and prices request error message should be shown
  const error = await screen.findByText(/Request Hotels and Prices Error/i);
  expect(error).toBeInTheDocument();
});