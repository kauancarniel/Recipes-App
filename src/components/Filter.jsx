import React, { useContext } from 'react';

import RecipesContext from '../context/RecipesContext';

export default function Filter() {
  const { filter, setFilter } = useContext(RecipesContext);
  const buttonFilter = ['All', 'Meal', 'Drink'];

  return (
    <nav>
      { buttonFilter.map((type) => {
        const lowerType = type.toLowerCase();
        return (
          <button
            key={ lowerType }
            data-testid={ `filter-by-${lowerType}-btn` }
            onClick={ () => setFilter(lowerType) }
            disabled={ filter === lowerType }
          >
            {`${type}${type !== 'All' ? 's' : ''}`}
          </button>
        );
      })}
    </nav>
  );
}
