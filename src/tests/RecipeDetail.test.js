import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndProvider from './helpers/renderWithRouterAndProvider';
import { dataDrinks, dataMeals } from './helpers/data';
import RecipeDetails from '../Pages/RecipeDetails';
import App from '../App';

describe('Teste do componente RecipeDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  const startBtn = 'start-recipe-btn';

  test('se vai para a rota correta ao clicar no botão start recipe para meals', async () => {
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

  test('se vai para a rota correta ao clicar no botão start recipe para drinks', async () => {
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

  test('testa botão de copiar e verifica se o texto foi copiado', async () => {
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
});
