import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { IoChevronBackCircleSharp } from 'react-icons/io5';

import RecipesContext from '../context/RecipesContext';
import useFetch from '../hooks/useFetch';
import useUser from '../hooks/useUser';
import ShareBtn from '../components/ShareBtn';
import FavoriteBtn from '../components/FavoriteBtn';
import RecipeBtns from '../components/RecipeBtns';
import RecommendRecipes from '../components/RecommendRecipes';
import './Recipe.css';
import RenderButtons from '../components/RenderButtons';
import FormCommentary from '../components/FormCommentary';
import MenuHamburguer from '../components/MenuHamburguer';
import Menu from '../components/Menu';

const MAX_RECOMMENDATIONS = 14;
const INIT = 7;

export default function Recipe() {
  const { loading, error, menuOpen } = useContext(RecipesContext);
  const { validateCookie } = useUser();
  const history = useHistory();
  const { id } = useParams();
  const { pathname } = useLocation();
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
      const isLogged = await validateCookie();
      if (!isLogged) return;
      const [recipeData] = await fetchRecipes(NAME_URL, 'details', id);
      setRecipe(recipeData);
      if (!isInProgress) {
        const tooglePathName = NAME_URL === '/meals' ? '/drinks' : '/meals';
        const recommendData = await fetchRecipes(tooglePathName);
        setRecommendRecipes(recommendData.slice(INIT, MAX_RECOMMENDATIONS));
      }
    })();
  }, []);

  return (
    <>
      <main className="min-h-screen recipe-box bg-form glass p-0 mb-16 rounded-b-lg">
        { loading && (
          <div className="w-full h-[80vh] flex-center">
            <h2 className="text-[var(--yellow)]">Loading...</h2>
          </div>
        )}
        { error && <p>{ error }</p> }
        { (!loading && !error) && (
          <>
            <div>
              <div className="burguer-container">
                <MenuHamburguer />
              </div>
              {menuOpen && (<Menu showClose />)}
            </div>
            <header className="flex justify-center ">
              <div className="tam-img relative">
                <img
                  className="tam-img"
                  src={ recipe[`str${KEY_BASE}Thumb`] }
                  alt={ recipe[`str${KEY_BASE}`] }
                  data-testid="recipe-photo"
                />
                <h1
                  data-testid="recipe-title"
                  className="title-recipe shadow-name"
                >
                  {recipe[`str${KEY_BASE}`]}
                </h1>
              </div>
              <div className="absolute top-3 left-3 flex items-center gap-x-2">
                <button
                  onClick={ () => {
                    history.goBack();
                    setIsInProgress(!isInProgress);
                  } }
                  className="button-back shadow-name"
                >
                  <IoChevronBackCircleSharp />
                </button>
                <h3 data-testid="recipe-category" className="title-category shadow-name">
                  {KEY_BASE === 'Meal' ? recipe.strCategory : recipe.strAlcoholic}
                </h3>
              </div>
            </header>
            <section className="p-3">
              <div className="relative border-grey mt-10 ">
                <div className="flex gap-x-2 absolute z-10 top-3 right-3">
                  <ShareBtn
                    type={ NAME_URL }
                    id={ id }
                    testId="share-btn"
                  />
                  <FavoriteBtn recipe={ recipe } />
                </div>
                <RenderButtons
                  title="Ingredients"
                  recipe={ recipe }
                  isInProgress={ isInProgress }
                />
              </div>
              <div className="mt-6 border-grey flex flex-col mb-10 ">
                <RenderButtons
                  title="Instructions"
                  recipe={ recipe }
                  isInProgress={ isInProgress }
                />
              </div>
              {recipe.strYoutube && (
                <div
                  data-testid="video"
                  className="flex justify-center rounded-xl w-full "
                >
                  <iframe
                    className="iframe-youtube"
                    src={ `https://www.youtube.com/embed/${recipe.strYoutube.split('=')[1]}` }
                    title="Recipe Video"
                  />
                </div>
              )}
            </section>
            <section className="md:p-[1rem]">
              {!isInProgress && (
                <RecommendRecipes recommendRecipes={ recommendRecipes } />
              )}
              <div>
                <FormCommentary />
              </div>
            </section>
          </>
        )}
      </main>
      <RecipeBtns
        recipe={ recipe }
        isInProgress={ isInProgress }
        setIsInProgress={ setIsInProgress }
      />
    </>

  );
}
