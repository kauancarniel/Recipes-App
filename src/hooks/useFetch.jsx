import { useContext } from 'react';
import usersData from '../data/db.json';
import { fetchAPI,
  fetchNewUser, fetchUserPoints, fetchUsers } from '../services/fetchAPI';
import RecipesContext from '../context/RecipesContext';
import { Toast } from '../utils/functions';

const useFetch = () => {
  const { setRecipes, setCategories, setLoading,
    setError, error, setUser, user } = useContext(RecipesContext);
  const { users } = usersData;
  const identifyUser = users.find((userData) => userData.email === user.email);
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

  const fetchUser = async (email, password = null) => {
    try {
      setLoading(true);
      return await fetchUsers(email, password);
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
      await fetchNewUser(newUser);
    } catch ({ message }) {
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const addPoints = async (points) => {
    const sumPoints = identifyUser.points + points;
    try {
      setLoading(true);
      await fetchUserPoints(user, user.id, sumPoints);
    } catch ({ message }) {
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const checkUserExist = async (email) => {
    const userResponse = await fetchUser(email);
    return !!userResponse.length;
  };

  const loginUser = async ({ email, password }) => {
    const userResponse = await fetchUser(email, password);
    setUser(userResponse[0] || {});
    if (userResponse.length) {
      return true;
    }
    fireToast('Invalid email or password');
    return false;
  };

  return { fetchRecipes,
    initialFetch,
    fireToast,
    fetchUser,
    postNewUser,
    loginUser,
    checkUserExist,
    addPoints,
  };
};

export default useFetch;
