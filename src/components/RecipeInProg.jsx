import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import ShareBtn from './ShareBtn';
import FavoriteBtn from './FavoriteBtn';
import RecipesContext from '../context/RecipesContext';
import useFetch from '../hooks/useFetch';
import IngredientsList from './IngredientsList';
import RecipeBtns from './RecipeBtns';
import RecommendRecipes from './RecommendRecipes';
import './RecipeInProg.css';

const MAX_RECOMMENDATIONS = 6;

export default function RecipeInProg() {
  const { loading, error } = useContext(RecipesContext);
  const { id } = useParams();
  const { pathname } = useLocation();
  const { linkCopy } = useContext(RecipesContext);
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

  // const style = {
  //   backgroundImage: `url(${recipe[`str${KEY_BASE}Thumb`]})`,
  //   backgroundSize: 'cover',
  //   backgroundPosition: 'center',
  //   height: '30vh',
  //   width: '100%',
  // };

  return (
    <main>
      { loading && <div>Loading...</div> }
      { error && <div>{ error }</div> }
      { (!loading && !error) && (
        <>
          <header>
            <ShareBtn />
            <FavoriteBtn />
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
          <RecipeBtns isInProgress={ isInProgress } setIsInProgress={ setIsInProgress } />
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
