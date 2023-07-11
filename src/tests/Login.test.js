import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import renderWithRouterAndProvider from './helpers/renderWithRouterAndProvider';
import App from '../App';
import { dataMeals } from './helpers/data';

// Constantes para strings duplicadas
const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const SUBMIT_BTN = 'login-submit-btn';
const VALID_EMAIL = 'user@example.com';
const VALID_PASSWORD = '1234567';

describe('Teste do componente Login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Verifica se o e-mail é salvo no localStorage após a submissão do formulário', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(dataMeals),
    });

    renderWithRouterAndProvider(<App />);

    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    const submitButton = screen.getByTestId(SUBMIT_BTN);

    act(() => {
      userEvent.type(emailInput, VALID_EMAIL);
      userEvent.type(passwordInput, VALID_PASSWORD);
      userEvent.click(submitButton);
    });

    await waitForElementToBeRemoved(() => screen.getByText(/Loading/i));

    expect(JSON.parse(localStorage.getItem('user'))).toEqual({ email: VALID_EMAIL });
  });

  test('Verifica se a rota muda para a tela principal de receitas de comidas após a submissão bem-sucedida', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(dataMeals),
    });

    const { history } = renderWithRouterAndProvider(<App />);

    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    const submitButton = screen.getByTestId(SUBMIT_BTN);

    act(() => {
      userEvent.type(emailInput, VALID_EMAIL);
      userEvent.type(passwordInput, VALID_PASSWORD);
      userEvent.click(submitButton);
    });

    await waitForElementToBeRemoved(() => screen.getByText(/Loading/i));

    expect(history.location.pathname).toBe('/meals');
  });
});
