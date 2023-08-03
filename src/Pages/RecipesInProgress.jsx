import React, { useContext, useEffect } from 'react';
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
      <main className="recipe-box flex flex-col bg-form glass box-bottom">
        <Filter />
        { !filteredFavorites.length ? (
          <div className="no-search">
            <h2 className="text-[var(--yellow)] text-2xl">
              {`There are no ${lowerType !== 'all'
                ? `${lowerType}s` : 'recipes'} in progress.`}
            </h2>
          </div>
        ) : (
          <ul className="ready-recipe">
            {filteredFavorites.map((recipe) => {
              const { id, type, image, name, startDate,
                nationality, category, alcoholicOrNot, tags } = recipe;
              return (
                <li
                  className="border-grey p-0 container-ready"
                  key={ `${id}-${type}` }
                >
                  <Link to={ `${type}s/${id}` }>
                    <img
                      className="detail-img"
                      src={ image }
                      alt={ name }
                    />
                  </Link>
                  <div className="lg:p-3 p-[0.7rem] w-[100%]">
                    <div className="flex justify-between w-full">
                      <div className="flex gap-x-4 items-center">
                        <Link
                          className="no-underline title-done"
                          to={ `${type}s/${id}` }
                        >
                          {name}
                        </Link>
                        <ShareBtn
                          type={ `/${type}s` }
                          id={ id }
                          testId={ `${id}-${type}-horizontal-share-btn` }
                        />
                      </div>
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
                    <p className="text-[var(--gray)] text-sm mb-1">
                      { type === 'meal'
                        ? `${nationality} - ${category}`
                        : alcoholicOrNot }
                    </p>
                    <div className="justify-normal flex w-[100%]">
                      <p className="text-[var(--darkYellow)] text-xs sm:text-sm mb-3">
                        Start In:
                        {' '}
                        <span
                          className="text-white"
                        >
                          { new Date(startDate).toLocaleDateString('en-US')}
                        </span>
                      </p>
                    </div>
                    <div className="flex w-full gap-2 flex-wrap">
                      {tags.map((tag) => (
                        <div
                          className="tag"
                          key={ tag }
                        >
                          {tag}
                        </div>
                      ))}
                    </div>
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
