import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { TbSearch, TbSearchOff } from 'react-icons/tb';

import RecipesContext from '../context/RecipesContext';
import MenuHamburguer from './MenuHamburguer';
import SearchBar from './SearchBar';
import Menu from './Menu';
import iconLogo from '../images/icon-recipes-app.svg';
import nameLogo from '../images/name-recipes-app.svg';
import iconFoods from '../images/icon-foods.svg';
import iconDrinks from '../images/icon-drinks.svg';
import './Header.css';

function Header({ title, iconeSearch = false }) {
  const { menuOpen, setMenuOpen } = useContext(RecipesContext);
  const [showSearchBar, setShowSearchBar] = useState(false);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <header className="header">
        <div className="flex justify-between w-full sm:w-[90%] gap-x-3 max-w-[1000px]">
          {showSearchBar ? (
            <SearchBar />
          ) : (
            <div className="flex-center">
              <img src={ iconLogo } alt="icon logo" className="w-9" />
              <img src={ nameLogo } alt="name logo" />
            </div>
          )}
          <nav className="flex gap-x-1">
            {iconeSearch && (
              <button
                className="reset-btn w-10 h-10 overflow-hidden"
                type="button"
                onClick={ () => {
                  setShowSearchBar(!showSearchBar);
                  if (menuOpen) setMenuOpen(!menuOpen);
                } }
              >
                { showSearchBar ? (
                  <TbSearchOff size="30px" color="var(--green)" />
                ) : (
                  <TbSearch size="30px" color="var(--green)" />
                )}
              </button>
            )}
            <MenuHamburguer
              showSearchBar={ showSearchBar }
              setShowSearchBar={ setShowSearchBar }
            />
          </nav>
        </div>
        {menuOpen && (<Menu />)}
      </header>
      <div
        className="recipe-box flex-center bg-form glass title-box"
      >
        <img
          className="w-12"
          src={ title === 'Meals' ? iconFoods : iconDrinks }
          alt="icon type"
        />
        <h1
          className="title"
          data-testid="page-title"
        >
          {title}
        </h1>
      </div>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
}.isRequired;

export default Header;
