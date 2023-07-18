import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndProvider from './helpers/renderWithRouterAndProvider';
import FavoriteRecipes from '../Pages/FavoriteRecipes';

describe('Teste do componente FavoriteRecipes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  const recipes = [
    {
      id: '1',
      name: 'Recipe 1',
      type: 'meal',
      image: 'recipe1.jpg',
      nationality: 'Italian',
      category: 'Pasta',
      alcoholicOrNot: '',
    },
    {
      id: '1',
      name: 'Recipe 1',
      type: 'drink',
      image: 'recipe1.jpg',
      nationality: 'Italian',
      category: 'Pasta',
      alcoholicOrNot: '',
    },
  ];

  test('verifica se deve renderizar as receitas favoritas e permitir filtrar por tipo', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(recipes));
    renderWithRouterAndProvider(<FavoriteRecipes />);

    const recipe1Name = screen.getByTestId('0-horizontal-name');
    const recipe2Name = screen.getByTestId('1-horizontal-name');
    expect(recipe1Name).toBeInTheDocument();
    expect(recipe2Name).toBeInTheDocument();

    const mealFilterBtn = screen.getByTestId('filter-by-meal-btn');
    userEvent.click(mealFilterBtn);

    expect(recipe1Name).toBeInTheDocument();
    expect(recipe2Name).not.toBeInTheDocument();
    const allFilterBtn = screen.getByTestId('filter-by-all-btn');
    userEvent.click(allFilterBtn);
    const secondName = screen.getByTestId('1-horizontal-name');
    expect(recipe1Name).toBeInTheDocument();
    expect(secondName).toBeInTheDocument();
  });

  test('verifica se exclui a receita favorita quando o botão de coração for clicado', () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify([recipes[0]]));

    renderWithRouterAndProvider(<FavoriteRecipes />);

    const recipe1Name = screen.getByTestId('0-horizontal-name');
    expect(recipe1Name).toBeInTheDocument();

    const deleteBtn = screen.getByTestId('0-horizontal-favorite-btn');
    userEvent.click(deleteBtn);

    expect(recipe1Name).not.toBeInTheDocument();
    expect(localStorage.getItem('favoriteRecipes')).toBe('[]');
  });
  test('verifica se copia o link da receita quando o botão de compartilhamento for clicado', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(recipes));

    renderWithRouterAndProvider(<FavoriteRecipes />);

    const recipe1ShareBTN = screen.getByTestId('0-horizontal-share-btn');
    const recipe2ShareBTN = screen.getByTestId('1-horizontal-share-btn');
    const link = screen.getByTestId('link');

    expect(link).not.toHaveTextContent(/Link Copied/i);

    const mockCopy = jest.fn();
    Object.assign(navigator, { clipboard: { writeText: mockCopy } });

    userEvent.click(recipe1ShareBTN);

    await waitFor(() => {
      expect(mockCopy).toHaveBeenCalledWith('http://localhost:3000/meals/1');
    });

    expect(link).toHaveTextContent(/Link Copied/i);

    userEvent.click(recipe2ShareBTN);

    await waitFor(() => {
      expect(mockCopy).toHaveBeenCalledWith('http://localhost:3000/drinks/1');
    });
  });

  test('verifica se vai para page meals/id', () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(recipes));
    const { history } = renderWithRouterAndProvider(<FavoriteRecipes />);
    const image = screen.getByTestId('0-horizontal-image');
    userEvent.click(image);
    expect(history.location.pathname).toBe('/meals/1');
  });

  test('verifica se vai para page drinks/id', () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify([recipes[1]]));
    const { history } = renderWithRouterAndProvider(<FavoriteRecipes />);
    const image = screen.getByTestId('0-horizontal-image');
    userEvent.click(image);
    expect(history.location.pathname).toBe('/drinks/1');
  });

  test('Verifica se tem a frase sem favoritos na tela', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    renderWithRouterAndProvider(<FavoriteRecipes />);

    const noFAV = screen.getByText('Sem favoritos');
    expect(noFAV).toBeInTheDocument();
  });
  test('verifica se o link copied some após o clique', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(recipes));
    renderWithRouterAndProvider(<FavoriteRecipes />);
    const link = screen.getByTestId('link');
    const recipe1ShareBTN = screen.getByTestId('0-horizontal-share-btn');

    userEvent.click(recipe1ShareBTN);
    expect(link).toHaveTextContent(/Link copied/i);

    await waitFor(() => {
      expect(link).not.toHaveTextContent(/Link copied/i);
    });
  });
});
