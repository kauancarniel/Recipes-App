import React from 'react';
import { screen, waitForElementToBeRemoved, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouterAndProvider from './helpers/renderWithRouterAndProvider';
import App from '../App';
import { categoriesListMeals, dataMeals } from './helpers/data';

const TOMATO_PUREE = 'Tomato Puree';

const mockMeal = {
  meals: [
    {
      idMeal: '53006',
      strMeal: 'Moussaka',
      strDrinkAlternate: null,
      strCategory: 'Beef',
      strArea: 'Greek',
      strInstructions: 'Heat the grill to high. Brown the beef in a deep ovenproof frying pan over a high heat for 5 mins. Meanwhile, prick the aubergine with a fork, then microwave on High for 3-5 mins until soft. Mix the yogurt, egg and parmesan together, then add a little seasoning.\r\n\r\nStir the tomatoes, purée and potatoes in with the beef with some seasoning and heat through. Smooth the surface of the beef mixture with the back of a spoon, then slice the cooked aubergine and arrange on top. Pour the yogurt mixture over the aubergines, smooth out evenly, then grill until the topping has set and turned golden.',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/ctg8jd1585563097.jpg',
      strTags: null,
      strYoutube: 'https://www.youtube.com/watch?v=8U_29i9Qp5U',
      strIngredient1: 'Beef',
      strIngredient2: 'Aubergine',
      strIngredient3: 'Greek Yogurt',
      strIngredient4: 'Egg',
      strIngredient5: 'Parmesan',
      strIngredient6: 'Tomato',
      strIngredient7: TOMATO_PUREE,
      strIngredient8: 'Potatoes',
      strIngredient9: '',
      strIngredient10: '',
      strIngredient11: '',
      strIngredient12: '',
      strIngredient13: '',
      strIngredient14: '',
      strIngredient15: '',
      strIngredient16: '',
      strIngredient17: '',
      strIngredient18: '',
      strIngredient19: '',
      strIngredient20: '',
      strMeasure1: '500g',
      strMeasure2: '1 large',
      strMeasure3: '150g',
      strMeasure4: '1 beaten',
      strMeasure5: '3 tbs',
      strMeasure6: '400g',
      strMeasure7: '4 tbs',
      strMeasure8: '350g',
      strMeasure9: ' ',
      strMeasure10: ' ',
      strMeasure11: ' ',
      strMeasure12: ' ',
      strMeasure13: ' ',
      strMeasure14: ' ',
      strMeasure15: ' ',
      strMeasure16: ' ',
      strMeasure17: ' ',
      strMeasure18: ' ',
      strMeasure19: ' ',
      strMeasure20: ' ',
      strSource: 'https://www.bbcgoodfood.com/recipes/must-make-moussaka',
      strImageSource: null,
      strCreativeCommonsConfirmed: null,
      dateModified: null,
    },
  ],
};

describe('Teste do componente Recipes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('Verificando se o formulario de busca existe na tela', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(dataMeals)
        .mockResolvedValueOnce(categoriesListMeals),
    });

    renderWithRouterAndProvider(<App />, '/meals');

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    const showSearchBar = screen.getByTestId(/search-top-btn/i);

    userEvent.click(showSearchBar);

    const optIngredientSarch = screen.getByTestId(/ingredient-search-radio/i);
    const inputSearch = screen.getByTestId(/search-input/i);
    const buttonSearch = screen.getByTestId(/exec-search-btn/i);

    expect(optIngredientSarch).toBeInTheDocument();
    expect(inputSearch).toBeInTheDocument();
    expect(buttonSearch).toBeInTheDocument();
  });

  it('Testando um filtro', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(dataMeals)
        .mockResolvedValueOnce(categoriesListMeals),
    });

    renderWithRouterAndProvider(<App />, '/meals');

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    const showSearchBar = screen.getByTestId(/search-top-btn/i);
    userEvent.click(showSearchBar);

    const optNametSearch = screen.getByTestId(/name-search-radio/i);
    const inputSearch = screen.getByTestId(/search-input/i);
    const buttonSearch = screen.getByTestId(/exec-search-btn/i);

    userEvent.click(optNametSearch);
    userEvent.type(inputSearch, 'soup');
    userEvent.click(buttonSearch);

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    const recipes = screen.getAllByRole('img');

    expect(recipes).toHaveLength(4);
  });

  it('Testa se um alert aparece quando a busca do first letter é feita com mais de 1 letra', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(dataMeals)
        .mockResolvedValueOnce(categoriesListMeals),
    });
    const alert = jest.spyOn(global, 'alert');

    renderWithRouterAndProvider(<App />, '/meals');

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    const showSearchBar = screen.getByTestId(/search-top-btn/i);
    userEvent.click(showSearchBar);

    const optFirstLettertSearch = screen.getByTestId(/first-letter-search-radio/i);
    const inputSearch = screen.getByTestId(/search-input/i);
    const buttonSearch = screen.getByTestId(/exec-search-btn/i);

    userEvent.click(optFirstLettertSearch);
    userEvent.type(inputSearch, '123');
    userEvent.click(buttonSearch);

    expect(alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
    expect(alert).toHaveBeenCalledTimes(1);
  });

  it('Testa se o usuario é levado para a pagina de detalhes quando a busca resulta em 1 receita', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(mockMeal)
        .mockResolvedValueOnce(categoriesListMeals),
    });

    const { history } = renderWithRouterAndProvider(<App />, '/meals');

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    const showSearchBar = screen.getByTestId(/search-top-btn/i);
    userEvent.click(showSearchBar);

    const optNametSearch = screen.getByTestId(/name-search-radio/i);
    const inputSearch = screen.getByTestId(/search-input/i);
    const buttonSearch = screen.getByTestId(/exec-search-btn/i);

    userEvent.click(optNametSearch);
    userEvent.type(inputSearch, 'Moussaka');
    userEvent.click(buttonSearch);

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals/53006');
    });
  });
});
