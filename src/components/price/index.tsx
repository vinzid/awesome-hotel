import React, { useState, MouseEvent } from 'react';
import * as TYPE from '../../type.d';
import styles from './index.module.scss';

export type PriceProps = {
  price: TYPE.FormattedPrice | undefined;
}

const Price: React.FC<PriceProps> = props => {
  const { price } = props;
  const [showExtra, setShowExtra] = useState(false);

  const toggleShowExtra = (e: MouseEvent) => {
    setShowExtra('mouseover' === e.type ? true : false);
  };

  return (
    <div
      onMouseOver={toggleShowExtra}
      onMouseOut={toggleShowExtra}
      className={styles.price}
    >
      <label>Price: </label>
      <span>{price ? price.formatted : 'Rates unavailable'}</span>
      {price?.taxes_and_fees ? <span className={styles.emphasize}> * </span> : null}
      <div className={showExtra ? styles.extra : styles.hide}>
        <p>Tax &amp; Fees {price?.taxes_and_fees ? 'Inclusive' : 'Exclusive'}</p>
        {price?.taxes_and_fees ? (
          <p role="note">
            {price.taxes_and_fees.tax ? (
              <span>
                <label>Tax: </label>
                {price.taxes_and_fees.tax}
              </span>
            ) : null}
            {price.taxes_and_fees.hotel_fees ? (
              <span>
                <label>Fees: </label>
                {price.taxes_and_fees.hotel_fees}
              </span>
            ) : null}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default Price;