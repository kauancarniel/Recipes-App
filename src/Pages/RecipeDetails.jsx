import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function RecipeDetails() {
  const [foodData, setFoodData] = useState(null);
  const [drinkData, setDrinkData] = useState(null);
  const [recomendsMeals, setRecomendsMeals] = useState([]);
  const [recomendsDrinks, setRecomendsDrinks] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchFood = () => {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json())
        .then((data) => setFoodData(data.meals[0]))
        .catch((error) => console.error(error));
    };

    const fetchDrink = () => {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json())
        .then((data) => setDrinkData(data.drinks[0]))
        .catch((error) => console.error(error));
    };

    const fetchRecomends = () => {
      fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((data) => setRecomendsMeals(data.drinks))
        .catch((error) => console.error(error));
    };

    const fetchRecomendsDrinks = () => {
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((data) => setRecomendsDrinks(data.meals))
        .catch((error) => console.error(error));
    };

    fetchFood();
    fetchDrink();
    fetchRecomends();
    fetchRecomendsDrinks();
  }, [id]);

  // Condição necessária para ciclo de vida do componente;
  if (!foodData && !drinkData) {
    return <div>Loading...</div>;
  }

  const recipe = foodData || drinkData;
  const {
    strMealThumb,
    strDrinkThumb,
    strMeal,
    strDrink,
    strCategory,
    strAlcoholic,
    strInstructions,
    strYoutube,
  } = recipe;

  const recipeType = strMeal ? 'meal' : 'drink';
  const recipeRecomend = 6;
  // Filtro necessário para conseguir separar a quantia de ingredientes;

  const recipeARR = Object.entries(recipe);
  const ingredients = recipeARR.filter(([key, value]) => (
    key.includes('strIngredient') && value
  ));

  const measure = 13;
  return (
    <div className="recipes">
      {console.log(recipe)}
      <img
        src={ strMealThumb || strDrinkThumb }
        alt="recipes"
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{strMeal || strDrink}</h1>
      <h2 data-testid="recipe-category">{strMeal ? strCategory : strAlcoholic}</h2>
      <h3>Ingredients:</h3>
      <ul>
        {ingredients.map(([key, value], index) => (
          <li
            key={ key }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {value}
            -
            {recipe[`strMeasure${key.slice(measure)}`]}
          </li>
        ))}
      </ul>
      <h3>Instructions:</h3>
      <p className="instructions" data-testid="instructions">{strInstructions}</p>
      {strYoutube && (
        <div data-testid="video">
          <iframe
            src={ `https://www.youtube.com/embed/${strYoutube.split('=')[1]}` }
            title="Recipe Video"
          />
        </div>
      )}
      {console.log(recomendsMeals)}

      { recipeType === 'meal'
        && (
          <div className="caroussel">
            {console.log(recomendsMeals)}
            { recomendsMeals.slice(0, recipeRecomend).map((meals, index) => (
              <>
                <img
                  src={ meals.strDrinkThumb }
                  alt="recipes"
                  data-testid={ `${index}-recommendation-card` }
                  className="caroussel-drinks"

                />
                <h1 data-testid={ `${index}-recommendation-title` }>
                  {meals.strDrink}
                </h1>

              </>

            ))}
          </div>
        )}
      {recipeType === 'drink'
      && (
        <div className="caroussel">
          {console.log(recomendsDrinks)}
          {
            recomendsDrinks.slice(0, recipeRecomend).map((drinks, index) => (

              <>
                <img
                  className="caroussel-meals"
                  src={ drinks.strMealThumb }
                  alt="recipes"
                  data-testid={ `${index}-recommendation-card` }
                />
                <h1 data-testid={ `${index}-recommendation-title` }>
                  {drinks.strMeal}
                </h1>
              </>

            ))
          }
        </div>
      )}

    </div>
  );
}

export default RecipeDetails;
