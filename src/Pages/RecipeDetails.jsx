import React, { useEffect, useState } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import imgcompt from '../images/shareIcon.svg';
import RecipeContent from '../components/RecipeData';
import RecipeCarousel from '../components/RecipeCarousel';
import { handleStartRecipe,
  handleFavoriteRecipe } from '../utils/RecipeDetailsFunctions';
import { copyLink } from '../utils/CopyLinkFunction';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import './recipeDetails.css';
import useFetch from '../hooks/useFetch';

function RecipeDetails() {
  const { fetchRecipes } = useFetch();
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();

  const [detailData, setDetailData] = useState({});
  const [recommendedData, setRecommendedData] = useState([]);
  const [recipeStatus, setRecipeStatus] = useState(false);
  const [linkCopy, setLinkCopy] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const recipeType = location.pathname.includes('/meals') ? 'meal' : 'drink';
  const nameURL = `/${location.pathname.split('/')[1]}`;

  useEffect(() => {
    (async () => {
      const tooglePathName = nameURL === '/meals' ? '/drinks' : '/meals';
      const [dataApi] = await fetchRecipes(nameURL, 'details', id);
      const recommendData = await fetchRecipes(tooglePathName);
      setDetailData(dataApi);
      setRecommendedData(recommendData);
    })();

    const progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (progressRecipes) {
      const { meals, drinks } = progressRecipes;
      if ((meals && meals[id]) || (drinks && drinks[id])) {
        setRecipeStatus(true);
      }
    }

    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const isRecipeFavorited = favoriteRecipes.some(
      (favoriteRecipe) => favoriteRecipe.id === id && favoriteRecipe.type === recipeType,
    );
    setIsFavorite(isRecipeFavorited);
  }, []);

  const handleFavorite = () => {
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);

    handleFavoriteRecipe(detailData, id, recipeType);
  };

  return (
    <div className="recipes">
      <RecipeContent recipe={ detailData } />

      <RecipeCarousel
        recommendations={ recommendedData }
        recipeQntRecomend={ 6 }
        recipeType={ recipeType }
      />

      <div className="btn-recipe">
        <button
          onClick={ () => handleStartRecipe(nameURL, id, history, detailData) }
          type="button"
          data-testid="start-recipe-btn"
        >
          {recipeStatus ? 'Continue Recipe' : 'Start Recipe'}
        </button>
        <button
          data-testid="share-btn"
          type="button"
          className="compartilhar"
          onClick={ () => {
            copyLink(window.location.href);
            setLinkCopy(true);
          } }
        >
          <img src={ imgcompt } alt="compartilhar" />
        </button>
        <button
          data-testid="favorite-btn"
          type="button"
          onClick={ () => handleFavorite() }
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }

        >
          {
            isFavorite ? (
              <img src={ blackHeartIcon } alt="Favorito" />
            ) : (
              <img src={ whiteHeartIcon } alt="Não favorito" />
            )
          }
        </button>
      </div>
      <div className="link-copy" data-testid="link">
        {linkCopy && <p>Link copied!</p>}
      </div>
    </div>
  );
}

export default RecipeDetails;
