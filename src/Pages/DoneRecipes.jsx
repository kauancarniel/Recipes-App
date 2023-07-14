import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';

import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import { redirectToRecipe } from '../utils/NavigateFunction';

function DoneRecipes() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const [filter, setFilter] = useState('all');
  const [linkCopy, setLinkCopy] = useState(false);
  const URLBASE = window.location.origin;
  const history = useHistory();

  const handleFilterChange = (newFilter) => setFilter(newFilter);

  const filteredRecipes = filter === 'all'
    ? doneRecipes
    : doneRecipes.filter((recipe) => recipe.type === filter);

  const buttonFilter = ['all', 'meal', 'drink'];

  return (
    <div>
      <Header title="Done Recipes" iconeProfile />
      {filteredRecipes.length === 0 && <p>Nenhuma receita favorita encontrada.</p>}
      <div>
        { filteredRecipes.length > 0 && buttonFilter.map((type) => (
          <button
            key={ type }
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
          <button onClick={ () => redirectToRecipe(recipe, history) }>
            <img
              src={ recipe.image }
              alt="Recipe"
              data-testid={ `${index}-horizontal-image` }
            />
          </button>
          <p data-testid={ `${index}-horizontal-top-text` }>
            {recipe.nationality}
            {' '}
            -
            {' '}
            {recipe.category}

          </p>
          <button onClick={ () => redirectToRecipe(recipe, history) }>
            <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
          </button>
          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.date}</p>
          <p data-testid={ `${index}-horizontal-top-text` }>{recipe.alcoholicOrNot}</p>
          <button
            onClick={ () => {
              copy(`${URLBASE}/${recipe.type}s/${recipe.id}`);
              setLinkCopy(true);
            } }
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
          >
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
      <div data-testid="link">
        {linkCopy && <p>Link copied!</p>}
      </div>
    </div>
  );
}

export default DoneRecipes;
