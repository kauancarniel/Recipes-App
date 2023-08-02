import { useContext } from 'react';
import Swal from 'sweetalert2';

import { fetchAPI, fetchComments, fetchNewUser, fetchPatchUser,
  fetchUserEmail, fetchUserId } from '../services/fetchAPI';
import RecipesContext from '../context/RecipesContext';
import { Toast, setCookie } from '../utils/functions';

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

  const fireToast = (title, icon = 'error') => {
    Toast.fire({
      icon,
      title,
      background: 'var(--darkGray)',
      color: 'var(--yellow)',
    });
  };

  const sweetAlert = (fn, ...params) => Swal.fire({
    title: 'Are you sure?',
    text: 'You won\'t be able to revert this!',
    icon: 'warning',
    background: 'var(--darkGray)',
    color: 'var(--yellow)',
    showCancelButton: true,
    buttonsStyling: false,
    confirmButtonColor: 'var(--orange)',
    cancelButtonColor: 'var(--darkYellow)',
    confirmButtonText: 'Yes, delete it!',
    customClass: {
      confirmButton: 'swal-confirm',
      cancelButton: 'swal-cancel',
    },
  }).then((result) => {
    if (result.isConfirmed) {
      fn(...params);
      fireToast('Deleted!', 'success');
    }
  });

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

  const fetchUser = async ({ id = null, email = null, password = null }) => {
    try {
      setLoading(true);
      if (email) return await fetchUserEmail(email, password);
      if (id !== null) return await fetchUserId(id);
      throw new Error('fetchUser needs at least one parameter (id or email');
    } catch ({ message }) {
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const postNewUser = async (newUser) => {
    try {
      setLoading(true);
      const id = await fetchNewUser(newUser);
      setCookie('userLogged', id);
      return true;
    } catch ({ message }) {
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const checkUserExist = async (email) => {
    const userResponse = await fetchUserEmail(email);
    return !!userResponse.length;
  };

  const loginUser = async ({ email, password }) => {
    const userResponse = await fetchUserEmail(email, password);
    if (userResponse.length) {
      setCookie('userLogged', userResponse[0].id);
      return true;
    }
    fireToast('Invalid email or password');
    return false;
  };

  const patchUser = async (id, data) => {
    try {
      await fetchPatchUser(id, data);
    } catch ({ message }) {
      setError(message);
      return [];
    }
  };

  const fetchRecipeComments = async (key, value) => {
    try {
      return await fetchComments(key, value);
    } catch ({ message }) {
      setError(message);
      return [];
    }
  };

  return { fetchRecipes,
    initialFetch,
    fireToast,
    fetchUser,
    postNewUser,
    loginUser,
    checkUserExist,
    patchUser,
    fetchRecipeComments,
    sweetAlert,
  };
};

export default useFetch;
