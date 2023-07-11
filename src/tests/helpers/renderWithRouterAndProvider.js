import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import RecipesProvider from '../../context/RecipesProvider';

export default function renderWithRouterAndProvider(component, route = '/') {
  const history = createMemoryHistory({ initialEntries: [route] });
  return {
    ...render(
      <RecipesProvider>
        <Router history={ history }>
          {component}
        </Router>
      </RecipesProvider>,
    ),
    history,
  };
}
