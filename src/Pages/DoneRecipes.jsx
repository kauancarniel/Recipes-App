import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import { getStorage } from '../utils/functions';
import RecipesContext from '../context/RecipesContext';
import ShareBtn from '../components/ShareBtn';
import './DoneRecipes.css';
import Filter from '../components/Filter';
import Footer from '../components/Footer';

function DoneRecipes() {
  const { linkCopy } = useContext(RecipesContext);
  const { filter } = useContext(RecipesContext);
  const date = 10;
  const doneRecipes = getStorage('doneRecipes') || [];
  const filteredRecipes = filter === 'all'
    ? doneRecipes
    : doneRecipes.filter(({ type }) => type === filter);

  return (
    <>
      <Header title="Done Recipes" iconeProfile />
      <main className="recipe-box flex flex-col bg-form glass box-bottom min-h-screen">
        <Filter />
        {filteredRecipes.length === 0 ? (
          <div className="no-search">
            <h2 className="text-[var(--yellow)] text-lg md:text-2xl">
              Nenhuma receita feita encontrada.
            </h2>
          </div>
        ) : (
          <section className="ready-recipe ">
            { filteredRecipes.map(({
              id, type, image, name, nationality,
              category, doneDate, alcoholicOrNot, tags,
            }, index) => (
              <div className="border-grey container-ready p-0" key={ index }>
                <Link
                  to={ `${type}s/${id}` }
                >
                  <img
                    className="detail-img border-div border-[0.1px]"
                    src={ image }
                    alt="Recipe"
                    data-testid={ `${index}-horizontal-image` }
                  />
                </Link>
                <div className="lg:p-3 p-[0.7rem] w-[100%]">
                  <div className="flex justify-between">
                    <Link className="none" to={ `${type}s/${id}` }>
                      <h4
                        className="title-done shadow-name "
                        data-testid={ `${index}-horizontal-name` }
                      >
                        {name}
                      </h4>
                    </Link>
                    <div>
                      <ShareBtn
                        type={ `/${type}s` }
                        id={ id }
                        testId={ `${index}-horizontal-share-btn` }
                      />
                    </div>
                  </div>
                  <p
                    className="text-[var(--gray)] text-sm"
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    { type === 'meal'
                      ? `${nationality} - ${category}`
                      : alcoholicOrNot }
                  </p>
                  <div className="flex mt-2">
                    {tags.map((tag, indexTag) => (
                      <div
                        key={ indexTag }
                        data-testid={ `${index}-${tag}-horizontal-tag` }
                      >
                        <p className="mr-1 text-white  ">
                          {tag}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="justify-normal flex w-[100%]">
                    <p className="text-[var(--darkYellow)] text-[11px] sm:text-sm m-0">
                      Done In:
                      {' '}
                      <span
                        className="text-[var(--gray)] text-[9px] sm:text-[9.7px]"
                        data-testid={ `${index}-horizontal-done-date` }
                      >
                        { doneDate.slice(0, date)}
                      </span>
                    </p>
                  </div>

                </div>
              </div>
            ))}
          </section>
        )}
      </main>
      <Footer />
      {linkCopy && (
        <div className="link-copied" data-testid="link">
          <p className="message">Link copied!</p>
        </div>
      )}
    </>
  );
}

export default DoneRecipes;
