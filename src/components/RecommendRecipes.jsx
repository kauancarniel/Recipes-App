import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import './RecommendRecipes.css';

function RecommendRecipes({ recommendRecipes }) {
  const { pathname } = useLocation();
  const KEY_BASE = pathname.split('/')[1] === 'meals' ? 'Drink' : 'Meal';

  return (
    <aside className="caroussel">
      {recommendRecipes.map((recipe, index) => (
        <div
          className="recommendation-card"
          key={ `${recipe[`id${KEY_BASE}`]}${recipe[`str${KEY_BASE}`]}` }
        >
          <img
            className="img-recommend"
            src={ `${recipe[`str${KEY_BASE}Thumb`]}` }
            alt={ `${recipe[`str${KEY_BASE}`]}` }
            data-testid={ `${index}-recommendation-card` }
          />
          <h5 data-testid={ `${index}-recommendation-title` }>
            {`${recipe[`str${KEY_BASE}`]}`}
          </h5>
        </div>
      ))}
    </aside>
  );
}

RecommendRecipes.propTypes = {
  recommendRecipes: PropTypes.arrayOf(
    PropTypes.instanceOf(Object),
  ).isRequired,
};
export default RecommendRecipes;
