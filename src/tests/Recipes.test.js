import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';

import renderWithRouterAndProvider from './helpers/renderWithRouterAndProvider';
import App from '../App';
import { categoriesListMeals, dataMeals } from './helpers/data';

describe('Teste do componente Recipes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Ao renderizar, mostra as 12 primeira receitas retornadas', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(dataMeals)
        .mockResolvedValueOnce(categoriesListMeals),
    });

    renderWithRouterAndProvider(<App />, '/meals');

    expect(global.fetch).toHaveBeenCalledTimes(1);

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    const recipes = screen.getAllByTestId(/recipe-card/i);
    const nameRecipes = screen.getAllByTestId(/card-name/i);

    expect(recipes.length).toBe(12);
    for (let index = 0; index < 12; index += 1) {
      expect(nameRecipes[index]).toHaveTextContent(dataMeals.meals[index].strMeal);
    }
  });

  test('Teste se houver erro no fetch um erro aparece na tela', async () => {
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Failed to fetch'));

    renderWithRouterAndProvider(<App />, '/meals');

    expect(global.fetch).toHaveBeenCalledTimes(1);

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    const error = screen.getByText(/Failed to fetch/i);
    expect(error).toBeVisible();
  });
});
