import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import RecipesContext from '../context/RecipesContext';

export default function MenuHamburguer(
  { showSearchBar = null, setShowSearchBar = null },
) {
  const { menuOpen, setMenuOpen } = useContext(RecipesContext);

  const pathSvg1 = 'M27 10 13 10C10.8 10 9 8.2 9 6 9 ';
  const pathSvg2 = '3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 ';
  const pathSvg3 = '30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22';
  const pathSvgFull = `${pathSvg1}${pathSvg2}${pathSvg3}`;

  return (
    <label className="flex-center hamburguer cursor-pointer">
      <input
        className="hidden"
        type="checkbox"
        checked={ menuOpen }
        onChange={ () => {
          setMenuOpen(!menuOpen);
          if (showSearchBar) setShowSearchBar(!showSearchBar);
        } }
      />
      <svg
        className="menu-trans"
        viewBox="0 0 32 32"
      >
        <path
          className="line line-top-bottom"
          d={ pathSvgFull }
        />
        <path className="line" d="M7 16 27 16" />
      </svg>
    </label>
  );
}

MenuHamburguer.propTypes = {
  showSearchBar: PropTypes.bool,
  setShowSearchBar: PropTypes.func,
}.isRequired;
