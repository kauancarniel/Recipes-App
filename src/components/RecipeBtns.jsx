import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import './RecipeBtns.css';

export default function RecipeBtns({ isInProgress, setIsInProgress }) {
  const [isRecipeInProgress, setIsRecipeInProgress] = useState(false);
  const history = useHistory();
  const { id } = useParams();
  const { pathname } = useLocation();

  const NAME_URL = pathname.split('/')[1];

  useEffect(() => {
    const recipesProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (recipesProgress && recipesProgress[NAME_URL]) {
      setIsRecipeInProgress(!!recipesProgress[NAME_URL][id]);
    }
  }, []);

  const startRecipe = () => {
    setIsInProgress(!isInProgress);
    history.push(isInProgress
      ? '/done-recipes'
      : `${pathname}/in-progress`);
  };

  const finishRecipe = () => {
    setIsInProgress(!isInProgress);
    history.push('/done-recipes');
  };

  return (
    <div className="btn-container">
      {isInProgress ? (
        <button
          className="btn"
          data-testid="finish-recipe-btn"
          onClick={ finishRecipe }
          // disabled={ !verifyChecked }
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
};
