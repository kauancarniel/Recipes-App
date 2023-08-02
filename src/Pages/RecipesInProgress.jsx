import React, { useContext, useEffect, useState } from 'react';
import { MdOutlineDelete } from 'react-icons/md';

import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import useUser from '../hooks/useUser';
import useFetch from '../hooks/useFetch';
import Header from '../components/Header';
import ShareBtn from '../components/ShareBtn';
import Filter from '../components/Filter';

export default function RecipesInProgress() {
  const { validateCookie, handleRemoveInProgress } = useUser();
  const { sweetAlert } = useFetch();
  const { userLogged, filter } = useContext(RecipesContext);

  useEffect(() => {
    (async () => {
      await validateCookie();
    })();
  }, []);

  const lowerType = filter.toLowerCase();
  const { inProgress } = userLogged || { inProgress: {} };
  const { meals, drinks } = inProgress || { meals: {}, drinks: {} };

  const filteredFavorites = filter === 'all'
    ? [...(meals ? Object.values(meals) : []), ...(drinks ? Object.values(drinks) : [])]
      .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
    : Object.values(inProgress[`${lowerType}s`] || {}).reverse();

  return (
    <>
      <Header title="Recipes in Progress" />
      <main className="recipe-box flex flex-col bg-form glass box-bottom min-h-screen">
        <Filter />
        { !filteredFavorites.length ? (
          <div className="no-search">
            <h2 className="text-[var(--yellow)] text-2xl">
              {`There are no ${lowerType !== 'all'
                ? `${lowerType}s` : 'recipes'} in progress.`}
            </h2>
          </div>
        ) : (
          <ul>
            {filteredFavorites.map((recipe) => {
              const { id, type, image, name,
                nationality, category, alcoholicOrNot, tags } = recipe;
              return (
                <li key={ `${id}-${type}` }>
                  <Link to={ `${type}s/${id}` }>
                    <img
                      style={ { width: '100px' } }
                      src={ image }
                      alt={ name }
                    />
                  </Link>
                  <div>
                    <div>
                      <Link to={ `${type}s/${id}` }>
                        <h3>{name}</h3>
                      </Link>
                      <ShareBtn
                        type={ `/${type}s` }
                        id={ id }
                        testId={ `${id}-${type}-horizontal-share-btn` }
                      />
                      <button
                        type="button"
                        className="reset-btn del-in-progress-btn"
                        onClick={ () => sweetAlert(
                          handleRemoveInProgress,
                          id,
                          lowerType,
                          recipe,
                        ) }
                      >
                        <MdOutlineDelete size="40px" />
                      </button>
                    </div>
                    <div>
                      <p>
                        { type === 'meal'
                          ? `${nationality} - ${category}`
                          : alcoholicOrNot }
                      </p>
                    </div>
                    {tags.map((tag) => (
                      <div
                        key={ tag }
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </>
  );
}
