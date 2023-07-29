import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import useUser from '../hooks/useUser';
import Header from '../components/Header';
import { getStorage } from '../utils/functions';
import RecipesContext from '../context/RecipesContext';
import ShareBtn from '../components/ShareBtn';
import './DoneRecipes.css';

function DoneRecipes() {
  const { linkCopy, userLogged } = useContext(RecipesContext);
  const { validateCookie } = useUser();
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    (async () => {
      await validateCookie();
    })();
  }, []);

  const { dones } = userLogged || { dones: [] };

  const filteredRecipes = filter === 'all'
    ? dones
    : dones.filter(({ type }) => type === filter);

  const buttonFilter = ['all', 'meal', 'drink'];

  return (
    <>
      <Header title="Done Recipes" iconeProfile />
      {filteredRecipes.length === 0 ? (
        <main>
          <p>Nenhuma receita finalizada encontrada.</p>
        </main>
      ) : (
        <main>
          <nav>
            { buttonFilter.map((type) => (
              <button
                key={ type }
                data-testid={ `filter-by-${type}-btn` }
                onClick={ () => setFilter(type) }
                disabled={ filter === type }
              >
                {type}
              </button>
            ))}
          </nav>
          <section>
            { filteredRecipes.map(({
              id, type, image, name, nationality,
              category, doneDate, alcoholicOrNot, tags,
            }, index) => (
              <div key={ index }>
                <Link to={ `${type}s/${id}` }>
                  <img
                    style={ { width: '100px' } }
                    src={ image }
                    alt="Recipe"
                    data-testid={ `${index}-horizontal-image` }
                  />
                </Link>
                <div>
                  <div>
                    <Link to={ `${type}s/${id}` }>
                      <h3 data-testid={ `${index}-horizontal-name` }>{name}</h3>
                    </Link>
                    <ShareBtn
                      type={ `/${type}s` }
                      id={ id }
                      testId={ `${index}-horizontal-share-btn` }
                    />
                  </div>
                  <div>
                    <p data-testid={ `${index}-horizontal-top-text` }>
                      { type === 'meal'
                        ? `${nationality} - ${category}`
                        : alcoholicOrNot }
                    </p>
                  </div>
                  {

                  }
                  <p>
                    Done In:
                    {' '}
                    <span data-testid={ `${index}-horizontal-done-date` }>
                      { doneDate.toLocaleString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      }) }
                    </span>
                  </p>
                  {tags.map((tag, indexTag) => (
                    <div
                      key={ indexTag }
                      data-testid={ `${index}-${tag}-horizontal-tag` }
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        </main>
      )}
      {linkCopy && (
        <div className="link-copied" data-testid="link">
          <p className="message">Link copied!</p>
        </div>
      )}
    </>
  );
}

export default DoneRecipes;
