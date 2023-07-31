import Swal from 'sweetalert2';

const HOURS = 3;

export const initialIngredients = (ingredients) => ingredients
  .reduce((obj, [key]) => ({
    ...obj,
    [key]: '',
  }), {});

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

export const setCookie = (key, id) => {
  const date = new Date();
  date.setHours(date.getHours() + HOURS);
  document.cookie = `${key}=${(id)};expires=${date.toGMTString()};path=/`;
};

export const getCookie = (key) => {
  const cookies = document.cookie.split(';');
  const cookie = cookies.find((c) => c.includes(key));
  return cookie ? cookie.split('=')[1] : null;
};

export const deleteCookie = (key) => {
  document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
};
