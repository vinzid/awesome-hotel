import React from 'react';
import * as TYPE from '../../type.d';

export type CompetitorsType = {
  competitors: TYPE.Competitors | undefined;
}

const Competitors: React.FC<CompetitorsType> = props => {
  const { competitors } = props;

  return competitors ? (
    <table role="group">
      <thead>
        <tr>
          <th>Platform</th>
          <th>Price</th>
          <th>Saving</th>
        </tr>
      </thead>
      <tbody>
        {competitors.map((w: any) => (
          <tr key={w.name} role="row">
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