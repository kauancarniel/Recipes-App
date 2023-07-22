import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { IoChevronBackCircleSharp, IoListCircleSharp } from 'react-icons/io5';
import { PiBowlFoodFill } from 'react-icons/pi';
import ShareBtn from './ShareBtn';
import FavoriteBtn from './FavoriteBtn';
import RecipesContext from '../context/RecipesContext';
import useFetch from '../hooks/useFetch';
import IngredientsList from './IngredientsList';
import RecipeBtns from './RecipeBtns';
import RecommendRecipes from './RecommendRecipes';
import './Recipe.css';
import FormCommentary from './FormCommentary';
import { RenderButtons } from './RenderButtons';

const MAX_RECOMMENDATIONS = 6;

export default function RecipeInProg() {
  const { loading, error, linkCopy } = useContext(RecipesContext);
  const history = useHistory();
  const { id } = useParams();
  const { pathname } = useLocation();
  const [recipe, setRecipe] = useState({});
  const [recommendRecipes, setRecommendRecipes] = useState([]);
  const [visibleIns, setVisibleIns] = useState(false);
  const [visibleIng, setVisibleIng] = useState(false);
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
  };

  return (
    <main>
      { loading && <p>Loading...</p> }
      { error && <p>{ error }</p> }
      { (!loading && !error) && (
        <>
          <header className="flex justify-center ">
            <div className="absolute z-10 top-[17rem] right-5">
              <ShareBtn
                type={ NAME_URL }
                id={ id }
                testId="share-btn"
              />
              <FavoriteBtn recipe={ recipe } testId="favorite-btn" />
            </div>
            <div className="bg-black absolute z-0 tam-img ">
              <img
                className="tam-img opacity-40"
                src={ `${recipe[`str${KEY_BASE}Thumb`]}` }
                alt={ `${recipe[`str${KEY_BASE}`]}` }
                data-testid="recipe-photo"
              />
            </div>
            <div>
              <h1 data-testid="recipe-title" className="title text-base">
                {recipe[`str${KEY_BASE}`]}
              </h1>
            </div>
            <div>
              <h3 data-testid="recipe-category" className="title-category">
                { KEY_BASE === 'Meal' ? recipe.strCategory : recipe.strAlcoholic }
              </h3>
            </div>
            <button
              onClick={ handleBack }
              className="button-back"
            >
              {IoChevronBackCircleSharp()}
            </button>
          </header>
          <section className="mt-52 rounded-[1em] p-3">
            <div className="border-grey mt-10 ">
              <RenderButtons
                isVisible={ visibleIng }
                setVisible={ setVisibleIng }
                icon={ PiBowlFoodFill }
                title="Ingredients"
              />
              {visibleIng && (
                <ul className={ `text-sm p-0 ${visibleIng ? 'animate-open' : 'h-0'}` }>
                  <IngredientsList recipe={ recipe } isInProgress={ isInProgress } />
                </ul>
              )}
            </div>
            <div className="mt-6 border-grey flex flex-col ">
              <div>
                <RenderButtons
                  isVisible={ visibleIns }
                  setVisible={ setVisibleIns }
                  icon={ IoListCircleSharp }
                  title="Instructions"
                />
              </div>
              {visibleIns && (
                <div className={ visibleIns ? 'animate-open' : 'h-0' }>
                  <p data-testid="instructions">{recipe.strInstructions}</p>
                  {recipe.strYoutube && (
                    <div
                      data-testid="video"
                      className="flex items-end rounded-xl mt-7 w-[100%] bg-black"
                    >
                      <iframe
                        className="border-none rounded-xl w-[100%] opacity-60 "
                        src={ `https://www.youtube.com/embed/${recipe.strYoutube.split('=')[1]}` }
                        title="Recipe Video"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
          { !isInProgress && (
            <RecommendRecipes recommendRecipes={ recommendRecipes } />
          )}
          <FormCommentary />
          <div className="mt-28">
            <RecipeBtns
              recipe={ recipe }
              isInProgress={ isInProgress }
              setIsInProgress={ setIsInProgress }
            />
          </div>
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
