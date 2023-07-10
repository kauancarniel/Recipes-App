const obj = {
  ingredient: ['filter', 'i'],
  name: ['search', 's'],
  firstLetter: ['search', 'f'],
};

const recipesFetch = async ({ pathname }, optSearch = 'name', textSearch = '') => {
  const BASE_URL = pathname === '/meals' ? 'https://www.themealdb.com/api/json/v1/1' : 'https://www.thecocktaildb.com/api/json/v1/1';
  const response = await fetch(
    `${BASE_URL}/${obj[optSearch][0]}.php?${obj[optSearch][1]}=${textSearch}`,
  );
  const data = await response.json();
  return data[pathname.pathname.split('/')[1]];
};

export default recipesFetch;
