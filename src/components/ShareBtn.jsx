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
      className=" absolute top-[17em] right-4 bg-inherit border-none z-10 "
      src={ shareIcon }
      alt="compartilhar"
      onClick={ () => {
        copy(`${URLBASE}${type}/${id}`);
        setLinkCopy(true);
        setTimeout(() => setLinkCopy(false), TIME_OUT);
      } }
    >
      <img src={ shareIcon } className="w-6 bg z-10" alt="Share" />
    </button>
  );
}

ShareBtn.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
};
