import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { handleSaveProgress, getStorage, initialIngredients } from '../utils/functions';
import RecipesContext from '../context/RecipesContext';
import './IngredientsList.css';

export default function IngredientsList({ recipe, isInProgress, visible }) {
  const { checkboxes, setCheckboxes } = useContext(RecipesContext);
  const { pathname } = useLocation();
  const NAME_URL = pathname.split('/')[1];
  const KEY_BASE = NAME_URL === 'meals' ? 'Meal' : 'Drink';
  const ingredients = Object.entries(recipe)
    .filter(([key, value]) => (key.includes('strIngredient') && value));

  useEffect(() => {
    const recipesProgress = getStorage('inProgressRecipes');
    const id = recipe[`id${KEY_BASE}`];
    let usedIngredients = [];
    if (recipesProgress && recipesProgress[NAME_URL] && recipesProgress[NAME_URL][id]) {
      usedIngredients = recipesProgress[NAME_URL][id];
    }
    setCheckboxes(initialIngredients(ingredients, usedIngredients));
  }, []);

  const handleChange = (key, value) => {
    const newCheckboxes = {
      ...checkboxes,
      [key]: checkboxes[key] === '' ? value : '',
    };
    setCheckboxes(newCheckboxes);
    handleSaveProgress(recipe[`id${KEY_BASE}`], NAME_URL, newCheckboxes);
  };

  return (
    <div
      id="checklist"
      className={ visible ? 'animate-open' : 'h-0' }
    >
      { ingredients.map(([key, value], index) => (
        <>
          <input
            key={ `${key}-input` }
            className={ isInProgress ? 'enabled' : 'disabled' }
            type="checkbox"
            id={ key }
            name="ingredient"
            checked={ !!checkboxes[key] }
            onChange={ () => handleChange(key, value) }
            disabled={ !isInProgress }
          />
          <label
            key={ `${key}-label` }
            className={ isInProgress ? 'enabled' : 'disabled' }
            data-testid={ `${index}-ingredient-step` }
            htmlFor={ key }
          >
            {`${value} - ${recipe[`strMeasure${index + 1}`]}`}
          </label>
        </>
      ))}
    </div>
  );
}

IngredientsList.propTypes = {
  recipe: PropTypes.instanceOf(Object).isRequired,
  visible: PropTypes.bool.isRequired,
  isInProgress: PropTypes.bool.isRequired,
};
