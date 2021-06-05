import React from 'react';
import * as TYPE from '../../type.d';
import styles from './index.module.scss';

export type CompetitorsType = {
  competitors: TYPE.Competitors | undefined;
}

const Competitors: React.FC<CompetitorsType> = props => {
  const { competitors } = props;

  return competitors ? (
    <table
      role="group"
      className={styles.competitors}
    >
      <caption>Competitors and Saving with Us</caption>
      <thead>
        <tr>
          <th>Platform</th>
          <th>Price</th>
          <th>Saving</th>
        </tr>
      </thead>
      <tbody>
        {competitors.map((w: TYPE.Competitor, i: number) => (
          <tr
            key={w.name}
            role="row"
            className={'Us' === w.name ? styles.us : (competitors.length - 1 === i ? styles.dear : '')}
          >
            <td>{w.name}</td>
            <td>{w.price.formatted}</td>
            <td>{w.saving}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ): null;
};

export default Competitors;