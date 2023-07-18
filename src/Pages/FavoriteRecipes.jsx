import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import { getStorage } from '../utils/functions';
import Filter from '../components/Filter';
import RecipesContext from '../context/RecipesContext';
import ShareBtn from '../components/ShareBtn';
import FavoriteBtn from '../components/FavoriteBtn';
import './DoneRecipes.css';

function FavoriteRecipes() {
  const { filter, linkCopy } = useContext(RecipesContext);
  const [favorites, setFavorites] = useState(() => getStorage('favoriteRecipes') || []);

  const filteredFavorites = filter === 'all'
    ? favorites
    : favorites.filter(({ type }) => type === filter);

  return (
    <>
      <Header title="Favorite Recipes" iconeProfile />
      <Filter />
      <main>
        {!favorites.length ? (
          <p>Sem favoritos</p>
        ) : filteredFavorites.map((recipe, index) => (
          <div key={ `${recipe.id}${recipe.type}` }>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                style={ { width: '100px' } }
                src={ recipe.image }
                alt={ `foto ${recipe.name}` }
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
            <div>
              <div>
                <Link to={ `/${recipe.type}s/${recipe.id}` }>
                  <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
                </Link>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  { recipe.type === 'meal'
                    ? `${recipe.nationality} - ${recipe.category}`
                    : recipe.alcoholicOrNot }
                </p>
              </div>
              <div>
                <ShareBtn
                  type={ `/${recipe.type}s` }
                  id={ recipe.id }
                  testId={ `${index}-horizontal-share-btn` }
                />
                <FavoriteBtn
                  recipe={ recipe }
                  testId={ `${index}-horizontal-favorite-btn` }
                  setFavorites={ setFavorites }
                />
              </div>
            </div>
          </div>
        ))}
      </main>
      {linkCopy && (
        <div className="link-copied" data-testid="link">
          <p className="message">Link copied!</p>
        </div>
      )}
    </>
  );
}

export default FavoriteRecipes;
