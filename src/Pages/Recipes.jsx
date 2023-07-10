import React, { useContext, useEffect } from 'react';

import RecipesContext from '../context/RecipesContext';
import recipesFetch from '../services/recipesFetch';

function Recipes({ history }) {
  console.log(history);
  const { recipes, setRecipes } = useContext(RecipesContext);

  useEffect(() => {
    (async () => {
      const data = await recipesFetch('meals');
      setRecipes(data);
    })();
  }, []);

  return (
    <div>recipes</div>
  );
}

export default Recipes;
