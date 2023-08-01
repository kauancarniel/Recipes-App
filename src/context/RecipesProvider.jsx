import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import RecipesContext from './RecipesContext';

export default function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState('all');
  const [linkCopy, setLinkCopy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userLogged, setUserLogged] = useState(null);
  const [ranking, setRanking] = useState([]);
  const [comments, setComments] = useState([]);

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
    filter,
    setFilter,
    menuOpen,
    setMenuOpen,
    userLogged,
    setUserLogged,
    comments,
    setComments,
    ranking,
    setRanking,
  }), [recipes, categories, loading,
    error, linkCopy, filter, menuOpen, userLogged, comments,
    ranking]);

  return (
    <RecipesContext.Provider value={ store }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
