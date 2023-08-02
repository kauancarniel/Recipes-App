import React, { useContext, useEffect } from 'react';

import RecipesContext from '../context/RecipesContext';
import IconFood from '../images/IconFood';
import IconDrinks from '../images/IconDrinks';
import IconBeef from '../images/IconBeef';

export default function Filter() {
  const { filter, setFilter } = useContext(RecipesContext);
  const buttonFilter = ['All', 'Meal', 'Drink'];

  useEffect(() => {
    setFilter('all');
  }, []);

  return (
    <nav className="flex justify-around pb-9">
      { buttonFilter.map((type) => {
        const lowerType = type.toLowerCase();
        const upperFilter = filter[0].toUpperCase() + filter.slice(1);
        const color = lowerType === type
          ? 'var(--green)' : 'var(--yellow)';
        return (
          <button
            key={ lowerType }
            data-testid={ `filter-by-${lowerType}-btn` }
            onClick={ () => setFilter(lowerType) }
            disabled={ filter === lowerType }
            className={
              `category-btn ${lowerType === filter
                ? 'text-[var(--green)]' : 'text-[var(--yellow)]'}
                `
            }
          >
            <div
              className={ `category border-[${color}]` }
            >
              {type === 'All'
              && <IconFood categorySelected={ upperFilter } strCategory={ type } />}
              {type === 'Meal'
              && <IconBeef categorySelected={ upperFilter } strCategory={ type } />}
              {type === 'Drink'
              && <IconDrinks categorySelected={ upperFilter } strCategory={ type } />}
            </div>
            {`${type}${type !== 'All' ? 's' : ''}`}
          </button>
        );
      })}
    </nav>
  );
}
