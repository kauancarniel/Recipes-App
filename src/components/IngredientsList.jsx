import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function IngredientsList({ recipe, isInProgress }) {
  const recipeARR = Object.entries(recipe);
  const ingredients = recipeARR
    .filter(([key, value]) => (key.includes('strIngredient') && value));

  const [checkboxes, setCheckboxes] = useState(() => (ingredients
    .reduce((obj, ingredient) => ({
      ...obj,
      [ingredient[0]]: false,
    }), {})));

  const handleChange = (key) => {
    setCheckboxes({
      ...checkboxes,
      [key]: !checkboxes[key],
    });
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
            style={ { textDecoration: checkboxes[key] ? 'line-through' : 'none' } }
            data-testid={ `${index}-ingredient-step` }
            htmlFor={ key }
          >
            <input
              type="checkbox"
              id={ key }
              name={ key }
              checked={ checkboxes[key] }
              onChange={ () => handleChange(key) }
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
