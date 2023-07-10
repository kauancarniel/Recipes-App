import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom/cjs/react-router-dom.min';
import Footer from '../components/Footer';

test('redireciona para a página "/drinks" ao clicar no botão de drinks', () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <Footer />
    </Router>,
  );

  const drinksButton = screen.getByTestId('drinks-bottom-btn');
  fireEvent.click(drinksButton);

  expect(history.location.pathname).toBe('/drinks');
});

test('redireciona para a página "/meals" ao clicar no botão de meals', () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <Footer />
    </Router>,
  );

  const mealsButton = screen.getByTestId('meals-bottom-btn');
  fireEvent.click(mealsButton);

  expect(history.location.pathname).toBe('/meals');
});
