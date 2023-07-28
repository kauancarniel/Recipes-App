import React from 'react';
import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouterAndProvider from './helpers/renderWithRouterAndProvider';
import { dataDrinks, dataMeals, recommendedDataMock } from './helpers/data';
import App from '../App';

const route = '/meals/52771';

describe('Teste do componente RecipeDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  const favoriteRecipess = [
    { id: '52771', type: 'meal' },
  ];

  const startBtn = 'start-recipe-btn';

  test('Verifica se API recommended retorna', async () => {
    jest.fn().mockResolvedValueOnce({ meals: recommendedDataMock });

    renderWithRouterAndProvider(<App />, route);

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i), { timeout: 4000 });

    recommendedDataMock.slice(7, 14).forEach((item, index) => {
      const title = screen.getByTestId(`${index}-recommendation-title`);
      expect(title).toHaveTextContent(item.strDrink);
    });
  });

  test('Verifica se vai para a rota correta ao clicar no botão start recipe para meals', async () => {
    jest.fn().mockResolvedValueOnce([dataMeals, dataDrinks]);

    const { history } = renderWithRouterAndProvider(<App />, route);
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i), { timeout: 4000 });
    expect(history.location.pathname).toBe(route);

    const startRecipeButton = screen.getByTestId(startBtn);
    userEvent.click(startRecipeButton);
    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals/52771/in-progress');
    });
  });

  test('Verifica se vai para a rota correta ao clicar no botão start recipe para drinks', async () => {
    jest.fn().mockResolvedValueOnce([dataMeals, dataDrinks]);
    const id = '15997';

    const { history } = renderWithRouterAndProvider(<App />, `/drinks/${id}`);
    expect(history.location.pathname).toBe('/drinks/15997');
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i), { timeout: 4000 });

    const startRecipeButton = screen.getByTestId(startBtn);
    userEvent.click(startRecipeButton);
    await waitFor(() => {
      expect(history.location.pathname).toBe(`/drinks/${id}/in-progress`);
    });
  });

  test('Verifica botão de copiar e verifica se o texto foi copiado', async () => {
    jest.fn().mockResolvedValueOnce([dataMeals, dataDrinks]);
    const id = '52771';
    renderWithRouterAndProvider(<App />, `/meals/${id}`);
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i), { timeout: 4000 });
    const copyButton = screen.getByTestId('share-btn');
    const mockCopy = jest.fn();
    Object.assign(navigator, { clipboard: { writeText: mockCopy } });
    userEvent.click(copyButton);
    const link = screen.getByTestId('link');
    await waitFor(() => {
      expect(mockCopy).toHaveBeenCalledWith(`http://localhost/meals/${id}`);
    });
    expect(link).toHaveTextContent(/Link Copied/i);
  });

  test('Verifica localStorage de favoriteRecipes', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipess));

    const { getByTestId } = renderWithRouterAndProvider(<App />, '/meals/52771');

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i), { timeout: 4000 });

    const favoriteButton = getByTestId('favorite-btn');

    expect(favoriteButton).toBeInTheDocument();
    expect(favoriteButton).toHaveAttribute('src');
  });

  test('Verifica localStorage de inProgressRecipes', async () => {
    const inProgressRecipes = {
      meals: {},
      drinks: {
        178319: [
          {
            id: '178319',
            type: 'drink',
            nationality: '',
            category: 'Cocktail',
            alcoholicOrNot: 'Alcoholic',
            name: 'Aquamarine',
            image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
            doneDate: '23/6/2020',
            tags: [],
          },
        ],
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));

    const { getByTestId } = renderWithRouterAndProvider(<App />, '/drinks/178319');

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i), { timeout: 4000 });

    const startRecipeButton = getByTestId(startBtn);

    await waitFor(() => {
      expect(startRecipeButton).toHaveTextContent('Continue Recipe');
    });
  });

  test('Verifica botão de start Recipe', async () => {
    const { getByTestId } = renderWithRouterAndProvider(<App />, route);

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i), { timeout: 4000 });

    const startRecipeButton = getByTestId(startBtn);
    expect(startRecipeButton).toHaveTextContent(/Start Recipe/i);
  });

  test('Verifica botão de favoritar', async () => {
    jest.fn().mockResolvedValueOnce([dataMeals, dataDrinks]);

    renderWithRouterAndProvider(<App />, route);

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i), { timeout: 4000 });

    const favoriteButton = screen.getByTestId('favorite-btn');

    expect(favoriteButton).toHaveAttribute('src', 'whiteHeartIcon.svg');

    userEvent.click(favoriteButton);

    expect(favoriteButton).toHaveAttribute('src', 'blackHeartIcon.svg');

    userEvent.click(favoriteButton);

    expect(favoriteButton).toHaveAttribute('src', 'whiteHeartIcon.svg');
  });
});
