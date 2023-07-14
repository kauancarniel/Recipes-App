import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import RecipesContext from './RecipesContext';

export default function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [linkCopy, setLinkCopy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const store = useMemo(() => ({
    recipes,
    setRecipes,
    categories,
    setCategories,
    loading,
    setLoading,
    error,
    setError,
    linkCopy,
    setLinkCopy,
  }), [recipes, categories, loading, error, linkCopy]);

  return (
    <RecipesContext.Provider value={ store }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
