import React from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { MdShare } from 'react-icons/md';

import useFetch from '../hooks/useFetch';
import shareIcon from '../images/shareIcon.svg';

export default function ShareBtn({ type, id, testId }) {
  const { fireToast } = useFetch();
  const URLBASE = window.location.origin;

  return (
    <button
      data-testid={ testId }
      type="button"
      className="no-border bg-none text-[var(--yellow)]"
      src={ shareIcon }
      alt="compartilhar"
      onClick={ () => {
        copy(`${URLBASE}${type}/${id}`);
        fireToast('Link copied', 'success');
      } }
    >
      <MdShare size="35px" />
    </button>
  );
}

ShareBtn.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  testId: PropTypes.string.isRequired,
};
