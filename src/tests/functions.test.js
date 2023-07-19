import { getStorage, initialIngredients, addInDoneRecipes } from '../utils/functions';
import { dataDrinks, dataMeals } from './helpers/data';

describe('Testa as funções do arquivo functions.js', () => {
  test('Testa a função initialIngredients', () => {
    const ingredients = [
      ['strIngredient1', 'Galliano'],
      ['strIngredient2', 'Ginger ale'],
      ['strIngredient3', 'Ice'],
    ];
    const usedIngredients = ['Galliano', 'Ice'];

    expect(initialIngredients(ingredients, usedIngredients)).toStrictEqual({
      strIngredient1: 'Galliano',
      strIngredient2: '',
      strIngredient3: 'Ice',
    });
  });

  test('Testa a função addInDoneRecipes', () => {
    let NAME_URL = 'meals';
    addInDoneRecipes(dataMeals.meals[0], NAME_URL);
    expect(getStorage('doneRecipes')).toMatchObject([{
      id: dataMeals.meals[0].idMeal,
      type: 'meal',
      nationality: dataMeals.meals[0].strArea,
      category: dataMeals.meals[0].strCategory,
      alcoholicOrNot: '',
      name: dataMeals.meals[0].strMeal,
      image: dataMeals.meals[0].strMealThumb,
      tags: dataMeals.meals[0].strTags.split(',').splice(0, 2),
    }]);

    localStorage.clear();

    NAME_URL = 'drinks';
    addInDoneRecipes(dataDrinks.drinks[0], NAME_URL);
    expect(getStorage('doneRecipes')).toMatchObject([{
      id: dataDrinks.drinks[0].idDrink,
      type: 'drink',
      nationality: '',
      category: dataDrinks.drinks[0].strCategory,
      alcoholicOrNot: dataDrinks.drinks[0].strAlcoholic,
      name: dataDrinks.drinks[0].strDrink,
      image: dataDrinks.drinks[0].strDrinkThumb,
      tags: [],
    }]);
  });
});
