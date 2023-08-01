import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import RecipesContext from '../context/RecipesContext';

const height = 12;

export default function CountRatings({ commentsLength }) {
  const { comments } = useContext(RecipesContext);

  const progress = (commentsLength * 100) / comments.length;
  const container = {
    height,
    width: '100%',
    backgroundColor: 'var(--gray)',
    borderRadius: 40,
  };

  const progressBar = {
    height: '100%',
    width: `${progress}%`,
    backgroundColor: 'var(--darkYellow)',
    borderRadius: 40,
    textAlign: 'right',
  };

  return (
    <div style={ container }>
      <div style={ progressBar } />
    </div>
  );
}

CountRatings.propTypes = {
  commentsLength: PropTypes.number.isRequired,
};
