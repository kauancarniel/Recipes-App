// api.js

export async function fetchFood(id) {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    return data.meals[0];
  } catch (error) {
    return console.error(error);
  }
}

export async function fetchDrink(id) {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    return data.drinks[0];
  } catch (error) {
    return console.error(error);
  }
}

export async function fetchRecomendsMeals() {
  try {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    return data.drinks;
  } catch (error) {
    return console.error(error);
  }
}

export async function fetchRecomendsDrinks() {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    return data.meals;
  } catch (error) {
    return console.error(error);
  }
}
