import { v4 as uuidv4 } from 'uuid';

const keys = {
  ingredient: ['filter', 'i'],
  name: ['search', 's'],
  firstLetter: ['search', 'f'],
  details: ['lookup', 'i'],
  categoriesList: ['list', 'c'],
  category: ['filter', 'c'],
};

const URL_USERS = `${process.env.REACT_APP_BASE_URL}/users?email=`;

export const fetchAPI = async (pathname, optSearch, textSearch) => {
  const BASE_URL = pathname === '/meals'
    ? 'https://www.themealdb.com/api/json/v1/1'
    : 'https://www.thecocktaildb.com/api/json/v1/1';
  const response = await fetch(
    `${BASE_URL}/${keys[optSearch][0]}.php?${keys[optSearch][1]}=${textSearch}`,
  );
  const data = await response.json();
  return data[pathname.split('/')[1]];
};

export const fetchUsers = async (email, password) => {
  let response;
  if (!password) {
    response = await fetch(`${URL_USERS}${email}`);
  } else {
    response = await fetch(`${URL_USERS}${email}&password=${password}`);
  }
  const data = await response.json();
  return data;
};

export const fetchNewUser = async (user) => {
  await fetch(`${process.env.REACT_APP_BASE_URL}/users`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      id: uuidv4(),
      ...user,
      doneRecipes: [],
      favoriteRecipes: [],
      inProgressRecipes: {},
      myRecipes: [],
      points: 0,
      createAt: new Date(),
    }),
  });
};

export const fetchUserPoints = async (user, email, newPoints) => {
  try {
    await fetch(`${process.env.REACT_APP_BASE_URL}/users/${email}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify({
        ...user,
        points: newPoints,
      }),
    });
  } catch (error) {
    throw new Error('Erro ao atualizar os pontos do usuário');
  }
};
