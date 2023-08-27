import { v4 as uuidv4 } from 'uuid';
import md5 from 'md5';
// import { serverTimestamp } from 'firebase/firestore';
// import { postFirebase, uploadImage } from './firebase';
import { uploadImage } from './firebase';

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
const URL_RECIPES = `${process.env.REACT_APP_BASE_URL}/recipes`;

export const fetchAPI = async (pathname, optSearch, textSearch) => {
  const BASE_URL = pathname.includes('/meals')
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
    response = await fetch(`${URL_USERS}?email=${email}&password=${md5(password)}`);
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
  let photo = '';
  if (user.photo) {
    photo = await uploadImage(id, user.photo);
  }

  // const data = {
  //   id,
  //   name: user.name,
  //   email: user.email,
  //   password: md5(user.password),
  //   acceptCookies: user.acceptCookies,
  //   photo,
  //   dones: [],
  //   favorites: [],
  //   inProgress: {},
  //   score: 0,
  //   createAt: serverTimestamp(),
  // };
  // await postFirebase('users', id, data);
  await fetch(URL_USERS, {
    headers,
    method: 'POST',
    body: JSON.stringify({
      id,
      name: user.name,
      email: user.email,
      password: md5(user.password),
      acceptCookies: user.acceptCookies,
      photo,
      dones: [],
      favorites: [],
      inProgress: {},
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
  const response = await fetch(`${URL_USERS}?_sort=score&_order=desc`);
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

export const fetchDeleteComment = async (id, data) => {
  await fetch(`${URL_COMMENTS}/${id}`, {
    headers,
    method: 'DELETE',
  });
  data.forEach(async (comment) => {
    await fetch(URL_COMMENTS, {
      headers,
      method: 'POST',
      body: JSON.stringify(comment),
    });
  });
};

export const fetchPatchComment = async (id, data) => {
  await fetch(`${URL_COMMENTS}/${id}`, {
    headers,
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};

export const fetchUsersRecipes = async ({ id = null, key = null, value = null }) => {
  let response;
  if (!id && !key) response = await fetch(URL_RECIPES);
  response = id
    ? await fetch(`${URL_RECIPES}/${id}`)
    : await fetch(`${URL_RECIPES}?${key}=${value}`);
  const data = await response.json();
  return data;
};

const getQueryString = (params, values) => {
  return params.reduce((query, param, index) => {
    if (values[index]) {
      return `${query}&${param}=${values[index]}`;
    }
    return query;
  }, '');
};

export const fetchPublicRecipes = async (params, values) => {
  const query = (params && values) ? getQueryString(params, values) : '';
  const response = await fetch(`${URL_RECIPES}?strPublic=true${query}`);
  const data = await response.json();
  return data;
};

export const fetchPostRecipe = async (recipe) => {
  await fetch(URL_RECIPES, {
    headers,
    method: 'POST',
    body: JSON.stringify({ ...recipe, strCreateAt: new Date().toISOString() }),
  });
};

export const fetchDeleteRecipe = async (id) => {
  await fetch(`${URL_RECIPES}/${id}`, {
    headers,
    method: 'DELETE',
  });
};

export const fetchPatchRecipe = async (id, data) => {
  await fetch(`${URL_RECIPES}/${id}`, {
    headers,
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};
