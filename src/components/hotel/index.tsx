import React, { useState } from 'react';
import Competitors from '../competitors';
import Price from '../price';
import * as TYPE from '../../type.d';
import styles from './index.module.scss';

export type HotelProps = {
  hotel: TYPE.HotelPrice;
}

const Hotel: React.FC<HotelProps> = props => {
  const { hotel } = props;
  const brIndex = hotel.description.indexOf('<br');
  const brief = hotel.description.slice(0, brIndex);
  const [fold, setFold] = useState(true);

  const toggleFold = () => {
    setFold(!fold);
  };

  return (
    <li key={hotel.id} role="article" className={styles.hotel}>
      <dl>
        <dt>
          <img src={hotel.photo} alt={hotel.name} />
        </dt>
        <dd className={styles.main}>
          <h2>{hotel.name}</h2>
          <div>
            <Price
              price={hotel.price}
            />
          </div>
          <div><label>Rating: </label><span>{hotel.rating}</span></div>
          <div className={styles.stars}><label>Stars: </label><span>{Array(hotel.stars).fill('★')}</span></div>
        </dd>
        <dd className={styles.extra}>
          <Competitors
            competitors={hotel.competitors}
          />
        </dd>
      </dl>
      <div><label>Address: </label><span>{hotel.address}</span></div>
      <div className={styles.description} dangerouslySetInnerHTML={{__html: fold ? brief : hotel.description}} />
      {-1 !== brIndex ? <span className={styles.more} onClick={toggleFold}>Read {fold ? 'More' : 'Less'}</span> : null}
    </li>
  );
};

export default Hotel;