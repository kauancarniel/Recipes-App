import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import RecipesContext from '../context/RecipesContext';
import { addInDoneRecipes, getStorage, handleRemoveInProgress } from '../utils/functions';
import useFetch from '../hooks/useFetch';

export default function RecipeBtns({ recipe, isInProgress, setIsInProgress }) {
  const { checkboxes } = useContext(RecipesContext);
  const [isRecipeInProgress, setIsRecipeInProgress] = useState(false);
  const history = useHistory();
  const { id } = useParams();
  const { pathname } = useLocation();
  const { addPoints } = useFetch();

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

  const finishRecipe = async () => {
    const pointsM = 5;
    const pointsD = 2;
    setIsInProgress(!isInProgress);
    handleRemoveInProgress(id, NAME_URL);
    addInDoneRecipes(recipe, NAME_URL);
    const promisePoints = NAME_URL === 'meals' ? addPoints(pointsM)
      : addPoints(pointsD);
    await promisePoints;

    history.push('/done-recipes');
  };

  const arrayCheckbox = Object.values(checkboxes);

  return (
    <div className="btn-container py-2">
      {isInProgress ? (
        <button
          className="btn-recipe btns"
          data-testid="finish-recipe-btn"
          onClick={ finishRecipe }
          disabled={ arrayCheckbox.length === 0 ? true
            : arrayCheckbox.some((value) => value === '') }
        >
          Finalizar Receita
        </button>
      ) : (
        <button
          className="btn-recipe btns"
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
