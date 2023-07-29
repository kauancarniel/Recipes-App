import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

import RecipesContext from '../context/RecipesContext';
import useUser from '../hooks/useUser';
import { initialIngredients } from '../utils/functions';
import './IngredientsList.css';

export default function IngredientsList({ recipe, isInProgress }) {
  const { checkboxes, setCheckboxes, userLogged } = useContext(RecipesContext);
  const { saveProgress } = useUser();
  const { pathname } = useLocation();
  const NAME_URL = pathname.split('/')[1];
  const KEY_BASE = NAME_URL === 'meals' ? 'Meal' : 'Drink';
  const ingredients = Object.entries(recipe)
    .filter(([key, value]) => (key.includes('strIngredient') && value));

  useEffect(() => {
    let usedIngredients = [];
    if (userLogged) {
      const { inProgress } = userLogged;
      const id = recipe[`id${KEY_BASE}`];
      if (inProgress[NAME_URL] && inProgress[NAME_URL][id]) {
        usedIngredients = inProgress[NAME_URL][id];
      }
    }
    setCheckboxes(initialIngredients(ingredients, usedIngredients));
  }, []);

  const handleChange = async (key, value) => {
    const newCheckboxes = {
      ...checkboxes,
      [key]: checkboxes[key] === '' ? value : '',
    };
    await saveProgress(recipe[`id${KEY_BASE}`], NAME_URL, newCheckboxes);
    setCheckboxes(newCheckboxes);
  };

  return ingredients.map(([key, value], index) => (
    <span key={ `${key}-input` } className="checklist">
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
    </span>
  ));
}

IngredientsList.propTypes = {
  recipe: PropTypes.instanceOf(Object).isRequired,
  isInProgress: PropTypes.bool.isRequired,
};
