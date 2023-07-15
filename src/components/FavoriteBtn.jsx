import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import { handleChangeFavorite } from '../utils/functions';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const NEGATIVE_ONE = -1;

export default function FavoriteBtn({ recipe }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { pathname } = useLocation();

  const NAME_URL = pathname.split('/')[1];
  const BASE_KEY = NAME_URL === 'meals' ? 'Meal' : 'Drink';
  const BASE_TYPE = NAME_URL.slice(0, NEGATIVE_ONE);

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const isRecipeFavorited = favoriteRecipes.some(
      ({ id, type }) => id === recipe[`id${BASE_KEY}`]
      && type === BASE_TYPE,
    );
    setIsFavorite(isRecipeFavorited);
  }, []);

  const handleClick = () => {
    handleChangeFavorite(recipe, BASE_TYPE, BASE_KEY, !isFavorite);
    setIsFavorite(!isFavorite);
  };

  return (
    <button
      data-testid="favorite-btn"
      type="button"
      onClick={ handleClick }
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
  );
}

FavoriteBtn.propTypes = {
  recipe: PropTypes.instanceOf(Object).isRequired,
};
