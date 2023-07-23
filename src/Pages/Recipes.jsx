import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';

import RecipesContext from '../context/RecipesContext';
import useFetch from '../hooks/useFetch';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import IconFood from '../images/IconFood';
import IconDrink from '../images/IconDrinks';
import CategoryIcon from '../components/CategoryIcon';

const MAX_RECIPES = 12;

function Recipes() {
  const [categorySelected, setCategorySelected] = useState('All');
  const { setRecipes, categories, loading, error } = useContext(RecipesContext);
  const { fetchRecipes, initialFetch } = useFetch();
  const { location: { pathname } } = useHistory();

  useEffect(() => {
    (async () => {
      initialFetch(pathname);
    })();
  }, []);

  const handleClickCategory = async (strCategory) => {
    const allCondition = (strCategory === 'All' && categorySelected !== 'All');
    if (allCondition || categorySelected === strCategory) {
      const recipesDataAll = await fetchRecipes(pathname);
      setRecipes(recipesDataAll.slice(0, MAX_RECIPES));
      setCategorySelected('All');
    } else {
      const recipesData = await fetchRecipes(pathname, 'category', strCategory);
      setRecipes(recipesData.slice(0, MAX_RECIPES));
      setCategorySelected(strCategory);
    }
  };

  return (
    <>
      <Header
        title={ pathname === '/meals' ? 'Meals' : 'Drinks' }
        iconeSearch
        iconeProfile
      />
      <main className="recipe-box flex flex-col bg-form glass box-bottom min-h-screen">
        <nav className="flex justify-between pb-9">
          <button
            className={
              `category-btn ${categorySelected === 'All'
                ? 'text-[var(--green)]' : 'text-[var(--yellow)]'}`
            }
            type="button"
            data-testid="All-category-filter"
            disabled={ categorySelected === 'All' }
            onClick={ () => handleClickCategory('All') }
          >
            <div
              className={
                `category border-[${categorySelected === 'All'
                  ? 'var(--green)' : 'var(--yellow)'}]`
              }
            >
              { pathname === '/meals' ? (
                <IconFood categorySelected={ categorySelected } strCategory="All" />
              ) : (
                <IconDrink categorySelected={ categorySelected } strCategory="All" />
              ) }
            </div>
            All
          </button>
          {categories.map(({ strCategory }, index) => {
            const color = categorySelected === strCategory
              ? 'var(--green)' : 'var(--yellow)';
            return (
              <button
                className={ `category-btn text-[${color}]` }
                type="button"
                key={ index }
                data-testid={ `${strCategory}-category-filter` }
                onClick={ () => handleClickCategory(strCategory) }
              >
                <div
                  className={ `category border-[${color}]` }
                >
                  <CategoryIcon
                    strCategory={ strCategory }
                    categorySelected={ categorySelected }
                    index={ index }
                  />
                </div>
                { strCategory }
              </button>
            );
          })}
        </nav>
        {loading && (
          <div className="w-full h-full flex-center">
            <h2 className="text-[var(--yellow)]">Loading...</h2>
          </div>
        )}
        <div className="cards-container">
          {!loading && !error && (
            <RecipeCard />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

Recipes.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default Recipes;
