import React, { useContext, useEffect, useState } from 'react';
import { MdOutlineDelete } from 'react-icons/md';

import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import useUser from '../hooks/useUser';
import useFetch from '../hooks/useFetch';
import Header from '../components/Header';
import ShareBtn from '../components/ShareBtn';

const typesBtn = ['Meals', 'Drinks'];

export default function RecipesInProgress() {
  const { validateCookie, handleRemoveInProgress } = useUser();
  const { sweetAlert } = useFetch();
  const { userLogged } = useContext(RecipesContext);
  const [typeFilter, setTypeFilter] = useState('Meals');

  useEffect(() => {
    (async () => {
      await validateCookie();
    })();
  }, []);

  const lowerType = typeFilter.toLowerCase();
  const { inProgress } = userLogged || { inProgress: {} };

  return (
    <>
      <Header
        title="Recipes in Progress"
        iconeSearch
      />
      <main className="recipe-box flex flex-col bg-form glass box-bottom min-h-screen">
        <div>
          { typesBtn.map((name) => (
            <button
              key={ name }
              name="Meals"
              type="button"
              disabled={ typeFilter === name }
              onClick={ () => setTypeFilter(name) }
            >
              {name}
            </button>
          ))}
        </div>
        { !Object.keys(inProgress).includes(lowerType) ? (
          <div>
            <p>{`No ${lowerType} in progress.`}</p>
          </div>
        ) : (
          <ul>
            {Object.values(inProgress[lowerType]).reverse()
              .map((recipe) => {
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
