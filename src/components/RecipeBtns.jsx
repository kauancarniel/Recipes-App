import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import RecipesContext from '../context/RecipesContext';
import './RecipeBtns.css';
import { addInDoneRecipes, getStorage, handleRemoveInProgress } from '../utils/functions';

export default function RecipeBtns({ recipe, isInProgress, setIsInProgress }) {
  const { checkboxes } = useContext(RecipesContext);
  const [isRecipeInProgress, setIsRecipeInProgress] = useState(false);
  const history = useHistory();
  const { id } = useParams();
  const { pathname } = useLocation();

  const NAME_URL = pathname.split('/')[1];

  useEffect(() => {
    const recipesProgress = getStorage('inProgressRecipes');
    if (recipesProgress && recipesProgress[NAME_URL]) {
      setIsRecipeInProgress(!!recipesProgress[NAME_URL][id]);
    }
  }, []);

  const startRecipe = () => {
    setIsInProgress(!isInProgress);
    history.push(`${pathname}/in-progress`);
  };

  const finishRecipe = () => {
    setIsInProgress(!isInProgress);
    handleRemoveInProgress(id, NAME_URL);
    addInDoneRecipes(recipe, NAME_URL);
    history.push('/done-recipes');
  };

  return (
    <div className="btn-container">
      {isInProgress ? (
        <button
          className="btn"
          data-testid="finish-recipe-btn"
          onClick={ finishRecipe }
          disabled={ !Object.values(checkboxes).every((value) => value !== '') }
        >
          Finalizar Receita
        </button>
      ) : (
        <button
          className="btn"
          onClick={ startRecipe }
          type="button"
          data-testid="start-recipe-btn"
        >
          { isRecipeInProgress ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      )}
    </div>
  );
}

RecipeBtns.propTypes = {
  isInProgress: PropTypes.bool.isRequired,
  setIsInProgress: PropTypes.func.isRequired,
  recipe: PropTypes.instanceOf(Object).isRequired,
};
