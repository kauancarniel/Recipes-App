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

  const saveProgress = async (key, NAME_URL, checkBoxes) => {
    const ingredients = Object.values(checkBoxes).filter((value) => value !== '');
    const { inProgress, id } = userLogged;
    const newProgressRecipes = {
      ...inProgress,
      [NAME_URL]: {
        ...inProgress[NAME_URL],
        [key]: ingredients,
      },
    };
    setUserLogged({ ...userLogged, inProgress: newProgressRecipes });
    await patchUser(id, 'inProgress', newProgressRecipes);
  };

  return { validateCookie, changeFavorite, saveProgress, logout };
};

export default useUser;
