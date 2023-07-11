import React from 'react';
import PropTypes from 'prop-types';

function RecipeContent({ recipe }) {
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

  // variavel para quantia de medidas;
  const measure = 13;

  // Filtro necessário para conseguir separar a quantia de ingredientes;
  const recipeARR = Object.entries(recipe);
  const ingredients = recipeARR.filter(([key, value]) => (
    key.includes('strIngredient') && value
  ));

  return (
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
      <ul>
        {ingredients.map(([key, value], index) => (
          <li key={ key } data-testid={ `${index}-ingredient-name-and-measure` }>
            {value}
            {' '}
            -
            {' '}
            {recipe[`strMeasure${key.slice(measure)}`]}
          </li>
        ))}
      </ul>
      <h3>Instructions:</h3>
      <p className="instructions" data-testid="instructions">
        {strInstructions}
      </p>
      {strYoutube && (
        <div data-testid="video">
          <iframe
            className="video"
            src={ `https://www.youtube.com/embed/${strYoutube.split('=')[1]}` }
            title="Recipe Video"
          />
        </div>
      )}
    </div>
  );
}
RecipeContent.propTypes = {
  recipe: PropTypes.shape({
    strMealThumb: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
    strCategory: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strInstructions: PropTypes.string,
    strYoutube: PropTypes.string,
  }).isRequired,
};
export default RecipeContent;
