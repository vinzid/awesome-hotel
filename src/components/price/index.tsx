import React from 'react';
import * as TYPE from '../../type.d';

export type PriceProps = {
  price: TYPE.FormattedPrice | undefined;
}

const Price: React.FC<PriceProps> = props => {
  const { price } = props;

  return (
    <div>
      <label>Price: </label>
      <span>{price ? price.formatted : 'Rates unavailable'}</span>
      {price?.taxes_and_fees ? (
        <span role="note"> (
          {price.taxes_and_fees.tax ? <span> <label>Tax: </label>{price.taxes_and_fees.tax} </span> : null}
          {price.taxes_and_fees.hotel_fees ? <span> <label>Fees: </label>{price.taxes_and_fees.hotel_fees} </span> : null}
        ) </span>
      ): null}
    </div>
  );
};

export default Price;