import { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import RecipesContext from '../context/RecipesContext';
import useFetch from './useFetch';
import { deleteCookie, getCookie } from '../utils/functions';

const useUser = () => {
  const { fetchUser, patchUser } = useFetch();
  const history = useHistory();
  const { pathname } = useLocation();
  const { setMenuOpen, userLogged, setUserLogged } = useContext(RecipesContext);

  const validateCookie = async () => {
    const unlogingPaths = ['/', '/remember-password', '/signup'];
    const id = getCookie('userLogged');
    if (id) {
      if (!userLogged) {
        const user = await fetchUser({ id });
        delete user.password;
        setUserLogged(user);
      }
      if (unlogingPaths.includes(pathname)) history.push('/meals');
      return true;
    }
    if (!unlogingPaths.includes(pathname)) history.push('/');
    return false;
  };

  const logout = () => {
    deleteCookie('userLogged');
    setUserLogged(null);
    setMenuOpen(false);
  };

  const changeFavorite = async (recipe, BASE_TYPE, isFavorite) => {
    let newFavorites;
    const { favorites, id } = userLogged;

    if (isFavorite) {
      newFavorites = [...favorites, recipe];
    } else {
      newFavorites = favorites.filter(
        ({ id: favId, type: favType }) => !(
          favId === recipe.id && favType === BASE_TYPE
        ),
      );
    }
    setUserLogged({ ...userLogged, favorites: newFavorites });
    await patchUser(id, 'favorites', newFavorites);
  };

  const setUserProgress = (NAME_URL, key, checkboxes) => {
    const { inProgress } = userLogged;
    const newProgressRecipes = {
      ...inProgress,
      [NAME_URL]: {
        ...inProgress[NAME_URL],
        [key]: checkboxes,
      },
    };
    setUserLogged({ ...userLogged, inProgress: newProgressRecipes });
    return newProgressRecipes;
  };

  const saveProgress = async (key, NAME_URL, checkBoxes) => {
    const newProgressRecipes = setUserProgress(NAME_URL, key, checkBoxes);
    await patchUser(userLogged.id, 'inProgress', newProgressRecipes);
  };

  const handleRemoveInProgress = (id, NAME_URL) => {
    const { inProgress } = userLogged;
    if (Object.keys(inProgress[NAME_URL]).length === 1) {
      delete inProgress[NAME_URL];
    } else {
      delete inProgress[NAME_URL][id];
    }
    saveProgress(id, NAME_URL, inProgress);
  };

  const addInDoneRecipes = async (recipe, NAME_URL, id) => {
    const BASE_KEY = NAME_URL === 'meals' ? 'Meal' : 'Drink';
    const { strArea, strCategory, strAlcoholic, strTags } = recipe;
    const { dones } = userLogged || { dones: [] };
    const formatedRecipe = {
      id,
      type: BASE_KEY.toLocaleLowerCase(),
      nationality: strArea || '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic || '',
      name: recipe[`str${BASE_KEY}`],
      image: recipe[`str${BASE_KEY}Thumb`],
      doneDate: new Date().toISOString(),
      tags: strTags ? strTags.split(',').splice(0, 2) : [],
    };
    const filteredDones = dones
      .filter(({ id: doneId, type }) => !(
        doneId === id && type === BASE_KEY.toLocaleLowerCase()
      ));

    await patchUser(userLogged.id, 'dones', [...filteredDones, formatedRecipe]);
  };

  return { validateCookie,
    changeFavorite,
    saveProgress,
    handleRemoveInProgress,
    setUserProgress,
    addInDoneRecipes,
    logout };
};

export default useUser;
