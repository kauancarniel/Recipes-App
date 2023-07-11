import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import RecipesContext from '../context/RecipesContext';
import useFetch from '../hooks/useFetch';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Recipes() {
  const { recipes, setRecipes } = useContext(RecipesContext);
  const { loading, error, fetchRecipes } = useFetch();
  const { location } = useHistory();

  const KEY_BASE = location.pathname === '/meals' ? 'Meal' : 'Drink';

  useEffect(() => {
    (async () => {
      const data = await fetchRecipes(location.pathname);
      setRecipes(data);
    })();
  }, []);

  return (
    <>
      <Header />
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {!loading && !error && (
        <div>{recipes.map((item) => item[`str${KEY_BASE}`])}</div>
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
