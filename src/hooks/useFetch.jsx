import { useContext } from 'react';

import fetchAPI from '../services/fetchAPI';
import RecipesContext from '../context/RecipesContext';

const useFetch = () => {
  const { setRecipes, setCategories, setLoading, setError } = useContext(RecipesContext);

  const MAX_RECIPES = 12;
  const MAX_CATEGORIES = 5;

  const fetchRecipes = async (pathname, optSearch = 'name', textSearch = '') => {
    try {
      setLoading(true);
      return await fetchAPI(pathname, optSearch, textSearch);
    } catch ({ message }) {
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const initialFetch = async (pathname) => {
    const recipesData = await fetchRecipes(pathname);
    const categoriesData = await fetchRecipes(pathname, 'categoriesList', 'list');
    setRecipes(recipesData.slice(0, MAX_RECIPES));
    setCategories(categoriesData.slice(0, MAX_CATEGORIES));
  };

  return { fetchRecipes, initialFetch };
};

export default useFetch;
