import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function RecipeDetails() {
  const [foodData, setFoodData] = useState(null);
  const [drinkData, setDrinkData] = useState(null);
  const [recomendsMeals, setRecomendsMeals] = useState([]);
  const [recomendsDrinks, setRecomendsDrinks] = useState([]);
  const [recipeStatus, setRecipeStatus] = useState(false);
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

    // Caso queira entender melhor verificar chave inProgress no readme do projeto.
    const progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (progressRecipes) {
      const { meals, drinks } = progressRecipes;
      if ((meals && meals[id]) || (drinks && drinks[id])) {
        setRecipeStatus(true);
      }
    }

    fetchFood();
    fetchDrink();
    fetchRecomends();
    fetchRecomendsDrinks();
  }, [id]);

  // Condição necessária para ciclo de vida do componente;
  if (!foodData && !drinkData) {
    return <div>Loading...</div>;
  }

  // const para receber a receita de comida ou bebida;
  const recipe = foodData || drinkData;
  // desestruturação com os dados da api
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

  // condição que verifica se a receita é de comida ou bebida;
  const recipeType = strMeal ? 'meal' : 'drink';
  // variavel para quantia de recomendações;
  const recipeRecomend = 6;
  // Filtro necessário para conseguir separar a quantia de ingredientes;
  const recipeARR = Object.entries(recipe);
  const ingredients = recipeARR.filter(([key, value]) => (
    key.includes('strIngredient') && value
  ));
  // variavel para quantia de medidas;
  const measure = 13;
  return (
    <div className="recipes">
      <div className="recipes-content">
        <div className="details-img">
          <img
            src={ strMealThumb || strDrinkThumb }
            alt="recipes"
            data-testid="recipe-photo"
          />
          <h1 data-testid="recipe-title">{strMeal || strDrink}</h1>
          <h2 data-testid="recipe-category">{strMeal ? strCategory : strAlcoholic}</h2>
        </div>
        <h3>Ingredients:</h3>
        {console.log(recipeARR)}
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
      </div>
      <h3>Instructions:</h3>
      <p className="instructions" data-testid="instructions">{strInstructions}</p>
      {strYoutube && (
        <div data-testid="video">
          <iframe
            className="video"
            src={ `https://www.youtube.com/embed/${strYoutube.split('=')[1]}` }
            title="Recipe Video"
          />
        </div>
      )}

      { recipeType === 'meal'
        && (
          <div className="caroussel">
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
      <div className="btn-recipe">
        <button type="button" data-testid="start-recipe-btn">
          {recipeStatus ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      </div>
    </div>
  );
}

export default RecipeDetails;
