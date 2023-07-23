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
import IconBeef from '../images/IconBeef';
import IconBreakfast from '../images/IconBreakfast';
import IconChicken from '../images/IconChicken';
import IconDessert from '../images/IconDessert';
import IconGoat from '../images/IconGoat';

const MAX_RECIPES = 12;

function Recipes() {
  const [categorySelected, setCategorySelected] = useState('All');
  const { setRecipes, categories, loading, error } = useContext(RecipesContext);
  const { fetchRecipes, initialFetch } = useFetch();
  const { location: { pathname } } = useHistory();

  const renderIcon = (strCategory, index) => {
    const categoryIcons = [
      <IconBeef
        key="Beef"
        categorySelected={ categorySelected }
        strCategory={ strCategory }
      />,
      <IconBreakfast
        key="Beef"
        categorySelected={ categorySelected }
        strCategory={ strCategory }
      />,
      <IconChicken
        key="Chicken"
        categorySelected={ categorySelected }
        strCategory={ strCategory }
      />,
      <IconDessert
        key="Dessert"
        categorySelected={ categorySelected }
        strCategory={ strCategory }
      />,
      <IconGoat
        key="Goat"
        categorySelected={ categorySelected }
        strCategory={ strCategory }
      />,
    ];
    return categoryIcons[index];
  };

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
        <nav className="flex-center justify-between pb-9">
          <button
            className={
              `reset-btn flex-center flex-col gap-[5px] ${
                categorySelected === 'All'
                  ? 'text-[#7D8C00]' : 'text-[#F9EFBB]'}`
            }
            type="button"
            data-testid="All-category-filter"
            disabled={ categorySelected === 'All' }
            onClick={ () => handleClickCategory('All') }
          >
            <div
              className={
                `category border-[${categorySelected === 'All'
                  ? '#7D8C00' : '#F9EFBB'}]`
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
            const color = categorySelected === strCategory ? '#7D8C00' : '#F9EFBB';
            return (
              <button
                className={
                  `reset-btn flex-center flex-col gap-[5px] text-[${color}]`
                }
                type="button"
                key={ index }
                data-testid={ `${strCategory}-category-filter` }
                onClick={ () => handleClickCategory(strCategory) }
              >
                <div
                  className={ `category border-[${color}]` }
                >
                  { renderIcon(strCategory, index) }
                </div>
                { strCategory }
              </button>
            );
          })}
        </nav>
        {loading && (
          <div className="w-full h-full flex-center">
            <h2 className="text-[#F9EFBB]">Loading...</h2>
          </div>
        )}
        {error && <div>{error}</div>}
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
