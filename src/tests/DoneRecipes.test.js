import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import copy from 'clipboard-copy';
import { act } from 'react-dom/test-utils';

import renderWithRouterAndProvider from './helpers/renderWithRouterAndProvider';
import App from '../App';

jest.mock('clipboard-copy');

describe('DoneRecipes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  const recipe1 = {
    id: '1',
    name: 'Recipe 1',
    type: 'meal',
    image: 'recipe1.jpg',
    date: '2023-07-12',
    nationality: 'Brazilian',
    category: 'Main Course',
    alcoholicOrNot: '',
    doneDate: '2023-07-10',
    tags: ['Easy', 'Delicious'],
  };
  const recipe2 = {
    id: '2',
    name: 'Recipe 2',
    type: 'drink',
    image: 'recipe2.jpg',
    date: '2023-07-11',
    nationality: 'Italian',
    category: 'Dessert',
    alcoholicOrNot: 'Alcoholic',
    doneDate: '2023-07-09',
    tags: ['Sweet', 'Refreshing'],
  };

  const name = '0-horizontal-name';
  const name2 = '1-horizontal-name';
  const image = '0-horizontal-image';
  const filterMealBtn = 'filter-by-meal-btn';
  const filterDrinkBtn = 'filter-by-drink-btn';
  const route = '/done-recipes';

  test('Deve exibir todas as receitas favoritas quando o filtro for "all"', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify([recipe1, recipe2]));

    renderWithRouterAndProvider(<App />, route);

    const recipe1Name = screen.getByTestId(name);
    const recipe2Name = screen.getByTestId(name2);

    expect(recipe1Name).toHaveTextContent('Recipe 1');
    expect(recipe2Name).toHaveTextContent('Recipe 2');
  });

  test('Deve exibir uma mensagem quando não houver receitas feitas', async () => {
    localStorage.removeItem('doneRecipes');

    renderWithRouterAndProvider(<App />, route);

    const emptyMessage = screen.getByText('Nenhuma receita feita encontrada.');
    expect(emptyMessage).toBeInTheDocument();
  });

  test('Deve filtrar e exibir apenas as receitas de tipo "meal" quando o filtro for "meal"', () => {
    localStorage.setItem('doneRecipes', JSON.stringify([recipe1, recipe2]));

    renderWithRouterAndProvider(<App />, route);

    const filterButton = screen.getByTestId(filterMealBtn);
    fireEvent.click(filterButton);

    const recipe1Name = screen.getByTestId(name);
    const recipe2Name = screen.queryByTestId(name2);

    expect(recipe1Name).toHaveTextContent('Recipe 1');
    expect(recipe2Name).toBeNull();
  });

  test('Deve filtrar e exibir apenas as receitas de tipo "drink" quando o filtro for "drink"', () => {
    localStorage.setItem('doneRecipes', JSON.stringify([recipe1, recipe2]));

    renderWithRouterAndProvider(<App />, route);

    const filterButton = screen.getByTestId(filterDrinkBtn);
    fireEvent.click(filterButton);

    const recipe2Name = screen.getByTestId(name);
    const recipe1Name = screen.queryByTestId(name2);

    expect(recipe2Name).toHaveTextContent('Recipe 2');
    expect(recipe1Name).toBeNull();
  });

  test('Verifica botão de copiar e verifica se o texto foi copiado', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify([recipe1, recipe2]));

    const copyMock = copy.mockImplementation(() => {});

    renderWithRouterAndProvider(<App />, route);

    const copyButton = screen.getByTestId('1-horizontal-share-btn');
    act(() => {
      fireEvent.click(copyButton);
    });
    await waitFor(() => {
      expect(screen.getByTestId('link')).toHaveTextContent(/Link Copied/i);
      expect(copyMock).toHaveBeenCalledWith('http://localhost/drinks/2');
    });
  });

  test('Deve redirecionar para a página correta ao clicar em nome de receita', () => {
    localStorage.setItem('doneRecipes', JSON.stringify([recipe1, recipe2]));

    const { history } = renderWithRouterAndProvider(<App />, route);

    const recipe1Name = screen.getByTestId(name2);
    fireEvent.click(recipe1Name);

    expect(history.location.pathname).toBe('/drinks/2');
  });

  test('Deve redirecionar para a página correta ao clicar na imagem de receita', () => {
    localStorage.setItem('doneRecipes', JSON.stringify([recipe1, recipe2]));

    const { history } = renderWithRouterAndProvider(<App />, route);

    const recipe1Image = screen.getByTestId(image);
    fireEvent.click(recipe1Image);

    expect(history.location.pathname).toBe('/meals/1');
  });
});
