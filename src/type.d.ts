export type Hotel = {
  id: number;
  name: string;
  rating: number;
  stars: number;
  address: string;
  photo: string;
  description: string;
};

export type Price = {
  id: number;
  price: number;
  competitors?: {
    [key: string]: number;
  },
  taxes_and_fees?: {
    tax: number;
    hotel_fees: number;
  }
}

export type FormattedPrice = {
  value: number;
  formatted: string;
  taxes_and_fees?: {
    tax: string;
    hotel_fees: string;
  };
};

export type Competitors = {
  name: string;
  price: {
    value: number;
    formatted: string;
  };
  saving: string;
}[]

export type HotelPrice = Hotel & {
  price?: FormattedPrice
  competitors?: Competitors;
};

export type Currencies = {
  [key: string]: {
    name: string;
    symbol: string;
  };
}