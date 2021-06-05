import React, { ChangeEvent } from 'react';
import * as TYPE from '../../type.d';
import styles from './index.module.scss';

export type SelectProps = {
  currencies: TYPE.Currencies;
  currency: string;
  changeCurrency: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<SelectProps> = props => {
  const {currencies, currency, changeCurrency} = props;
  
  return (
    <div className={styles.selectCurrency}>
        <label htmlFor="currency">Select Currency: </label>
        <select
          defaultValue={currency}
          onChange={changeCurrency}
          id="currency"
        >
          {Object.keys(currencies).map((v: any) => (
            <option
              key={v}
              value={v}
            >
              {currencies[v as (keyof typeof currencies)].name}
            </option>
          ))}
        </select>
    </div>
  );
};

export default Select;