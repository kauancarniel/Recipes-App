import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { IoChevronBackCircleSharp, IoListCircleSharp } from 'react-icons/io5';
import ShareBtn from './ShareBtn';
import FavoriteBtn from './FavoriteBtn';
import RecipesContext from '../context/RecipesContext';
import useFetch from '../hooks/useFetch';
import IngredientsList from './IngredientsList';
import RecipeBtns from './RecipeBtns';
import RecommendRecipes from './RecommendRecipes';
import './Recipe.css';

const MAX_RECOMMENDATIONS = 6;

export default function RecipeInProg() {
  const { loading, error, linkCopy } = useContext(RecipesContext);
  const { id } = useParams();
  const { pathname } = useLocation();
  const history = useHistory();
  const [recipe, setRecipe] = useState({});
  const [recommendRecipes, setRecommendRecipes] = useState([]);
  const [visibleInstructions, setVisibleInstructions] = useState([]);
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

  return (
    <main>
      { loading && <p>Loading...</p> }
      { error && <p>{ error }</p> }
      { (!loading && !error) && (
        <>
          <header className="flex justify-center ">
            <ShareBtn
              type={ NAME_URL }
              id={ id }
              testId="share-btn"
            />
            <FavoriteBtn recipe={ recipe } testId="favorite-btn" />
            <div className="bg-black h-52 absolute w-[100%] z-0">
              <img
                className="w-[100%] h-52 opacity-40"
                src={ `${recipe[`str${KEY_BASE}Thumb`]}` }
                alt={ `${recipe[`str${KEY_BASE}`]}` }
                data-testid="recipe-photo"
              />
            </div>
            <div
              className="flex items-end p-6
             text-white absolute top-24 left-0 h-24 w-[100%] "
            >
              <h2
                data-testid="recipe-title"
                className="font-roboto text-2xl font-epilogue "
              >
                {recipe[`str${KEY_BASE}`]}

              </h2>
            </div>
            <div>
              <h3
                data-testid="recipe-category"
                className="
               absolute top-4 left-16
                text-white font-epilogue text-sm"
              >
                {' '}
                { KEY_BASE === 'Meal' ? recipe.strCategory : recipe.strAlcoholic }
              </h3>
            </div>
            <button
              onClick={ handleBack }
              className="absolute top-2
             left-2 text-[40px] opacity-80 text-black bg-inherit border-none"
            >
              {IoChevronBackCircleSharp()}
            </button>
          </header>
          <section className="mt-52 rounded-[1em] p-3 ">
            <div className=" border-solid border-2 rounded-lg p-3">
              <h4 className="text-2xl font-epilogue">Ingredients</h4>
              <ul className="grid grid-cols-2 gap-2 mt-4 mb-6 text-sm ">
                <IngredientsList
                  recipe={ recipe }
                  isInProgress={ isInProgress }
                />
              </ul>
              <div className="flex items-center border-2 border-t-black ">
                <button
                  className="text-[40px] opacity-80 text-black bg-inherit border-none"
                  onClick={ () => setVisibleInstructions(!visibleInstructions) }
                >
                  {IoListCircleSharp()}
                </button>
                <h4 className="text-xl p-2 font-epilogue">Instructions</h4>
              </div>
            </div>
            <div
              className={ `instructions mt-6 border-solid border-2
              border-b-white
               rounded-lg p-3 flex
                flex-col ${!visibleInstructions ? 'visible' : ''}` }
            >
              <p data-testid="instructions">
                {recipe.strInstructions}
              </p>
              {recipe.strYoutube && (
                <div data-testid="video" className="flex items-end rounded-xl mt-7 w-[100%] bg-black">
                  <iframe
                    className="video border-none rounded-xl w-[100%] opacity-60 "
                    src={ `https://www.youtube.com/embed/${recipe.strYoutube.split('=')[1]}` }
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
