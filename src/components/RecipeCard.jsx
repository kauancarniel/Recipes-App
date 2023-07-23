import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import RecipesContext from '../context/RecipesContext';
import './RecipeCard.css';

export default function RecipeCard() {
  const { location: { pathname } } = useHistory();
  const { recipes } = useContext(RecipesContext);

  const KEY_BASE = pathname === '/meals' ? 'Meal' : 'Drink';

  return recipes.map((item, index) => (
    <Link
      key={ index }
      className="relative card"
      type="button"
      data-testid={ `${index}-recipe-card` }
      to={ `${pathname}/${item[`id${KEY_BASE}`]}` }
    >
      <img
        className="rounded-md w-full"
        src={ item[`str${KEY_BASE}Thumb`] }
        alt={ item[`str${KEY_BASE}`] }
        data-testid={ `${index}-card-img` }
      />
      <h2
        className="recipe-name shadow-name"
        data-testid={ `${index}-card-name` }
      >
        { item[`str${KEY_BASE}`]}
      </h2>
    </Link>
  ));
}
