import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import RecipesContext from '../context/RecipesContext';
import useUser from '../hooks/useUser';

export default function RecipeBtns({ recipe, isInProgress, setIsInProgress }) {
  const { userLogged } = useContext(RecipesContext);
  const { handleRemoveInProgress, addInDoneRecipes } = useUser();
  const [isRecipeInProgress, setIsRecipeInProgress] = useState('loading');
  const history = useHistory();
  const { id } = useParams();
  const { pathname } = useLocation();

  const NAME_URL = pathname.split('/')[1];
  const { inProgress } = userLogged || { inProgress: {} };

  useEffect(() => {
    if (inProgress[NAME_URL]) {
      const textBtn = inProgress[NAME_URL][id] ? 'Continue Recipe' : 'Start Recipe';
      setIsRecipeInProgress(textBtn);
    } else {
      setIsRecipeInProgress('Start Recipe');
    }
  }, [userLogged, isInProgress]);

  const startRecipe = () => {
    setIsInProgress(!isInProgress);
    history.push(`${pathname}/in-progress`);
  };

  const finishRecipe = async () => {
    setIsInProgress(!isInProgress);
    handleRemoveInProgress(id, NAME_URL, recipe);
    await addInDoneRecipes(recipe, NAME_URL);
    history.push('/done-recipes');
  };


  return (
    <div className="btn-container py-2">
      {isInProgress ? (
        <button
          className="btn-recipe btns"
          data-testid="finish-recipe-btn"
          onClick={ finishRecipe }
          disabled={
            !(inProgress[NAME_URL]
            && inProgress[NAME_URL][id]
            && Object.values(inProgress[NAME_URL][id].usedIngredients)
              .every((value) => value))
          }
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
          {isRecipeInProgress}
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
