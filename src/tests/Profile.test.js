import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import renderWithRouterAndProvider from './helpers/renderWithRouterAndProvider';
import Profile from '../Pages/Profile';

const PROFILE_EMAIL = 'profile-email';
const DONE_BTN = 'profile-done-btn';
const FAVORITE_BTN = 'profile-favorite-btn';
const LOGOUT_BTN = 'profile-logout-btn';
const VALID_EMAIL = 'user@example.com';

describe('Teste do componente Profile', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify({ email: VALID_EMAIL }));
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('Verifica se o e-mail é exibido corretamente', () => {
    renderWithRouterAndProvider(<Profile />);
    const emailDisplay = screen.getByTestId(PROFILE_EMAIL);

    expect(emailDisplay).toHaveTextContent(VALID_EMAIL);
  });

  test('Verifica se a rota muda para /done-recipes ao clicar no botão Done Recipes', () => {
    const { history } = renderWithRouterAndProvider(<Profile />);

    const doneButton = screen.getByTestId(DONE_BTN);

    act(() => {
      userEvent.click(doneButton);
    });

    expect(history.location.pathname).toBe('/done-recipes');
  });

  test('Verifica se a rota muda para /favorite-recipes ao clicar no botão Favorite Recipes', () => {
    const { history } = renderWithRouterAndProvider(<Profile />);

    const favoriteButton = screen.getByTestId(FAVORITE_BTN);

    act(() => {
      userEvent.click(favoriteButton);
    });

    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  test('Verifica se o localStorage é limpo e a rota muda para / após clicar no botão Logout', () => {
    const { history } = renderWithRouterAndProvider(<Profile />);

    const logoutButton = screen.getByTestId(LOGOUT_BTN);

    act(() => {
      userEvent.click(logoutButton);
    });

    expect(localStorage.getItem('user')).toBeNull();
    expect(history.location.pathname).toBe('/');
  });

  test('Verifica se o componente lida corretamente quando não há usuário no localStorage', () => {
    localStorage.clear();

    renderWithRouterAndProvider(<Profile />);
    const emailDisplay = screen.getByTestId(PROFILE_EMAIL);

    expect(emailDisplay).toHaveTextContent('');
  });
});
