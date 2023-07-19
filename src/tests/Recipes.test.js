import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import renderWithRouterAndProvider from './helpers/renderWithRouterAndProvider';
import App from '../App';
import { categoriesListMeals, dataBeef, dataChicken, dataMeals } from './helpers/data';

describe('Teste do componente Recipes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Ao renderizar, mostra as 12 primeira receitas de comidas retornadas', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(dataMeals)
        .mockResolvedValueOnce(categoriesListMeals),
    });

    renderWithRouterAndProvider(<App />, '/meals');

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    const nameRecipes = screen.getAllByTestId(/card-name/i);

    expect(global.fetch).toHaveBeenCalledTimes(2);

    nameRecipes.forEach((name, index) => {
      expect(name).toHaveTextContent(dataMeals.meals[index].strMeal);
    });
  });

  test('Teste se houver erro no fetch um erro aparece na tela', async () => {
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Failed to fetch'));

    renderWithRouterAndProvider(<App />, '/meals');

    expect(global.fetch).toHaveBeenCalledTimes(1);

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    const error = screen.getByText(/Failed to fetch/i);
    expect(error).toBeVisible();
  });

  test('Verifique se ao clicar em uma categoria as receitas são renderizadas corretamente', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(dataMeals)
        .mockResolvedValueOnce(categoriesListMeals)
        .mockResolvedValueOnce(dataBeef)
        .mockResolvedValueOnce(dataChicken)
        .mockResolvedValueOnce(dataMeals)
        .mockResolvedValueOnce(dataChicken)
        .mockResolvedValueOnce(dataMeals),
    });

    renderWithRouterAndProvider(<App />, '/meals');

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    const categoryBtns = screen.getAllByTestId(/category-filter/i);

    expect(categoryBtns.length).toBe(6);
    categoryBtns.forEach((category, index) => {
      if (index === 0) {
        expect(category).toHaveTextContent('All');
      } else {
        expect(category).toHaveTextContent(
          categoriesListMeals.meals[index - 1].strCategory,
        );
      }
    });

    act(() => {
      userEvent.click(categoryBtns[1]);
    });
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    let recipeCards = screen.getAllByTestId(/recipe-card/i);
    expect(recipeCards.length).toBe(12);
    recipeCards.forEach((recipe, index) => {
      expect(recipe).toHaveTextContent(dataBeef.meals[index].strMeal);
    });

    act(() => {
      userEvent.click(categoryBtns[3]);
    });
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    recipeCards = screen.getAllByTestId(/recipe-card/i);
    expect(recipeCards.length).toBe(12);
    recipeCards.forEach((recipe, index) => {
      expect(recipe).toHaveTextContent(dataChicken.meals[index].strMeal);
    });

    act(() => {
      userEvent.click(categoryBtns[0]);
    });
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    recipeCards = screen.getAllByTestId(/recipe-card/i);
    expect(recipeCards.length).toBe(12);
    recipeCards.forEach((recipe, index) => {
      expect(recipe).toHaveTextContent(dataMeals.meals[index].strMeal);
    });

    recipeCards = screen.getAllByTestId(/recipe-card/i);
    expect(recipeCards.length).toBe(12);
    recipeCards.forEach((recipe, index) => {
      expect(recipe).toHaveTextContent(dataMeals.meals[index].strMeal);
    });

    act(() => {
      userEvent.click(categoryBtns[3]);
    });
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    recipeCards = screen.getAllByTestId(/recipe-card/i);
    expect(recipeCards.length).toBe(12);
    recipeCards.forEach((recipe, index) => {
      expect(recipe).toHaveTextContent(dataChicken.meals[index].strMeal);
    });

    act(() => {
      userEvent.click(categoryBtns[3]);
    });
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    recipeCards = screen.getAllByTestId(/recipe-card/i);
    expect(recipeCards.length).toBe(12);
    recipeCards.forEach((recipe, index) => {
      expect(recipe).toHaveTextContent(dataMeals.meals[index].strMeal);
    });
  });
});
