import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

export default function RecipeCard({ index, item, base }) {
  const history = useHistory();
  const { pathname } = history.location;
  return (
    <button
      type="button"
      data-testid={ `${index}-recipe-card` }
      onClick={ () => history.push(`${pathname}/${item[`id${base}`]}`) }
    >
      <img
        src={ item[`str${base}Thumb`] }
        alt={ item[`str${base}`] }
        data-testid={ `${index}-card-img` }
      />
      <h2 data-testid={ `${index}-card-name` }>{ item[`str${base}`]}</h2>
    </button>
  );
}

RecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.instanceOf(Object).isRequired,
  base: PropTypes.string.isRequired,
};
