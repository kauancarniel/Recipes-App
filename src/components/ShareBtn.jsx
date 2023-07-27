import React from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { BsShare } from 'react-icons/bs';

import useFetch from '../hooks/useFetch';
import shareIcon from '../images/shareIcon.svg';

export default function ShareBtn({ type, id, testId }) {
  const { fireToast } = useFetch();
  const URLBASE = window.location.origin;

  return (
    <button
      data-testid={ testId }
      type="button"
      className="no-border bg-none text-[var(--yellow)] hover:scale-110"
      src={ shareIcon }
      alt="compartilhar"
      onClick={ () => {
        copy(`${URLBASE}${type}/${id}`);
        fireToast('Password copied', 'success');
      } }
    >
      <BsShare size="45px" />
    </button>
  );
}

ShareBtn.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
};
