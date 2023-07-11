import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import RecipesContext from './RecipesContext';

export default function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [type, setType] = useState('/meals');

  const store = useMemo(() => ({
    recipes,
    setRecipes,
    type,
    setType,
  }), [recipes, type]);

  return (
    <RecipesContext.Provider value={ store }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
