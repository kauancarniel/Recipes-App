import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import RecipeDetails from '../Pages/RecipeDetails';

test('loading in page', () => {
  render(
    <Router>
      <RecipeDetails />
    </Router>,
  );

  const loading = screen.getByText(/Loading.../i);
  expect(loading).toBeInTheDocument();
});
