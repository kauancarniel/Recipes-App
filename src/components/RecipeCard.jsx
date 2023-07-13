import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import RecipesContext from '../context/RecipesContext';

export default function RecipeCard() {
  const history = useHistory();
  const { recipes } = useContext(RecipesContext);
  const { pathname } = history.location;

  const KEY_BASE = pathname === '/meals' ? 'Meal' : 'Drink';

  return recipes.map((item, index) => (
    <button
      key={ index }
      type="button"
      data-testid={ `${index}-recipe-card` }
      onClick={ () => history.push(`${pathname}/${item[`id${KEY_BASE}`]}`) }
    >
      <img
        src={ item[`str${KEY_BASE}Thumb`] }
        alt={ item[`str${KEY_BASE}`] }
        data-testid={ `${index}-card-img` }
      />
      <h2 data-testid={ `${index}-card-name` }>{ item[`str${KEY_BASE}`]}</h2>
    </button>
  ));
}
