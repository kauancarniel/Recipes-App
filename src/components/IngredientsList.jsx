import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useParams } from 'react-router-dom';

import RecipesContext from '../context/RecipesContext';
import useUser from '../hooks/useUser';
import { initialIngredients } from '../utils/functions';
import './IngredientsList.css';

export default function IngredientsList({ recipe, isInProgress }) {
  const { userLogged } = useContext(RecipesContext);
  const { saveProgress, setUserProgress } = useUser();
  const { pathname } = useLocation();
  const { id } = useParams();
  const NAME_URL = pathname.split('/')[1];
  const ingredients = Object.entries(recipe)
    .filter(([key, value]) => (key.includes('strIngredient') && value));
  const { inProgress } = userLogged || { inProgress: {} };

  useEffect(() => {
    let usedIngredients = {};
    if (userLogged) {
      if (inProgress[NAME_URL] && inProgress[NAME_URL][id]) {
        usedIngredients = inProgress[NAME_URL][id];
      } else {
        usedIngredients = initialIngredients(ingredients);
      }
      setUserProgress(NAME_URL, id, usedIngredients);
    }
  }, []);

  const handleChange = async (key, value) => {
    const checkboxes = userLogged.inProgress[NAME_URL][id];
    const newCheckboxes = {
      ...checkboxes,
      [key]: checkboxes[key] === '' ? value : '',
    };
    await saveProgress(id, NAME_URL, newCheckboxes);
  };

  return ingredients.map(([key, value], index) => (
    <span key={ `${key}-input` } className="checklist">
      <input
        key={ `${key}-input` }
        className={ isInProgress ? 'enabled' : 'disabled' }
        type="checkbox"
        id={ key }
        name="ingredient"
        checked={ !!inProgress[NAME_URL][id][key] }
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
