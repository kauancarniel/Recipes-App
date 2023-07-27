import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import { getStorage } from '../utils/functions';
import RecipesContext from '../context/RecipesContext';
import ShareBtn from '../components/ShareBtn';
import './DoneRecipes.css';
import Filter from '../components/Filter';

function DoneRecipes() {
  const { linkCopy } = useContext(RecipesContext);
  const { filter } = useContext(RecipesContext);

  const doneRecipes = getStorage('doneRecipes') || [];

  const filteredRecipes = filter === 'all'
    ? doneRecipes
    : doneRecipes.filter(({ type }) => type === filter);

  return (
    <>
      <Header title="Done Recipes" iconeProfile />
      {filteredRecipes.length === 0 ? (
        <div className="no-search">
          <h2 className="text-[var(--yellow)]">Nenhuma receita favorita encontrada.</h2>
        </div>
      ) : (
        <main className="recipe-box flex flex-col bg-form glass box-bottom min-h-screen">
          <nav>
            <Filter />
          </nav>
          <section className="ready-recipe border-div">
            { filteredRecipes.map(({
              id, type, image, name, nationality,
              category, doneDate, alcoholicOrNot, tags,
            }, index) => (
              <div className="border-grey container-ready p-0" key={ index }>
                <Link
                  class=" w-[148px] md:w-[180px]"
                  to={ `${type}s/${id}` }
                >
                  <img
                    className="detail-img border-div border-[0.1px]"
                    src={ image }
                    alt="Recipe"
                    data-testid={ `${index}-horizontal-image` }
                  />
                </Link>
                <div className=" flex flex-col justify-center w-[100%] items-center border-div border-blue-800">
                  <div className="flex justify-center items-center  w-[100%]">
                    <Link className="none" to={ `${type}s/${id}` }>
                      <h4
                        className="text-[var(--orange)] shadow-name"
                        data-testid={ `${index}-horizontal-name` }
                      >
                        {name}
                      </h4>
                    </Link>

                  </div>
                  <div>
                    <p
                      className="text-[var(--gray)] text-sm"
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      { type === 'meal'
                        ? `${nationality} - ${category}`
                        : alcoholicOrNot }
                    </p>
                  </div>
                  <div className="flex">
                    {tags.map((tag, indexTag) => (
                      <div
                        key={ indexTag }
                        data-testid={ `${index}-${tag}-horizontal-tag` }
                      >
                        <p className="mr-1 text-white">
                          {tag}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="border-div justify-center items-end   flex w-[100%]">
                    <p className="text-[var(--darkYellow)] text-sm m-0">
                      Done In:
                      {' '}
                      <span className="text-[var(--gray)] text-[10px]" data-testid={ `${index}-horizontal-done-date` }>
                        { doneDate.toLocaleString('pt-BR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        }) }

                      </span>
                    </p>
                  </div>
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
