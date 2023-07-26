import React from 'react';
import PropTypes from 'prop-types';

function Star({ nota, setRating }) {
  return (
    <>
      <input
        type="radio"
        id={ `star${nota}` }
        key={ `star${nota}` }
        name="rating"
        value={ nota }
        onChange={ ({ target }) => setRating(target.value) }
      />
      <label htmlFor={ `star${nota}` } title="text" />
    </>
  );
}

Star.propTypes = {
  nota: PropTypes.string.isRequired,
  setRating: PropTypes.func.isRequired,
};

export default Star;
