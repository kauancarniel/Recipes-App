import { useContext } from 'react';
import Swal from 'sweetalert2';

import fetchAPI from '../services/fetchAPI';
import RecipesContext from '../context/RecipesContext';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

const useFetch = () => {
  const { setRecipes, setCategories, setLoading,
    setError, error } = useContext(RecipesContext);

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

  const fireToast = (title) => {
    Toast.fire({
      icon: 'error',
      title,
      background: 'var(--darkGray)',
      color: 'var(--yellow)',
    });
  };

  const initialFetch = async (pathname) => {
    const recipesData = await fetchRecipes(pathname);
    const categoriesData = await fetchRecipes(pathname, 'categoriesList', 'list');
    if (error) {
      fireToast(`${error}. Please, try again later.`);
      setRecipes([]);
    } else {
      setRecipes(recipesData.slice(0, MAX_RECIPES));
      setCategories(categoriesData.slice(0, MAX_CATEGORIES));
    }
  };

  return { fetchRecipes, initialFetch, fireToast };
};

export default useFetch;
