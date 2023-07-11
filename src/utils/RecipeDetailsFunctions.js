// função para alterar rota
export const handleStartRecipe = (recipeType, id, history) => {
  if (recipeType === 'meal') {
    history.push(`/meals/${id}/in-progress`);
  } else if (recipeType === 'drink') {
    history.push(`/drinks/${id}/in-progress`);
  }
};

// função para favoritar receita no LS

export const handleFavoriteRecipe = (recipe, id, recipeType) => {
  const { strArea,
    strCategory, strAlcoholic, strMeal, strDrink, strMealThumb, strDrinkThumb } = recipe;

  const favoriteRecipe = {
    id,
    type: recipeType === 'meal' ? 'meal' : 'drink',
    nationality: strArea || '',
    category: strCategory || '',
    alcoholicOrNot: strAlcoholic || '',
    name: strMeal || strDrink || '',
    image: strMealThumb || strDrinkThumb || '',
    test: 'vai item',
  };

  let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  favoriteRecipes = [...favoriteRecipes, favoriteRecipe];
  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
};
