import React from 'react';
import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { act } from 'react-dom/test-utils';
import renderWithRouterAndProvider from './helpers/renderWithRouterAndProvider';
import { dataMeals, dataDrinks } from './helpers/data';
import App from '../App';
import { getStorage } from '../utils/functions';

const routeMeal = '/meals/53060/in-progress';
const routeDrink = '/drinks/17222/in-progress';

describe('Teste da page RecipeInProgress', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('Se todos os elementos de meal são renderizados', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn()
        .mockResolvedValue({ meals: [dataMeals.meals[1]] }),
    });

    renderWithRouterAndProvider(<App />, routeMeal);

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    const image = screen.getByTestId(/recipe-photo/i);
    const title = screen.getByTestId(/recipe-title/i);
    const category = screen.getByTestId(/recipe-category/i);
    const checkIngredients = screen.getAllByTestId(/ingredient-step/i);
    const instructions = screen.getByTestId(/instructions/i);
    const video = screen.getByTestId(/video/i);
    const recommended = screen.queryByTestId(/recomendation-card/i);
    const finishBtn = screen.getByTestId(/finish-recipe-btn/i);
    const linkCopy = screen.queryByTestId(/link/i);

    expect(image).toHaveAttribute('src', dataMeals.meals[1].strMealThumb);
    expect(title).toHaveTextContent(dataMeals.meals[1].strMeal);
    expect(category).toHaveTextContent(dataMeals.meals[1].strCategory);
    expect(checkIngredients.length).toBe(6);
    checkIngredients.forEach((ingredient, index) => {
      expect(ingredient)
        .toHaveTextContent(dataMeals.meals[1][`strIngredient${index + 1}`]);
      expect(ingredient.firstChild).toHaveAttribute('type', 'checkbox');
    });
    expect(instructions).toHaveTextContent(dataMeals.meals[1].strInstructions);
    expect(video.lastChild).toHaveAttribute('src', 'https://www.youtube.com/embed/YsJXZwE5pdY');
    expect(recommended).not.toBeInTheDocument();
    expect(linkCopy).not.toBeInTheDocument();
    await waitFor(() => expect(finishBtn).toBeDisabled());
  });

  test('Se todos os elementos de drink são renderizados', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn()
        .mockResolvedValue({ drinks: [dataDrinks.drinks[1]] }),
    });

    renderWithRouterAndProvider(<App />, routeDrink);

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    const image = screen.getByTestId(/recipe-photo/i);
    const title = screen.getByTestId(/recipe-title/i);
    const category = screen.getByTestId(/recipe-category/i);
    const checkIngredients = screen.getAllByTestId(/ingredient-step/i);
    const instructions = screen.getByTestId(/instructions/i);
    const video = screen.queryByTestId(/video/i);
    const recommended = screen.queryByTestId(/recomendation-card/i);
    const finishBtn = screen.getByTestId(/finish-recipe-btn/i);
    const linkCopy = screen.queryByTestId(/link/i);

    expect(image).toHaveAttribute('src', dataDrinks.drinks[1].strDrinkThumb);
    expect(title).toHaveTextContent(dataDrinks.drinks[1].strDrink);
    expect(category).toHaveTextContent(dataDrinks.drinks[1].strAlcoholic);
    expect(checkIngredients.length).toBe(4);
    checkIngredients.forEach((ingredient, index) => {
      expect(ingredient)
        .toHaveTextContent(dataDrinks.drinks[1][`strIngredient${index + 1}`]);
      expect(ingredient.firstChild).toHaveAttribute('type', 'checkbox');
    });
    expect(instructions).toHaveTextContent(dataDrinks.drinks[1].strInstructions);
    expect(video).not.toBeInTheDocument();
    expect(recommended).not.toBeInTheDocument();
    expect(linkCopy).not.toBeInTheDocument();
    await waitFor(() => expect(finishBtn).toBeDisabled());
  });

  test('Se ao clicar em nos input os textos são riscados, o item salvo no localStorage e só após todos os inputs marcados o botão de finalizar receita é habilitado', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn()
        .mockResolvedValue({ drinks: [dataDrinks.drinks[1]] }),
    });

    renderWithRouterAndProvider(<App />, routeDrink);

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    const checkIngredients = screen.getAllByTestId(/ingredient-step/i);
    const finishBtn = screen.getByTestId(/finish-recipe-btn/i);

    expect(checkIngredients[0].firstChild).not.toBeChecked();
    expect(checkIngredients[0]).toHaveStyle('text-decoration: none');
    userEvent.click(checkIngredients[0].firstChild);
    expect(checkIngredients[0].firstChild).toBeChecked();
    expect(checkIngredients[0]).toHaveStyle('text-decoration: line-through');

    expect(checkIngredients[1].firstChild).not.toBeChecked();
    expect(checkIngredients[1]).toHaveStyle('text-decoration: none');
    userEvent.click(checkIngredients[1].firstChild);
    expect(checkIngredients[1].firstChild).toBeChecked();
    expect(checkIngredients[1]).toHaveStyle('text-decoration: line-through');

    expect(checkIngredients[2].firstChild).not.toBeChecked();
    expect(checkIngredients[2]).toHaveStyle('text-decoration: none');
    userEvent.click(checkIngredients[2].firstChild);
    expect(checkIngredients[2].firstChild).toBeChecked();
    expect(checkIngredients[2]).toHaveStyle('text-decoration: line-through');

    expect(checkIngredients[3].firstChild).not.toBeChecked();
    expect(checkIngredients[3]).toHaveStyle('text-decoration: none');
    userEvent.click(checkIngredients[3].firstChild);
    expect(checkIngredients[3].firstChild).toBeChecked();
    expect(checkIngredients[3]).toHaveStyle('text-decoration: line-through');

    expect(finishBtn).toBeEnabled();
  });

  test('Se ao clicar no botão de finalizar receita o localStorage é atualizado e o usuário é redirecionado para a tela de receitas feitas', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn()
        .mockResolvedValue({ drinks: [dataDrinks.drinks[1]] }),
    });

    const { history } = renderWithRouterAndProvider(<App />, routeDrink);

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    const checkIngredients = screen.getAllByTestId(/ingredient-step/i);
    const finishBtn = screen.getByTestId(/finish-recipe-btn/i);

    checkIngredients.forEach(async (ingredient) => {
      act(() => {
        userEvent.click(ingredient.firstChild);
      });
    });
    act(() => {
      userEvent.click(finishBtn);
    });

    await waitFor(() => expect(history.location.pathname).toBe('/done-recipes'));

    const doneRecipes = getStorage('doneRecipes');
    expect(doneRecipes).toMatchObject([{
      id: dataDrinks.drinks[1].idDrink,
      name: dataDrinks.drinks[1].strDrink,
      type: 'drink',
      image: dataDrinks.drinks[1].strDrinkThumb,
      alcoholicOrNot: dataDrinks.drinks[1].strAlcoholic,
      category: dataDrinks.drinks[1].strCategory,
      nationality: '',
      tags: [],
    }]);
  });
});
