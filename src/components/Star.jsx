import React from 'react';
import PropTypes from 'prop-types';

function Star({ grade, setRating, rating }) {
  return (
    <>
      <input
        type="checkbox"
        id={ `star${grade}` }
        key={ `star${grade}` }
        name="rating"
        value={ grade }
        checked={ Number(grade) <= Number(rating) }
        onChange={ ({ target }) => setRating(target.value) }
      />
      <label htmlFor={ `star${grade}` } title="text" />
    </>
  );
}

Star.propTypes = {
  grade: PropTypes.string.isRequired,
  setRating: PropTypes.func.isRequired,
  rating: PropTypes.string.isRequired,
};

export default Star;
