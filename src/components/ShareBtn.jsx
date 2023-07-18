import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';

import RecipesContext from '../context/RecipesContext';
import shareIcon from '../images/shareIcon.svg';

const TIME_OUT = 1000;

export default function ShareBtn({ type, id, testId }) {
  const { setLinkCopy } = useContext(RecipesContext);

  const URLBASE = window.location.origin;

  return (
    <button
      data-testid={ testId }
      type="button"
      className="compartilhar"
      src={ shareIcon }
      alt="compartilhar"
      onClick={ () => {
        copy(`${URLBASE}${type}/${id}`);
        setLinkCopy(true);
        setTimeout(() => setLinkCopy(false), TIME_OUT);
      } }
    >
      <img src={ shareIcon } alt="Share" />
    </button>
  );
}

ShareBtn.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
};
