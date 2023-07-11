// função para alterar rota
export const handleStartRecipe = (recipeType, id, history, recipe) => {
  if (recipeType === 'meal') {
    history.push(`/meals/${id}/in-progress`);
  } else if (recipeType === 'drink') {
    history.push(`/drinks/${id}/in-progress`);
  }
  localStorage.setItem('inProgressRecipes', JSON.stringify(recipe));
};

// função para favoritar receita no LS

export const handleFavoriteRecipe = (recipe, id, recipeType) => {
  const { strMealThumb, strDrinkThumb } = recipe;

  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

  const isRecipeFavorited = favoriteRecipes.some(
    (favoriteRecipe) => favoriteRecipe.id === id && favoriteRecipe.type === recipeType,
  );

  let favoriteRecipesNew = [];

  if (isRecipeFavorited) {
    favoriteRecipesNew = [];
  } else {
    const { strArea, strCategory, strAlcoholic, strMeal, strDrink } = recipe;

    const favoriteRecipe = {
      id,
      type: recipeType === 'meal' ? 'meal' : 'drink',
      nationality: strArea || '',
      category: strCategory || '',
      alcoholicOrNot: strAlcoholic || '',
      name: strMeal || strDrink || '',
      image: strMealThumb || strDrinkThumb || '',
    };

    favoriteRecipesNew = [...favoriteRecipes, favoriteRecipe];
  }

  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesNew));
};
