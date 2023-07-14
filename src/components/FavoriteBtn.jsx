import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavoriteBtn() {
  const [isFavorite, setIsFavorite] = useState(false);
  const { id } = useParams();
  const { pathname } = useLocation();

  const NAME_URL = pathname.split('/')[1];

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const isRecipeFavorited = favoriteRecipes.some(
      ({ id: favId, type }) => favId === id && type === NAME_URL,
    );
    setIsFavorite(isRecipeFavorited);
  }, []);

  return (
    <button
      data-testid="favorite-btn"
      type="button"
      onClick={ () => setIsFavorite((prevIsFavorite) => !prevIsFavorite) }
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
