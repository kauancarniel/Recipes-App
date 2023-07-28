import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useCookies from '../hooks/useCookies';
import Header from '../components/Header';
import Filter from '../components/Filter';
import RecipesContext from '../context/RecipesContext';
import ShareBtn from '../components/ShareBtn';
import FavoriteBtn from '../components/FavoriteBtn';
import './DoneRecipes.css';

function FavoriteRecipes() {
  const { validateCookie } = useCookies();
  const { filter, linkCopy, userLogged } = useContext(RecipesContext);

  useEffect(() => {
    validateCookie();
  }, []);

  const { favorites } = userLogged;
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
