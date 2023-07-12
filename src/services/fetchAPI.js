const keys = {
  ingredient: ['filter', 'i'],
  name: ['search', 's'],
  firstLetter: ['search', 'f'],
  details: ['lookup', 'i'],
  categoriesList: ['list', 'c'],
  category: ['filter', 'c'],
};

const fetchAPI = async (pathname, optSearch, textSearch) => {
  const BASE_URL = pathname === '/meals'
    ? 'https://www.themealdb.com/api/json/v1/1'
    : 'https://www.thecocktaildb.com/api/json/v1/1';
  const response = await fetch(
    `${BASE_URL}/${keys[optSearch][0]}.php?${keys[optSearch][1]}=${textSearch}`,
  );
  const data = await response.json();
  return data[pathname.split('/')[1]];
};

export default fetchAPI;
