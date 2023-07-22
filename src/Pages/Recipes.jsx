import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';

import RecipesContext from '../context/RecipesContext';
import foods from '../images/icon-foods.svg';
import noFoods from '../images/icon-no-foods.svg';
import drinks from '../images/icon-drinks.svg';
import noDrinks from '../images/icon-no-drinks.svg';
import beef from '../images/icon-beef.svg';
import noBeef from '../images/icon-no-beef.svg';
import breakfast from '../images/breakfast-icon.svg';
import chicken from '../images/chicken-icon.svg';
import dessert from '../images/dessert-icon.svg';
import goat from '../images/goat-icon.svg';
import useFetch from '../hooks/useFetch';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';

const MAX_RECIPES = 12;

function Recipes() {
  const [categorySelected, setCategorySelected] = useState('All');
  const { setRecipes, categories, loading, error } = useContext(RecipesContext);
  const { fetchRecipes, initialFetch } = useFetch();
  const { location: { pathname } } = useHistory();

  const categoryIcons = [[beef, noBeef],
    [breakfast, ''],
    [chicken, ''],
    [dessert, ''],
    [goat, '']];

  const food = [[foods, noFoods], [drinks, noDrinks]];

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
      setCategorySelected(strCategory);
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
      <main className="bg-[#262321]">
        <nav className="flex-center justify-between pb-9 px-2">
          <button
            className="reset-btn text-white flex-center flex-col gap-[5px]"
            type="button"
            data-testid="All-category-filter"
            onClick={ () => handleClickCategory('All') }
          >
            <img
              className="h-[45px]"
              src={
                food[pathname === '/meals' ? 0 : 1][categorySelected === 'All' ? 0 : 1]
              }
              alt="category All icon"
            />
            All
          </button>
          {categories.map(({ strCategory }, index) => (
            <button
              className="reset-btn text-white flex-center flex-col gap-[5px]"
              type="button"
              key={ index }
              data-testid={ `${strCategory}-category-filter` }
              onClick={ () => handleClickCategory(strCategory) }
            >
              <img
                className="h-[45px]"
                src={
                  categoryIcons[index][`${categorySelected === strCategory ? 0 : 1}`]
                }
                alt={ `category ${strCategory} icon` }
              />
              { strCategory }
            </button>
          ))}
        </nav>
        {loading && (
          <div>
            <h2>Loading...</h2>
          </div>
        )}
        {error && <div>{error}</div>}
        <div>
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
