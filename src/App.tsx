import React, { useState, useEffect, ChangeEvent } from 'react';
import Select from './components/select';
import Hotel from './components/hotel';
import * as TYPE from './type.d';
const endpoint = 'http://demo.chanvinxiao.com/hotel/';

const App: React.FC = () => {
  const [hotels, setHotels] = useState<TYPE.Hotel[]>([]);
  const [loadHotels, setLoadHotels] = useState<boolean>(false);
  const [errorHotels, setErrorHotels] = useState<boolean>(false);
  const [prices, setPrices] = useState<TYPE.Price[]>([]);
  const [loadPrices, setLoadPrices] = useState<boolean>(false);
  const [errorPrices, setErrorPrices] = useState<boolean>(false);
  const [hotelsPrices, setHotelsPrices] = useState<TYPE.HotelPrice[]>([]);
  const [currency, setCurrency] = useState<string>(localStorage.getItem('currency') || 'USD');
  const currencies: TYPE.Currencies = {
    USD: {
      name: 'U.S. Dollar',
      symbol: '$',
    },
    SGD: {
      name: 'Singapore Dollar',
      symbol: 'S$',
    },
    CNY: {
      name: 'Mainland China Yuan',
      symbol: '¥',
    },
    KRW: {
      name: 'South Korean Won',
      symbol: '₩',
    },
  };

  const fetchJson = (url: string) => {
    return fetch(url)
      .then(result => result.json())
      .then(result => {
        if('object' !== typeof result) {
          throw new Error();
        } else {
          return result;
        }
      });
  }

  const changeCurrency = (e: ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value);
    localStorage.setItem('currency', e.target.value);
  };

  const formatter = (price: number) => {
    const round = 'KRW' !== currency ? Math.round : (price: any) => Math.round(price / 100) * 100;
    return currencies[currency].symbol + round(price).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  };

  useEffect(() => {
    setLoadHotels(true);
    setErrorHotels(false);
    fetchJson(`${endpoint}tokyo.json`)
      .then(setHotels)
      .catch(() => {
        setErrorHotels(true);
      })
      .finally(() => {
        setLoadHotels(false);
      })
  }, []);

  useEffect(() => {
    setLoadPrices(true);
    setErrorPrices(false);
    fetchJson(`${endpoint}${currency}.json`)
      .then(setPrices)
      .catch(() => {
        setErrorPrices(true);
      }).finally(() => {
        setLoadPrices(false);
      })
  }, [currency]);

  useEffect(() => {
    if(hotels.length > 0) {
      if(prices.length > 0){
        let combine = hotels.map(v => {
          const hotel: TYPE.HotelPrice = Object.assign({}, v);
          const {price, competitors, taxes_and_fees} = prices.find(w => v.id === w.id) || {};
          if(price) {
            hotel.price = {
              value: price,
              formatted: formatter(price),
            };
            if(taxes_and_fees) {
              const symbol = currencies[currency].symbol;
              hotel.price.taxes_and_fees = {
                tax: symbol + taxes_and_fees.tax,
                hotel_fees: symbol + taxes_and_fees.hotel_fees,
              }
            }
            if(competitors) {
              hotel.competitors = [{
                name: 'Us',
                price: {
                  value: hotel.price.value,
                  formatted: hotel.price.formatted
                },
                saving: '-'
              }];
              Object.keys(competitors).forEach(w => {
                hotel.competitors?.push({
                  name: w,
                  price: {
                    value: competitors[w],
                    formatted: formatter(competitors[w]),
                  },
                  saving: competitors[w] > price ? `${Math.round(100 * 100 * (competitors[w] - price) / competitors[w]) / 100}%` : '-'
                });
              });
              hotel.competitors.sort((v: any, w: any) => w.price.value - v.price.value);
            }
          }
          return hotel;
        });
        combine.sort((v, w) => !v.price ? 1 : !w.price ? -1 : 0);
        setHotelsPrices(combine);
      } else {
        setHotelsPrices(hotels);
      }
    }
  // eslint-disable-next-line
  }, [hotels, prices]);

  return (
    <div>
      <h1>Awesome Hotel</h1>
      <Select
        currencies={currencies}
        currency={currency}
        changeCurrency={changeCurrency}
      />
      {loadHotels || loadPrices ? <div>loading...</div> : null}
      {errorHotels || errorPrices ? <div>Request {`${errorHotels ? 'Hotels' : ''}${errorHotels && errorPrices ? ' and ' : ''}${errorPrices ? 'Prices' : ''}`} Error</div> : null}
      <ol>
        {hotelsPrices.map(v => (
          <Hotel
            hotel={v}
          />
        ))}
      </ol>
    </div>
  );
}

export default App;
