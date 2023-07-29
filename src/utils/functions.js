import Swal from 'sweetalert2';

const HOURS = 3;

export const getStorage = (key) => JSON.parse(localStorage.getItem(key));
export const setStorage = (key, value) => localStorage
  .setItem(key, JSON.stringify(value));

export const initialIngredients = (ingredients, usedIngredients) => ingredients
  .reduce((obj, [key, value]) => ({
    ...obj,
    [key]: usedIngredients.includes(value) ? value : '',
  }), {});

export const handleRemoveInProgress = (id, NAME_URL) => {
  const progressRecipes = { ...getStorage('inProgressRecipes') };
  if (Object.keys(progressRecipes[NAME_URL]).length === 1) {
    delete progressRecipes[NAME_URL];
  } else {
    delete progressRecipes[NAME_URL][id];
  }
  setStorage('inProgressRecipes', progressRecipes);
};

export const addInDoneRecipes = (recipe, NAME_URL) => {
  const BASE_KEY = NAME_URL === 'meals' ? 'Meal' : 'Drink';
  const BASE_TYPE = NAME_URL === 'meals' ? 'meal' : 'drink';
  const { strArea, strCategory, strAlcoholic, strTags } = recipe;
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const newRecipe = {
    id: recipe[`id${BASE_KEY}`],
    type: BASE_TYPE,
    nationality: strArea || '',
    category: strCategory,
    alcoholicOrNot: strAlcoholic || '',
    name: recipe[`str${BASE_KEY}`],
    image: recipe[`str${BASE_KEY}Thumb`],
    doneDate: new Date().toISOString(),
    tags: strTags ? strTags.split(',').splice(0, 2) : [],
  };
  const newDoneRecipes = doneRecipes
    .filter(({ id, type }) => !(id === recipe[`id${BASE_KEY}`]
  && type === BASE_TYPE));

  setStorage('doneRecipes', [...newDoneRecipes, newRecipe]);
};

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

export const setCookie = (key, id) => {
  const date = new Date();
  date.setHours(date.getHours() + HOURS);
  document.cookie = `${key}=${(id)};expires=${date.toGMTString()};path=/`;
};

export const getCookie = (key) => {
  const cookies = document.cookie.split(';');
  const cookie = cookies.find((c) => c.includes(key));
  return cookie ? cookie.split('=')[1] : null;
};

export const deleteCookie = (key) => {
  document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
};

// export const verifyFavorite = (idRecipe, BASE_TYPE) => {
//   const { favorites } = getCookie('userLogged') || [];
//   return favorites.some(({ id, type }) => id === idRecipe && type === BASE_TYPE);
// };

// export const changeFavorite = (recipe, BASE_TYPE, isFavorite) => {
//   let newFavoriteRecipes;
//   const { id, type, nationality, category, alcoholicOrNot, name, image } = recipe;
//   const { favorites } = getCookie('userLogged') || [];

//   if (isFavorite) {
//     const favoriteRecipe = {
//       id,
//       type,
//       nationality,
//       category,
//       alcoholicOrNot,
//       name,
//       image,
//     };
//     newFavoriteRecipes = [...favorites, favoriteRecipe];
//   } else {
//     newFavoriteRecipes = favorites.filter(
//       ({ id: favId, type: favType }) => !(favId === id && favType === BASE_TYPE),
//     );
//   }
//   setStorage('favoriteRecipes', newFavoriteRecipes);
//   return newFavoriteRecipes;
// };
