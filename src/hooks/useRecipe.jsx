import { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import { fetchUsersRecipes } from '../services/fetchAPI';

const useRecipe = () => {
  const { setError } = useContext(RecipesContext);

  const getAllUsersRecipe = async () => {
    try {
      const recipes = await fetchUsersRecipes();
      return recipes;
    } catch ({ message }) {
      setError(message);
      return [];
    }
  };

  const getMyRecipes = async (obj) => {
    try {
      const recipes = await fetchUsersRecipes(obj);
      return recipes;
    } catch ({ message }) {
      setError(message);
      return [];
    }
  };

  return { getAllUsersRecipe, getMyRecipes };
};

export default useRecipe;
