export const getStorage = (key) => JSON.parse(localStorage.getItem(key));
export const setStorage = (key, value) => localStorage
  .setItem(key, JSON.stringify(value));

export const initialIngredients = (ingredients, usedIngredients) => ingredients
  .reduce((obj, [key, value]) => ({
    ...obj,
    [key]: usedIngredients.includes(value) ? value : '',
  }), {});

export const verifyFavorite = (idRecipe, BASE_TYPE) => {
  const favoriteRecipes = getStorage('favoriteRecipes') || [];
  return favoriteRecipes.some(({ id, type }) => id === idRecipe && type === BASE_TYPE);
};

export const changeFavorite = (recipe, BASE_TYPE, isFavorite) => {
  let newFavoriteRecipes;
  const { id, type, nationality, category, alcoholicOrNot, name, image } = recipe;
  const favoriteRecipes = getStorage('favoriteRecipes') || [];

  if (isFavorite) {
    const favoriteRecipe = {
      id,
      type,
      nationality,
      category,
      alcoholicOrNot,
      name,
      image,
    };
    newFavoriteRecipes = [...favoriteRecipes, favoriteRecipe];
  } else {
    newFavoriteRecipes = favoriteRecipes.filter(
      ({ id: favId, type: favType }) => favId !== id && favType !== BASE_TYPE,
    );
  }
  setStorage('favoriteRecipes', newFavoriteRecipes);
  return newFavoriteRecipes;
};

export const handleSaveProgress = (id, NAME_URL, checkBoxes) => {
  const ingredients = Object.values(checkBoxes).filter((value) => value !== '');
  const progressRecipes = getStorage('inProgressRecipes') || {};
  const newProgressRecipes = {
    ...progressRecipes,
    [NAME_URL]: {
      ...progressRecipes[NAME_URL],
      [id]: ingredients,
    },
  };
  setStorage('inProgressRecipes', newProgressRecipes);
};

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
  const isInDone = doneRecipes
    .some(({ id, type }) => id === recipe[`id${BASE_KEY}`] && type === BASE_TYPE);
  if (isInDone) return;
  const newRecipe = {
    id: recipe[`id${BASE_KEY}`],
    type: BASE_TYPE,
    nationality: strArea || '',
    category: strCategory || '',
    alcoholicOrNot: strAlcoholic || '',
    name: recipe[`str${BASE_KEY}`],
    image: recipe[`str${BASE_KEY}Thumb`],
    doneDate: new Date().toISOString(),
    tags: strTags ? strTags.split(',').splice(0, 2) : [],
  };
  setStorage('doneRecipes', [...doneRecipes, newRecipe]);
};
