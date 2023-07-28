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
      <main className="recipe-box flex flex-col bg-form glass box-bottom min-h-screen">
        <Filter />
        {!favorites.length ? (
          <div className="no-search">
            <h2 className="text-[var(--yellow)]">Sem favoritos</h2>
          </div>
        )
          : (
            <section className="ready-recipe">

              { filteredFavorites.map((recipe, index) => (
                <div
                  className="border-grey  p-0 container-ready"
                  key={ `${recipe.id}${recipe.type}` }
                >
                  <Link
                    to={ `/${recipe.type}s/${recipe.id}` }
                  >
                    <img
                      className="detail-img border-div border-[0.1px]"
                      src={ recipe.image }
                      alt={ `foto ${recipe.name}` }
                      data-testid={ `${index}-horizontal-image` }
                    />
                  </Link>
                  <div className="content-ready">
                    <Link className="none" to={ `/${recipe.type}s/${recipe.id}` }>
                      <h4
                        className="text-[var(--orange)] shadow-name"
                        data-testid={ `${index}-horizontal-name` }
                      >
                        {recipe.name}
                      </h4>
                    </Link>
                    <p
                      className="text-[var(--gray)] text-sm"
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      { recipe.type === 'meal'
                        ? `${recipe.nationality} - ${recipe.category}`
                        : recipe.alcoholicOrNot }
                    </p>
                    <div className="flex mt-2">
                      <div className="mr-3">
                        <ShareBtn
                          type={ `/${recipe.type}s` }
                          id={ recipe.id }
                          testId={ `${index}-horizontal-share-btn` }
                        />
                      </div>
                      <FavoriteBtn
                        recipe={ recipe }
                        testId={ `${index}-horizontal-favorite-btn` }
                        setFavorites={ setFavorites }
                      />
                    </div>
                  </div>
                </div>
              ))}

            </section>
          )}
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
