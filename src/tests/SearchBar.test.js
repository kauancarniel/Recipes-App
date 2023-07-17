import React from 'react';
import { screen, waitForElementToBeRemoved, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouterAndProvider from './helpers/renderWithRouterAndProvider';
import App from '../App';
import { categoriesListDrinks, categoriesListMeals, dataDrinks, dataMeals, mockMeal1Length, mockDrink1Length, dataMealsNull } from './helpers/data';

describe('Teste do componente Recipes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('Verificando se o formulario de busca existe na tela', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(dataMeals)
        .mockResolvedValueOnce(categoriesListMeals),
    });

    renderWithRouterAndProvider(<App />, '/meals');

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    const showSearchBar = screen.getByTestId(/search-top-btn/i);

    userEvent.click(showSearchBar);

    const optIngredientSarch = screen.getByTestId(/ingredient-search-radio/i);
    const inputSearch = screen.getByTestId(/search-input/i);
    const buttonSearch = screen.getByTestId(/exec-search-btn/i);

    expect(optIngredientSarch).toBeInTheDocument();
    expect(inputSearch).toBeInTheDocument();
    expect(buttonSearch).toBeInTheDocument();
  });

  it('Testando um filtro', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(dataMeals)
        .mockResolvedValueOnce(categoriesListMeals),
    });

    renderWithRouterAndProvider(<App />, '/meals');

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    const showSearchBar = screen.getByTestId(/search-top-btn/i);
    userEvent.click(showSearchBar);

    const optNametSearch = screen.getByTestId(/name-search-radio/i);
    const inputSearch = screen.getByTestId(/search-input/i);
    const buttonSearch = screen.getByTestId(/exec-search-btn/i);

    userEvent.click(optNametSearch);
    userEvent.type(inputSearch, 'soup');
    userEvent.click(buttonSearch);

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    const recipes = screen.getAllByRole('img');

    expect(recipes).toHaveLength(4);
  });

  it('Testa se um alert aparece quando a busca do first letter é feita com mais de 1 letra', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(dataMeals)
        .mockResolvedValueOnce(categoriesListMeals),
    });
    const alert = jest.spyOn(global, 'alert');

    renderWithRouterAndProvider(<App />, '/meals');

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    const showSearchBar = screen.getByTestId(/search-top-btn/i);
    userEvent.click(showSearchBar);

    const optFirstLettertSearch = screen.getByTestId(/first-letter-search-radio/i);
    const inputSearch = screen.getByTestId(/search-input/i);
    const buttonSearch = screen.getByTestId(/exec-search-btn/i);

    userEvent.click(optFirstLettertSearch);
    userEvent.type(inputSearch, '123');
    userEvent.click(buttonSearch);

    expect(alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
    expect(alert).toHaveBeenCalledTimes(1);
  });

  it('Testa se o usuario é levado para a pagina de detalhes quando a busca de comida resulta em 1 receita', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(dataMeals)
        .mockResolvedValueOnce(categoriesListMeals)
        .mockResolvedValueOnce(mockMeal1Length),
    });

    const { history } = renderWithRouterAndProvider(<App />, '/meals');

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    const showSearchBar = screen.getByTestId(/search-top-btn/i);
    userEvent.click(showSearchBar);

    const optNametSearch = screen.getByTestId(/name-search-radio/i);
    const inputSearch = screen.getByTestId(/search-input/i);
    const buttonSearch = screen.getByTestId(/exec-search-btn/i);

    userEvent.click(optNametSearch);
    userEvent.type(inputSearch, 'Moussaka');
    userEvent.click(buttonSearch);

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals/53006');
    });
  });

  it('Testa se o usuario é levado para a pagina de detalhes quando a busca de drinks resulta em 1 receita', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(dataDrinks)
        .mockResolvedValueOnce(categoriesListDrinks)
        .mockResolvedValueOnce(mockDrink1Length),
    });

    const { history } = renderWithRouterAndProvider(<App />, '/drinks');

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    const showSearchBar = screen.getByTestId(/search-top-btn/i);
    userEvent.click(showSearchBar);

    const optNametSearch = screen.getByTestId(/name-search-radio/i);
    const inputSearch = screen.getByTestId(/search-input/i);
    const buttonSearch = screen.getByTestId(/exec-search-btn/i);

    userEvent.click(optNametSearch);
    userEvent.type(inputSearch, 'GG');
    userEvent.click(buttonSearch);

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/15997');
    });
  });

  it('Testa se um alert aparece quando a busca não resulta em nenhuma receita', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(dataMeals)
        .mockResolvedValueOnce(categoriesListMeals)
        .mockResolvedValueOnce(dataMealsNull),
    });
    const alert = jest.spyOn(global, 'alert');

    renderWithRouterAndProvider(<App />, '/meals');

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    const showSearchBar = screen.getByTestId(/search-top-btn/i);
    userEvent.click(showSearchBar);

    const optNametSearch = screen.getByTestId(/name-search-radio/i);
    const inputSearch = screen.getByTestId(/search-input/i);
    const buttonSearch = screen.getByTestId(/exec-search-btn/i);

    userEvent.click(optNametSearch);
    userEvent.type(inputSearch, 'ytyjejetytyjejtyyjtjtytyjtyjejtyetyj');
    userEvent.click(buttonSearch);

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    await waitFor(() => {
      expect(alert).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.');
      expect(alert).toHaveBeenCalledTimes(1);
    });
  });
});
