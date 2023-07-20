import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import { changeFavorite, verifyFavorite } from '../utils/functions';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const NEGATIVE_ONE = -1;

export default function FavoriteBtn({ recipe, testId, setFavorites = null }) {
  const { pathname } = useLocation();
  const [isFavorite, setIsFavorite] = useState(() => false);

  const NAME_URL = pathname.split('/')[1];
  const BASE_KEY = NAME_URL === 'meals' ? 'Meal' : 'Drink';

  const formatRecipe = NAME_URL === 'favorite-recipes'
    ? recipe
    : {
      id: recipe[`id${BASE_KEY}`],
      type: NAME_URL.slice(0, NEGATIVE_ONE),
      nationality: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe[`str${BASE_KEY}`],
      image: recipe[`str${BASE_KEY}Thumb`],
    };

  useEffect(() => {
    setIsFavorite(verifyFavorite(formatRecipe.id, formatRecipe.type));
  }, []);

  const handleClick = () => {
    const newFavorites = changeFavorite(
      formatRecipe,
      formatRecipe.type,
      !isFavorite,
    );
    setIsFavorite(!isFavorite);
    if (setFavorites) setFavorites(newFavorites);
  };

  return (
    <button
      data-testid={ testId }
      type="button"
      onClick={ handleClick }
      className="absolute top-[14.5em] right-12 z-10 bg-inherit border-none"
      src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
    >
      {
        isFavorite ? (
          <img src={ blackHeartIcon } className="w-6" alt="Favorito" />
        ) : (
          <img src={ whiteHeartIcon } alt="Não favorito" />
        )
      }
    </button>
  );
}

FavoriteBtn.propTypes = {
  recipe: PropTypes.instanceOf(Object).isRequired,
  testId: PropTypes.string.isRequired,
  setFavorites: PropTypes.func,
};
