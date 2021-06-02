import React from 'react';
import Competitors from '../competitors';
import Price from '../price';
import * as TYPE from '../../type.d';

export type HotelProps = {
  hotel: TYPE.HotelPrice;
}

const Hotel: React.FC<HotelProps> = props => {
  const { hotel } = props;

  return (
    <li key={hotel.id}>
      <dl>
        <dt>
          <img src={hotel.photo} alt={hotel.name} />
        </dt>
        <dd>
          <h2>{hotel.name}</h2>
          <div>
            <Price
              price={hotel.price}
            />
          </div>
          <div><label>Rating: </label><span>{hotel.rating}</span></div>
          <div><label>Stars: </label><span>{hotel.stars}</span></div>
          <Competitors
            competitors={hotel.competitors}
          />
          <div><label>Address: </label><span>{hotel.address}</span></div>
          <div dangerouslySetInnerHTML={{__html: hotel.description}} />
        </dd>
      </dl>
    </li>
  );
};

export default Hotel;