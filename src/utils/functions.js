export const getStorage = (key) => JSON.parse(localStorage.getItem(key));
export const setStorage = (key, value) => localStorage
  .setItem(key, JSON.stringify(value));

export const handleChangeFavorite = (recipe, BASE_TYPE, BASE_KEY, isFavorite) => {
  console.log(isFavorite);
  let newFavoriteRecipes;
  const { strArea, strCategory, strAlcoholic } = recipe;
  const favoriteRecipes = getStorage('favoriteRecipes') || [];

  if (isFavorite) {
    const favoriteRecipe = {
      id: recipe[`id${BASE_KEY}`],
      type: BASE_TYPE,
      nationality: strArea || '',
      category: strCategory || '',
      alcoholicOrNot: strAlcoholic || '',
      name: recipe[`str${BASE_KEY}`],
      image: recipe[`str${BASE_KEY}Thumb`],
    };
    newFavoriteRecipes = [...favoriteRecipes, favoriteRecipe];
  } else {
    newFavoriteRecipes = favoriteRecipes.filter(
      ({ id, type }) => id !== recipe[`id${BASE_KEY}`] && type !== BASE_TYPE,
    );
  }
  setStorage('favoriteRecipes', newFavoriteRecipes);
};

export const handleSaveProgress = (id, NAME_URL, checkBoxes) => {
  const ingredients = Object.keys(checkBoxes).filter((key) => checkBoxes[key]);
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
  console.log(progressRecipes, id, NAME_URL);
  if (Object.keys(progressRecipes[NAME_URL]).length === 1) {
    delete progressRecipes[NAME_URL];
    console.log('entrei aqui');
  } else {
    delete progressRecipes[NAME_URL][id];
    console.log('entrei de cá');
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
    tags: strTags ? strTags.splice(0, 2) : [],
  };
  setStorage('doneRecipes', [...doneRecipes, newRecipe]);
};
