import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useLocation } from 'react-router-dom';
import { handleSaveProgress, getStorage } from '../utils/functions';
import RecipesContext from '../context/RecipesContext';

export default function IngredientsList({ recipe, isInProgress }) {
  const { checkboxes, setCheckboxes } = useContext(RecipesContext);
  const { pathname } = useLocation();
  const NAME_URL = pathname.split('/')[1];
  const KEY_BASE = NAME_URL === 'meals' ? 'Meal' : 'Drink';
  const recipeARR = Object.entries(recipe);
  const ingredients = recipeARR
    .filter(([key, value]) => (key.includes('strIngredient') && value));

  useEffect(() => {
    const recipesProgress = getStorage('inProgressRecipes');
    const id = recipe[`id${KEY_BASE}`];
    let usedIngredients = [];
    if (recipesProgress && recipesProgress[NAME_URL] && recipesProgress[NAME_URL][id]) {
      usedIngredients = recipesProgress[NAME_URL][id];
    }
    setCheckboxes(ingredients
      .reduce((obj, ingredient) => ({
        ...obj,
        [ingredient[1]]: usedIngredients.includes(ingredient[1]),
      }), {}));
  }, []);

  const handleChange = (value) => {
    const newCheckboxes = {
      ...checkboxes,
      [value]: !checkboxes[value],
    };
    setCheckboxes(newCheckboxes);
    handleSaveProgress(recipe[`id${KEY_BASE}`], NAME_URL, newCheckboxes);
  };

  return ingredients.map(([key, value], index) => (
    <li
      style={ { listStyle: isInProgress ? 'none' : 'initial' } }
      key={ key }
      data-testid={ `${index}-ingredient-name-and-measure` }
    >
      {
        isInProgress ? (
          <label
            style={ { textDecoration: checkboxes[value] ? 'line-through' : 'none' } }
            data-testid={ `${index}-ingredient-step` }
            htmlFor={ value }
          >
            <input
              type="checkbox"
              id={ value }
              name={ value }
              checked={ checkboxes[value] }
              onChange={ () => handleChange(value) }
            />
            {`${value} - ${recipe[`strMeasure${index + 1}`]}`}
          </label>
        ) : (
          `${value} - ${recipe[`strMeasure${index + 1}`]}`
        )
      }
    </li>
  ));
}

IngredientsList.propTypes = {
  recipe: PropTypes.instanceOf(Object).isRequired,
};
