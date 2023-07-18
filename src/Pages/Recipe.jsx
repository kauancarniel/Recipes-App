import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import ShareBtn from '../components/ShareBtn';
import FavoriteBtn from '../components/FavoriteBtn';
import RecipesContext from '../context/RecipesContext';
import useFetch from '../hooks/useFetch';
import IngredientsList from '../components/IngredientsList';
import RecipeBtns from '../components/RecipeBtns';
import RecommendRecipes from '../components/RecommendRecipes';
import './Recipe.css';

const MAX_RECOMMENDATIONS = 6;

export default function RecipeInProg() {
  const { loading, error, linkCopy } = useContext(RecipesContext);
  const { id } = useParams();
  const { pathname } = useLocation();
  const history = useHistory();
  const [recipe, setRecipe] = useState({});
  const [recommendRecipes, setRecommendRecipes] = useState([]);
  const [isInProgress, setIsInProgress] = useState(
    () => pathname.includes('in-progress'),
  );
  const { fetchRecipes } = useFetch();

  const NAME_URL = `/${pathname.split('/')[1]}`;
  const KEY_BASE = pathname.split('/')[1] === 'meals' ? 'Meal' : 'Drink';

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

  const handleBack = () => {
    history.goBack();
    setIsInProgress(!isInProgress);
  };

  const {
    strCategory,
    strAlcoholic,
    strInstructions,
    strYoutube,
  } = recipe;

  return (
    <main>
      { loading && <p>Loading...</p> }
      { error && <p>{ error }</p> }
      { (!loading && !error) && (
        <>
          <header>
            <ShareBtn
              type={ NAME_URL }
              id={ id }
              testId="share-btn"
            />
            <FavoriteBtn recipe={ recipe } testId="favorite-btn" />
            <img
              className="img-recipe"
              src={ `${recipe[`str${KEY_BASE}Thumb`]}` }
              alt={ `${recipe[`str${KEY_BASE}`]}` }
              data-testid="recipe-photo"
            />
            <h2 data-testid="recipe-title">{recipe[`str${KEY_BASE}`]}</h2>
            <h3 data-testid="recipe-category">
              { KEY_BASE === 'Meal' ? strCategory : strAlcoholic }
            </h3>
            <button onClick={ handleBack }>
              Voltar
            </button>
          </header>
          <section>
            <div>
              <h4>Ingredients</h4>
              <ul style={ { paddingInlineStart: isInProgress ? '0px' : '40px' } }>
                <IngredientsList
                  recipe={ recipe }
                  isInProgress={ isInProgress }
                />
              </ul>
            </div>
            <div>
              <h4>Instructions</h4>
              <p className="instructions" data-testid="instructions">
                {strInstructions}
              </p>
              {strYoutube && (
                <div data-testid="video">
                  <h4>Video</h4>
                  <iframe
                    className="video"
                    src={ `https://www.youtube.com/embed/${strYoutube.split('=')[1]}` }
                    title="Recipe Video"
                  />
                </div>
              )}
            </div>
          </section>
          { !isInProgress && (
            <RecommendRecipes recommendRecipes={ recommendRecipes } />
          )}
          <RecipeBtns
            recipe={ recipe }
            isInProgress={ isInProgress }
            setIsInProgress={ setIsInProgress }
          />
        </>
      )}
      {linkCopy && (
        <div className="link-copied" data-testid="link">
          <p className="message">Link copied!</p>
        </div>
      )}
    </main>

  );
}
