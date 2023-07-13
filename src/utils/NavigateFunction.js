export const redirectToRecipe = (recipe, history) => {
  history.push(`${recipe.type}s/${recipe.id}`);
};
