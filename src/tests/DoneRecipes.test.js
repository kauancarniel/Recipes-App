import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import DoneRecipes from '../Pages/DoneRecipes';
import renderWithRouterAndProvider from './helpers/renderWithRouterAndProvider';

jest.mock('clipboard-copy');

describe('DoneRecipes', () => {
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
  const image = '0-horizontal-image';
  const filterMealBtn = 'filter-by-meal-btn';
  const filterDrinkBtn = 'filter-by-drink-btn';
  const shareBtn = '0-horizontal-share-btn';

  test('Deve exibir todas as receitas favoritas quando o filtro for "all"', () => {
    localStorage.setItem('doneRecipes', JSON.stringify([recipe1, recipe2]));

    renderWithRouterAndProvider(<DoneRecipes />);

    const recipe1Name = screen.getByTestId(name);
    const recipe2Name = screen.getByTestId(name2);

    expect(recipe1Name).toHaveTextContent('Recipe 1');
    expect(recipe2Name).toHaveTextContent('Recipe 2');
  });

  test('Deve exibir uma mensagem quando não houver receitas favoritas', () => {
    localStorage.removeItem('doneRecipes');

    renderWithRouterAndProvider(<DoneRecipes />);

    const emptyMessage = screen.getByText('Nenhuma receita favorita encontrada.');
    expect(emptyMessage).toBeInTheDocument();
  });

  test('Deve filtrar e exibir apenas as receitas de tipo "meal" quando o filtro for "meal"', () => {
    localStorage.setItem('doneRecipes', JSON.stringify([recipe1, recipe2]));

    renderWithRouterAndProvider(<DoneRecipes />);

    const filterButton = screen.getByTestId(filterMealBtn);
    fireEvent.click(filterButton);

    const recipe1Name = screen.getByTestId(name);
    const recipe2Name = screen.queryByTestId(name2);

    expect(recipe1Name).toHaveTextContent('Recipe 1');
    expect(recipe2Name).toBeNull();
  });

  test('Deve filtrar e exibir apenas as receitas de tipo "drink" quando o filtro for "drink"', () => {
    localStorage.setItem('doneRecipes', JSON.stringify([recipe1, recipe2]));

    renderWithRouterAndProvider(<DoneRecipes />);

    const filterButton = screen.getByTestId(filterDrinkBtn);
    fireEvent.click(filterButton);

    const recipe2Name = screen.getByTestId(name);
    const recipe1Name = screen.queryByTestId(name2);

    expect(recipe2Name).toHaveTextContent('Recipe 2');
    expect(recipe1Name).toBeNull();
  });

  test('Deve redirecionar para a página correta ao clicar em nome de receita', () => {
    localStorage.setItem('doneRecipes', JSON.stringify([recipe1, recipe2]));

    const { history } = renderWithRouterAndProvider(<DoneRecipes />);

    const recipe1Name = screen.getByTestId(name);
    fireEvent.click(recipe1Name);

    expect(history.location.pathname).toBe('/meals/1');
  });

  test('Deve redirecionar para a página correta ao clicar na imagem de receita', () => {
    localStorage.setItem('doneRecipes', JSON.stringify([recipe1, recipe2]));

    const { history } = renderWithRouterAndProvider(<DoneRecipes />);

    const recipe1Image = screen.getByTestId(image);
    fireEvent.click(recipe1Image);

    expect(history.location.pathname).toBe('/meals/1');
  });

  test('Texto de link de receita deve aparecer ao clicar no botão de compartilhar', () => {
    localStorage.setItem('doneRecipes', JSON.stringify([recipe1, recipe2]));

    renderWithRouterAndProvider(<DoneRecipes />);

    const link = screen.getByTestId('link');
    expect(link).not.toHaveTextContent('Link copied!');

    const btnShare = screen.getByTestId(shareBtn);
    fireEvent.click(btnShare);

    expect(link).toHaveTextContent('Link copied!');
  });
});
