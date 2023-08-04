import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

import RecipesContext from '../context/RecipesContext';
import useFetch from './useFetch';
import { fetchPostRecipe, fetchUsersRecipes } from '../services/fetchAPI';

const useRecipe = () => {
  const { setError } = useContext(RecipesContext);
  const { fireToast } = useFetch();

  const formatedRecipe = (type) => {
    if (type === 'Meal') {
      return {
        idMeal: uuidv4(),
        strType: type.toLowerCase(),
        strMeal: '',
        strCategory: '',
        strArea: '',
        strInstructions: '',
        strMealThumb: '',
        strTags: '',
        strYoutube: '',
        strIngredient1: '',
        strMeasure1: '',
      };
    }
    return {
      idDrink: uuidv4(),
      strType: type.toLowerCase(),
      strDrink: '',
      strCategory: '',
      strAlcoholic: 'Alcoholic',
      strInstructions: '',
      strDrinkThumb: '',
      strTags: '',
      strIngredient1: '',
      strMeasure1: '',
    };
  };

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

  const postMyRecipe = async (obj) => {
    try {
      await fetchPostRecipe(obj);
      fireToast('Recipe successfully added!', 'success');
    } catch ({ message }) {
      setError(message);
    }
  };

  return { getAllUsersRecipe, getMyRecipes, formatedRecipe, postMyRecipe };
};

export default useRecipe;
