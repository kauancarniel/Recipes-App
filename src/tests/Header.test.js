import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';
import renderWithRouterAndProvider from './helpers/renderWithRouterAndProvider';

describe('Header', () => {
  test('verifica se renderiza barra Search ', async () => {
    const { getByTestId } = renderWithRouterAndProvider(<Header title="Test Title" iconeSearch />);

    const searchIcon = getByTestId('search-top-btn');
    expect(searchIcon).toBeInTheDocument();
    userEvent.click(searchIcon);
    screen.debug();

    await waitFor(() => {
      const searchBarRadio = getByTestId('ingredient-search-radio');
      expect(searchBarRadio).toBeInTheDocument();
    });
  });
});
