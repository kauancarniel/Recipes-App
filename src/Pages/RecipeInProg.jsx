import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import RecipesContext from '../context/RecipesContext';
import useFetch from '../hooks/useFetch';
import IngredientsList from '../components/IngredientsList';
import RecipeBtns from '../components/RecipeBtns';

const MAX_RECOMMENDATIONS = 6;

export default function RecipeInProg() {
  const { loading, error } = useContext(RecipesContext);
  const { id } = useParams();
  const { pathname } = useLocation();
  const [recipe, setRecipe] = useState([]);
  const [recommendRecipes, setRecommendRecipes] = useState([]);
  const [isInProgress, setIsInProgress] = useState(
    () => pathname.includes('in-progress'),
  );
  const { fetchRecipes } = useFetch();

  const NAME_URL = `/${pathname.split('/')[1]}`;
  const KEY_BASE = pathname === '/meals' ? 'Meal' : 'Drink';

  useEffect(() => {
    (async () => {
      const tooglePathName = NAME_URL === '/meals' ? '/drinks' : '/meals';
      const [recipeData] = await fetchRecipes(NAME_URL, 'details', id);
      const recommendData = await fetchRecipes(tooglePathName);
      setRecipe(recipeData);
      if (!isInProgress) {
        setRecommendRecipes(recommendData.slice(0, MAX_RECOMMENDATIONS));
      }
    })();
  }, []);

  const {
    strCategory,
    strAlcoholic,
    strInstructions,
    strYoutube,
  } = recipe;

  return (
    <main>
      { loading && <div>Loading...</div> }
      { error && <div>{ error }</div> }
      { (!loading && !error) && (
        <>
          <header
            data-testid="recipe-photo"
            style={ { backgroundImage: `url(${recipe[`str${KEY_BASE}Thumb`]})` } }
          >
            <h2 data-testid="recipe-title">{recipe[`str${NAME_URL}`]}</h2>
            <h3 data-testid="recipe-category">
              { NAME_URL === 'Meal' ? strCategory : strAlcoholic }
            </h3>
          </header>
          <div>
            <h4>Ingredients</h4>
            <ul style={ { paddingInlineStart: isInProgress ? '0px' : '40px' } }>
              <IngredientsList
                recipe={ recipe }
                isInProgress={ isInProgress }
              />
            </ul>
          </div>
          <RecipeBtns isInProgress={ isInProgress } setIsInProgress={ setIsInProgress } />
        </>
      )}
    </main>

  );
}
