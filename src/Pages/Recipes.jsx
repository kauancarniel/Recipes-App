import React, { useContext, useEffect } from 'react';
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
  const { recipes, setRecipes } = useContext(RecipesContext);
  const { loading, error, fetchRecipes } = useFetch();
  const { location } = useHistory();

  useEffect(() => {
    (async () => {
      const data = await fetchRecipes(location.pathname);
      setRecipes(data);
    })();
  }, []);

  const KEY_BASE = location.pathname === '/meals' ? 'Meal' : 'Drink';
  return (
    <>
      <Header />
      {loading && (
        <div>
          <h2>Loading...</h2>
        </div>
      )}
      {error && <div>{error}</div>}
      {!loading && !error && (
        <div>
          {recipes.map((item, index) => {
            if (index < MAX_RECIPES) {
              return (
                <RecipeCard
                  item={ item }
                  key={ item[`id${KEY_BASE}`] }
                  base={ KEY_BASE }
                  index={ index }
                />
              );
            }
            return null;
          })}
        </div>
      )}
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
