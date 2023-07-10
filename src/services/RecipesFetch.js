const SEARCH_MEALS_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const SEARCH_DRINKS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const RecipesFetch = async (type) => {
  const response = await fetch(type === 'meals' ? SEARCH_MEALS_URL : SEARCH_DRINKS_URL);
  const { meals, drinks } = await response.json();
  return type === 'meals' ? meals : drinks;
};

export default RecipesFetch;
