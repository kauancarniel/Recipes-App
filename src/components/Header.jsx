import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { TbSearch, TbSearchOff } from 'react-icons/tb';
import { CgProfile } from 'react-icons/cg';
import { HiHeart } from 'react-icons/hi';
import { FiCheckCircle } from 'react-icons/fi';
import { MdOutlineEditNote } from 'react-icons/md';
import { LuChefHat } from 'react-icons/lu';
import { FaRankingStar } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { AiOutlineTeam } from 'react-icons/ai';
import RecipesContext from '../context/RecipesContext';
import MenuHamburguer from './MenuHamburguer';
import SearchBar from './SearchBar';
import Menu from './Menu';
import iconLogo from '../images/icon-recipes-app.svg';
import nameLogo from '../images/name-recipes-app.svg';
import iconFoods from '../images/icon-foods.svg';
import iconDrinks from '../images/icon-drinks.svg';
import { getId } from '../utils/functions';
import './Header.css';

const iconsTitle = {
  Meals: (<img src={ iconFoods } alt="food icon" className="h-12" />),
  Drinks: (<img src={ iconDrinks } alt="food icon" className="h-12" />),
  Profile: <CgProfile className="w-14 h-14 text-[var(--green)]" />,
  'My Recipes': <MdOutlineEditNote className="icon-title" />,
  'Recipes in Progress': <LuChefHat className="icon-title" />,
  'Done Recipes': <FiCheckCircle className="w-14 h-14 text-[var(--green)]" />,
  'Favorite Recipes': <HiHeart className="icon-title" />,
  Ranking: <FaRankingStar className="icon-title" />,
  About: <AiOutlineTeam className="icon-title" />,
};

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
              <Link to="/meals">
                <img src={ iconLogo } alt="icon logo" className="w-9" />
                <img src={ nameLogo } alt="name logo" />
              </Link>
            </div>
          )}
          <nav className="flex items-center gap-x-1">
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
            { getId('userLogged') && (
              <MenuHamburguer
                showSearchBar={ showSearchBar }
                setShowSearchBar={ setShowSearchBar }
              />
            ) }
          </nav>
        </div>
        {menuOpen && (<Menu />)}
      </header>
      <div
        className="recipe-box flex-center bg-form glass title-box"
      >
        {iconsTitle[title]}
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
