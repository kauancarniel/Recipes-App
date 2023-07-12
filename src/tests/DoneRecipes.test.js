import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import FavoriteRecipes from '../Pages/DoneRecipes';
import renderWithRouterAndProvider from './helpers/renderWithRouterAndProvider';

describe('FavoriteRecipes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  const recipe1 = {
    id: 1,
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
    id: 2,
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

  test('Deve exibir todas as receitas favoritas quando o filtro for "all"', () => {
    localStorage.setItem('doneRecipes', JSON.stringify([recipe1, recipe2]));

    renderWithRouterAndProvider(<FavoriteRecipes />);

    const recipe1Name = screen.getByTestId(name);
    const recipe2Name = screen.getByTestId(name2);

    expect(recipe1Name).toHaveTextContent('Recipe 1');
    expect(recipe2Name).toHaveTextContent('Recipe 2');
  });

  test('Deve exibir uma mensagem quando não houver receitas favoritas', () => {
    localStorage.removeItem('doneRecipes');

    renderWithRouterAndProvider(<FavoriteRecipes />);

    const emptyMessage = screen.getByText('Nenhuma receita favorita encontrada.');
    expect(emptyMessage).toBeInTheDocument();
  });

  test('Deve filtrar e exibir apenas as receitas de tipo "meal" quando o filtro for "meal"', () => {
    localStorage.setItem('doneRecipes', JSON.stringify([recipe1, recipe2]));

    renderWithRouterAndProvider(<FavoriteRecipes />);

    const filterButton = screen.getByTestId('filter-by-meal-btn');
    fireEvent.click(filterButton);

    const recipe1Name = screen.getByTestId(name);
    const recipe2Name = screen.queryByTestId(name2);

    expect(recipe1Name).toHaveTextContent('Recipe 1');
    expect(recipe2Name).toBeNull();
  });

  test('Deve filtrar e exibir apenas as receitas de tipo "drink" quando o filtro for "drink"', () => {
    localStorage.setItem('doneRecipes', JSON.stringify([recipe1, recipe2]));

    renderWithRouterAndProvider(<FavoriteRecipes />);

    const filterButton = screen.getByTestId('filter-by-drink-btn');
    fireEvent.click(filterButton);

    const recipe2Name = screen.getByTestId(name);
    const recipe1Name = screen.queryByTestId(name2);

    expect(recipe2Name).toHaveTextContent('Recipe 2');
    expect(recipe1Name).toBeNull();
  });
});
