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
const MAX_CATEGORIES = 5;

function Recipes() {
  const [categories, setCategories] = useState([]);
  const [categorySelected, setCategorySelected] = useState('All');
  const { recipes, setRecipes } = useContext(RecipesContext);
  const { loading, error, fetchRecipes } = useFetch();
  const { location: { pathname } } = useHistory();
  const [, setPesquisa] = useState({
    search: '',
    endpoint: '',
  });

  const KEY_BASE = pathname === '/meals' ? 'Meal' : 'Drink';
  const isMeal = pathname.includes('meals');
  const titulo = isMeal ? 'Meals' : 'Drinks';

  useEffect(() => {
    (async () => {
      const recipesData = await fetchRecipes(pathname);
      const categoriesData = await fetchRecipes(pathname, 'categoriesList', 'list');
      if (!recipesData && !categoriesData) return;
      setCategories([...categoriesData].slice(0, MAX_CATEGORIES));
      setRecipes([...recipesData].slice(0, MAX_RECIPES));
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
      <Header
        title={ titulo }
        iconeProfile
        iconeSearch
        setPesquisa={ setPesquisa }
      />
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
        {!loading && !error && (
          <div>
            {recipes.map((item, index) => (
              <RecipeCard
                item={ item }
                key={ item[`id${KEY_BASE}`] }
                base={ KEY_BASE }
                index={ index }
              />
            ))}
          </div>
        )}
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
