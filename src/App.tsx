import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortType {
  INFO = 'info',
  SUCCESS = 'success',
  REVERCE = 'warning',
}

const FILTER_INFO = 'info';
const FILTER_SUCCESS = 'success';
const REVERSE_WARNING = 'warning';

function getPreparedGoods(
  goods: string[],
  sortField: string,
  sortReverce: string,
) {
  const prepareGoods = [...goods];

  if (sortField) {
    prepareGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.INFO:
          return good1.localeCompare(good2);
        case SortType.SUCCESS:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (sortReverce) {
    switch (sortReverce) {
      case SortType.REVERCE:
        return prepareGoods.reverse();
      default:
        return prepareGoods;
    }
  }

  return prepareGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [sortReverce, setSortReverce] = useState('');
  const visiableGoods = getPreparedGoods(
    goodsFromServer,
    sortField,
    sortReverce,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === FILTER_INFO ? '' : 'is-light'}`}
          onClick={() => {
            setSortField(FILTER_INFO);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField === FILTER_SUCCESS ? '' : 'is-light'}`}
          onClick={() => {
            setSortField(FILTER_SUCCESS);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${sortReverce === REVERSE_WARNING ? '' : 'is-light'}`}
          onClick={() => {
            if (sortReverce === '') {
              setSortReverce(REVERSE_WARNING);
            } else {
              setSortReverce('');
            }
          }}
        >
          Reverse
        </button>

        {(sortField !== '' || sortReverce !== '') && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setSortReverce('');
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visiableGoods.map(good => {
          return (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
