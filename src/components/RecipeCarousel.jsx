import React from 'react';
import PropTypes from 'prop-types';

function RecipeCarousel({ recommendations, recipeQntRecomend, recipeType }) {
  return (
    <div className="caroussel">
      {recommendations.slice(0, recipeQntRecomend).map((item, index) => (
        <>
          <img
            src={ recipeType === 'meal' ? item.strDrinkThumb : item.strMealThumb }
            alt="recipes"
            data-testid={ `${index}-recommendation-card` }
            className={ recipeType === 'meal' ? 'caroussel-drinks' : 'caroussel-meals' }
          />
          <h1 data-testid={ `${index}-recommendation-title` }>
            {recipeType === 'meal' ? item.strDrink : item.strMeal}
          </h1>
        </>
      ))}
    </div>
  );
}

RecipeCarousel.propTypes = {
  recommendations: PropTypes.arrayOf(
    PropTypes.shape({
      strDrinkThumb: PropTypes.string.isRequired,
      strMealThumb: PropTypes.string.isRequired,
      strDrink: PropTypes.string,
      strMeal: PropTypes.string,
    }),
  ).isRequired,
  recipeQntRecomend: PropTypes.number.isRequired,
  recipeType: PropTypes.oneOf(['meal', 'drink']).isRequired,
};
export default RecipeCarousel;
