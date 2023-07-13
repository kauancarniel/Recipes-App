import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import renderWithRouterAndProvider from './helpers/renderWithRouterAndProvider';
import App from '../App';
import { categoriesListDrinks, categoriesListMeals, dataDrinks, dataMeals } from './helpers/data';

describe('Teste do componente Footer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('redireciona para a página "/drinks" ao clicar no botão de drinks a partir de "/meals"', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(dataMeals)
        .mockResolvedValueOnce(categoriesListMeals)
        .mockResolvedValueOnce(dataDrinks)
        .mockResolvedValueOnce(categoriesListDrinks),
    });

    const { history } = renderWithRouterAndProvider(<App />, '/meals');

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    const drinksButton = screen.getByTestId('drinks-bottom-btn');

    act(() => {
      userEvent.click(drinksButton);
    });

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    expect(history.location.pathname).toBe('/drinks');
  });

  test('redireciona para a página "/meals" ao clicar no botão de meals a partir de /drinks', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(dataDrinks)
        .mockResolvedValueOnce(categoriesListDrinks)
        .mockResolvedValueOnce(dataMeals)
        .mockResolvedValueOnce(categoriesListMeals),
    });

    const { history } = renderWithRouterAndProvider(<App />, '/drinks');

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    const mealsButton = screen.getByTestId('meals-bottom-btn');

    act(() => {
      userEvent.click(mealsButton);
    });

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    expect(history.location.pathname).toBe('/meals');
  });
});
