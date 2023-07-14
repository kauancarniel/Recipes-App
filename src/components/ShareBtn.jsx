import React, { useContext } from 'react';
import copy from 'clipboard-copy';

import RecipesContext from '../context/RecipesContext';
import imgcompt from '../images/shareIcon.svg';

const TIME_OUT = 1500;

export default function ShareBtn() {
  const { setLinkCopy } = useContext(RecipesContext);
  return (
    <button
      data-testid="share-btn"
      type="button"
      className="compartilhar"
      onClick={ () => {
        copy(window.location.href);
        setLinkCopy(true);
        setTimeout(() => setLinkCopy(false), TIME_OUT);
      } }
    >
      <img src={ imgcompt } alt="compartilhar" />
    </button>
  );
}
