import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndProvider from './helpers/renderWithRouterAndProvider';
import { dataDrinks, dataMeals, recommendedDataMock } from './helpers/data';
import RecipeDetails from '../Pages/RecipeDetails';
import App from '../App';
import RecipeCarousel from '../components/RecipeCarousel';

describe('Teste do componente RecipeDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  jest.spyOn(global, 'fetch').mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce({ meals: recommendedDataMock }),
  });

  const startBtn = 'start-recipe-btn';

  test('Verifica se API recommended retorna', async () => {
    renderWithRouterAndProvider(
      <RecipeCarousel recommendations={ recommendedDataMock } />,
    );

    expect(screen.getByTestId('0-recommendation-card')).toBeInTheDocument();
    recommendedDataMock.slice(0, 5).forEach((item, index) => {
      expect(screen.getByTestId(`${index}-recommendation-card`)).toBeInTheDocument();
    });
  });

  test('Verifica se função é chamada', () => {
    const handleFavoriteRecipe = jest.fn();

    renderWithRouterAndProvider(<RecipeDetails
      handleFavoriteRecipe={ handleFavoriteRecipe }
    />);

    const favoriteButton = screen.getByTestId('favorite-btn');

    expect(favoriteButton).toBeInTheDocument();

    userEvent.click(favoriteButton);

    expect(handleFavoriteRecipe).toHaveBeenCalledTimes(0);
  });
  test('Verifica se vai para a rota correta ao clicar no botão start recipe para meals', async () => {
    jest.fn().mockResolvedValueOnce([dataMeals, dataDrinks]);
    const id = '52771';

    const { history } = renderWithRouterAndProvider(<App />, `/meals/${id}`);
    expect(history.location.pathname).toBe('/meals/52771');
    const startRecipeButton = screen.getByTestId(startBtn);
    userEvent.click(startRecipeButton);
    await waitFor(() => {
      expect(history.location.pathname).toBe(`/meals/${id}/in-progress`);
    });
  });

  test('Verifica se vai para a rota correta ao clicar no botão start recipe para drinks', async () => {
    jest.fn().mockResolvedValueOnce([dataMeals, dataDrinks]);
    const id = '52771';

    const { history } = renderWithRouterAndProvider(<App />, `/drinks/${id}`);
    expect(history.location.pathname).toBe('/drinks/52771');
    const startRecipeButton = screen.getByTestId(startBtn);
    userEvent.click(startRecipeButton);
    await waitFor(() => {
      expect(history.location.pathname).toBe(`/drinks/${id}/in-progress`);
    });
  });

  test('Verifica botão de copiar e verifica se o texto foi copiado', async () => {
    jest.fn().mockResolvedValueOnce([dataMeals, dataDrinks]);
    const id = '52771';
    renderWithRouterAndProvider(<RecipeDetails />, `/meals/${id}`);
    const copyButton = screen.getByTestId('share-btn');
    const link = screen.getByTestId('link');
    expect(link).not.toHaveTextContent(/Link Copied/i);
    delete window.location;
    window.location = { href: `http://localhost/meals/${id}` };
    const mockCopy = jest.fn();
    Object.assign(navigator, { clipboard: { writeText: mockCopy } });
    userEvent.click(copyButton);
    await waitFor(() => {
      expect(mockCopy).toHaveBeenCalledWith(`http://localhost/meals/${id}`);
    });
    expect(link).toHaveTextContent(/Link Copied/i);
  });

  test('Verifica localStorage de favoriteRecipes', () => {
    const favoriteRecipess = [
      { id: '52771', type: 'meal' },
    ];
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipess));

    const { getByTestId } = renderWithRouterAndProvider(<RecipeDetails />);
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

    const { getByTestId } = renderWithRouterAndProvider(<App />, '/drinks/178319/');
    const startRecipeButton = getByTestId('start-recipe-btn');

    await waitFor(() => {
      expect(startRecipeButton).toHaveTextContent('Continue Recipe');
    });
  });
});
