import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { uploadImage } from '../services/firebase';
import RecipesContext from '../context/RecipesContext';
import useFetch from './useFetch';
import { fetchDeleteRecipe, fetchPatchRecipe, fetchPostRecipe,
  fetchUsersRecipes } from '../services/fetchAPI';

const useRecipe = () => {
  const { setError, userLogged, setRecipes,
    recipes, setLoading } = useContext(RecipesContext);
  const { fireToast } = useFetch();

  const formatedRecipe = (type, recipe) => {
    if (type === 'Meal') {
      return recipe || {
        strType: type.toLowerCase(),
        strMeal: '',
        strUserId: userLogged.id,
        strCategory: 'Beefs',
        strArea: '',
        strInstructions: '',
        strMealThumb: '',
        strTags: '',
        strPublic: false,
        strYoutube: '',
        strIngredient1: '',
        strMeasure1: '',
        strUuid: '',
      };
    }
    return recipe || {
      strType: type.toLowerCase(),
      strDrink: '',
      strUserId: userLogged.id,
      strCategory: 'Ordinary Drink',
      strAlcoholic: 'Alcoholic',
      strInstructions: '',
      strDrinkThumb: '',
      strTags: '',
      strPublic: false,
      strIngredient1: '',
      strMeasure1: '',
      strUuid: '',
    };
  };

  const getAllUsersRecipe = async () => {
    try {
      const recipesData = await fetchUsersRecipes();
      return recipesData;
    } catch ({ message }) {
      setError(message);
      return [];
    }
  };

  const getMyRecipes = async (obj) => {
    try {
      const recipesData = await fetchUsersRecipes(obj);
      setRecipes(recipesData);
    } catch ({ message }) {
      setError(message);
      return [];
    }
  };

  const postMyRecipe = async (obj) => {
    try {
      const strUuid = uuidv4();
      const type = obj.strType === 'meal' ? 'Meal' : 'Drink';
      let photo = '';
      if (obj[`str${type}Thumb`]) {
        photo = await uploadImage(strUuid, obj[`str${type}Thumb`], 'recipe');
      }
      await fetchPostRecipe({ ...obj, strUuid, [`str${type}Thumb`]: photo });
      fireToast('Recipe successfully added!', 'success');
      setRecipes((prev) => [...prev, obj]);
    } catch ({ message }) {
      setError(message);
    }
  };

  const deleteRecipe = async (id) => {
    try {
      const newRecipes = recipes.filter((comment) => comment.id !== id);
      await fetchDeleteRecipe(id);
      setRecipes(newRecipes);
    } catch ({ message }) {
      setError(message);
      return [];
    }
  };

  const patchRecipe = async (obj) => {
    try {
      const type = obj.strType === 'meal' ? 'Meal' : 'Drink';
      const newObj = { ...obj };
      if (obj[`str${type}Thumb`] instanceof Object) {
        newObj[`str${type}Thumb`] = await uploadImage(
          obj.strUuid,
          obj[`str${type}Thumb`],
          'recipe',
        );
      }
      await fetchPatchRecipe(obj.id, newObj);
      fireToast('Recipe successfully edited!', 'success');
      setRecipes((prev) => prev.map((recipe) => (recipe.id === obj.id ? obj : recipe)));
    } catch ({ message }) {
      setError(message);
    }
  };

  const fetchRecipe = async (obj) => {
    try {
      setLoading(true);
      return await fetchUsersRecipes(obj);
    } catch ({ message }) {
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { getAllUsersRecipe,
    getMyRecipes,
    formatedRecipe,
    postMyRecipe,
    deleteRecipe,
    patchRecipe,
    fetchRecipe };
};

export default useRecipe;
