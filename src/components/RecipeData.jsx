import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function RecipeContent({ recipe }) {
  const { location } = useHistory();
  const nameURL = location.pathname.split('/')[1] === 'meals' ? 'Meal' : 'Drink';

  const {
    strCategory,
    strAlcoholic,
    strInstructions,
    strYoutube,
  } = recipe;

  // Filtro necessário para conseguir separar a quantia de ingredientes;
  const recipeARR = Object.entries(recipe);
  const ingredients = recipeARR.filter(([key, value]) => (
    key.includes('strIngredient') && value
  ));

  return (
    <div className="recipes-content">
      <div className="details-img">
        <img
          src={ recipe[`str${nameURL}Thumb`] }
          alt="recipes"
          data-testid="recipe-photo"
        />
        <h2 data-testid="recipe-title">{recipe[`str${nameURL}`]}</h2>
        <h3 data-testid="recipe-category">
          {
            nameURL === 'Meal' ? strCategory : strAlcoholic
          }

        </h3>
      </div>
      <h4>Ingredients:</h4>
      <ul>
        {ingredients.map(([key, value], index) => (
          <li key={ key } data-testid={ `${index}-ingredient-name-and-measure` }>
            {value}
            {' '}
            -
            {' '}
            {recipe[`strMeasure${index + 1}`]}
          </li>
        ))}
      </ul>
      <h5>Instructions:</h5>
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
