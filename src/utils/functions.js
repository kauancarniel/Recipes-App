export const handleChangeFavorite = (recipe, BASE_TYPE, BASE_KEY, isFavorite) => {
  console.log(isFavorite);
  let newFavoriteRecipes;
  const { strArea, strCategory, strAlcoholic } = recipe;
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

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
  localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
};
