import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import RecipesContext from './RecipesContext';

export default function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userLogged, setUserLogged] = useState(null);
  const [comments, setComments] = useState([]);
  const [recipeEdit, setRecipeEdit] = useState(null);

  const store = useMemo(() => ({
    recipes,
    setRecipes,
    categories,
    setCategories,
    loading,
    setLoading,
    error,
    setError,
    filter,
    setFilter,
    menuOpen,
    setMenuOpen,
    userLogged,
    setUserLogged,
    comments,
    setComments,
    recipeEdit,
    setRecipeEdit,
  }), [recipes, categories, loading,
    error, filter, menuOpen, userLogged, comments, recipeEdit]);

  return (
    <RecipesContext.Provider value={ store }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
