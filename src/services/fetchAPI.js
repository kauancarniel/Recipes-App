import { v4 as uuidv4 } from 'uuid';

const keys = {
  ingredient: ['filter', 'i'],
  name: ['search', 's'],
  firstLetter: ['search', 'f'],
  details: ['lookup', 'i'],
  categoriesList: ['list', 'c'],
  category: ['filter', 'c'],
};

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const URL_USERS = `${process.env.REACT_APP_BASE_URL}/users`;
const URL_COMMENTS = `${process.env.REACT_APP_BASE_URL}/comments`;

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

export const fetchUserEmail = async (email, password) => {
  let response;
  if (!password) {
    response = await fetch(`${URL_USERS}?email=${email}`);
  } else {
    response = await fetch(`${URL_USERS}?email=${email}&password=${password}`);
  }
  const data = await response.json();
  return data;
};

export const fetchUserId = async (id) => {
  const response = await fetch(`${URL_USERS}/${id}`);
  const data = await response.json();
  return data;
};

export const fetchNewUser = async (user) => {
  const id = uuidv4();
  await fetch(URL_USERS, {
    headers,
    method: 'POST',
    body: JSON.stringify({
      id,
      ...user,
      dones: [],
      favorites: [],
      inProgress: {},
      my: [],
      score: 0,
      createAt: new Date().toISOString(),
    }),
  });
  return id;
};

export const fetchPatchUser = async (id, data) => {
  await fetch(`${URL_USERS}/${id}`, {
    headers,
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};

export const fetchRanking = async () => {
  const response = await fetch(`${URL_USERS}`);
  const data = await response.json();
  return data;
};

export const fetchComments = async (key, value) => {
  const response = await fetch(`${URL_COMMENTS}?${key}=${value}`);
  const data = await response.json();
  return data;
};

export const fetchPostComment = async (comment) => {
  await fetch(URL_COMMENTS, {
    headers,
    method: 'POST',
    body: JSON.stringify(comment),
  });
};
