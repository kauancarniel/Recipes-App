import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';

import RecipesContext from '../context/RecipesContext';
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

  useEffect(() => {
    (async () => {
      initialFetch(pathname);
    })();
  }, []);

  const handleClick = async (strCategory) => {
    const allCondition = (strCategory === 'All' && categorySelected !== 'All');
    if (allCondition || categorySelected === strCategory) {
      const recipesDataAll = await fetchRecipes(pathname);
      setRecipes(recipesDataAll.slice(0, MAX_RECIPES));
      setCategorySelected(strCategory);
    } else if (strCategory !== 'All') {
      const recipesData = await fetchRecipes(pathname, 'category', strCategory);
      setRecipes(recipesData.slice(0, MAX_RECIPES));
      setCategorySelected(strCategory);
    }
  };

  return (
    <>
      <Header />
      <main>
        <nav>
          <button
            type="button"
            data-testid="All-category-filter"
            onClick={ () => handleClick('All') }
          >
            All
          </button>
          {categories.map(({ strCategory }, index) => (
            <button
              type="button"
              key={ index }
              data-testid={ `${strCategory}-category-filter` }
              onClick={ () => handleClick(strCategory) }
            >
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
