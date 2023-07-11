import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import renderWithRouterAndProvider from './helpers/renderWithRouterAndProvider';
import App from '../App';
import { dataDrinks, dataMeals } from './helpers/data';

const VALID_EMAIL = 'user@example.com';
const VALID_PASSWORD = '1234567';

describe('Teste do componente Footer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('redireciona para a página "/drinks" ao clicar no botão de drinks a partir de "/meals"', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(dataMeals)
        .mockResolvedValue(dataDrinks),
    });

    const { history } = renderWithRouterAndProvider(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const submitButton = screen.getByTestId('login-submit-btn');

    act(() => {
      userEvent.type(emailInput, VALID_EMAIL);
      userEvent.type(passwordInput, VALID_PASSWORD);
      userEvent.click(submitButton);
    });

    const drinksButton = await screen.findByTestId('drinks-bottom-btn');

    act(() => {
      userEvent.click(drinksButton);
    });

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    expect(history.location.pathname).toBe('/drinks');
  });

  test('redireciona para a página "/meals" ao clicar no botão de meals a partir de /drinks', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(dataDrinks)
        .mockResolvedValue(dataMeals),
    });

    const { history } = renderWithRouterAndProvider(<App />, '/drinks');

    const mealsButton = await screen.findByTestId('meals-bottom-btn');

    act(() => {
      userEvent.click(mealsButton);
    });

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    expect(history.location.pathname).toBe('/meals');
  });
});
