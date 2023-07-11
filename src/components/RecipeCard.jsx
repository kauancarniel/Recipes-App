import React from 'react';
import PropTypes from 'prop-types';

export default function RecipeCard({ index, item, base }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        src={ item[`str${base}Thumb`] }
        alt={ item[`str${base}`] }
        data-testid={ `${index}-card-img` }
      />
      <h2 data-testid={ `${index}-card-name` }>{ item[`str${base}`]}</h2>
    </div>
  );
}

RecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.instanceOf(Object).isRequired,
  base: PropTypes.string.isRequired,
};
