import React, { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';

function FavoriteRecipes() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const [filter, setFilter] = useState('all');

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    console.log(newFilter);
  };

  const filteredRecipes = filter === 'all'
    ? doneRecipes
    : doneRecipes.filter((recipe) => recipe.type === filter);
  const buttonFilter = ['all', 'meal', 'drink'];

  return (
    <div>
      {filteredRecipes.length === 0 && <p>Nenhuma receita favorita encontrada.</p>}
      <div>
        { filteredRecipes.length > 1 && buttonFilter.map((type) => (
          <button
            key={ type.id }
            data-testid={ `filter-by-${type}-btn` }
            onClick={ () => handleFilterChange(type) }
            disabled={ filter === type }
          >
            {type}
          </button>
        ))}
      </div>

      {filteredRecipes.map((recipe, index) => (
        <div key={ index }>
          <img
            src={ recipe.image }
            alt="Recipe"
            data-testid={ `${index}-horizontal-image` }
          />
          <p data-testid={ `${index}-horizontal-top-text` }>
            {recipe.nationality}
            {' '}
            -
            {' '}
            {recipe.category}

          </p>
          <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.date}</p>
          <p data-testid={ `${index}-horizontal-top-text` }>{recipe.alcoholicOrNot}</p>
          <button data-testid={ `${index}-horizontal-share-btn` } src={ shareIcon }>
            <img src={ shareIcon } alt="compartilhar" />
          </button>
          <p data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</p>
          {recipe.tags.map((tag, indexTag) => (
            <span
              key={ indexTag }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              {tag}
              -
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default FavoriteRecipes;
