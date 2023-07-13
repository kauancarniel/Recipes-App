import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function RecipeBtns({ isInProgress, setIsInProgress }) {
  const history = useHistory();
  const { pathname } = useLocation();

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

  return isInProgress ? (
    <button
      data-testid="finish-recipe-btn"
      onClick={ finishRecipe }
      // disabled={ !verifyChecked }
      // style={ {
      //   position: 'fixed',
      //   bottom: '0px',
      //   width: '100%',
      // } }
    >
      Finalizar Receita
    </button>
  ) : (
    <button
      onClick={ startRecipe }
      type="button"
      data-testid="start-recipe-btn"
    >
      Start Recipe
    </button>
  );
}

RecipeBtns.propTypes = {
  isInProgress: PropTypes.bool.isRequired,
  setIsInProgress: PropTypes.func.isRequired,
};
