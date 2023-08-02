import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { HiOutlineHome, HiHeart, HiLogout } from 'react-icons/hi';
import { FiCheckCircle } from 'react-icons/fi';
import { MdOutlineEditNote } from 'react-icons/md';
import { LuChefHat } from 'react-icons/lu';
import { FaRankingStar } from 'react-icons/fa6';

import RecipesContext from '../context/RecipesContext';
import useUser from '../hooks/useUser';

const MIDDAY = 12;
const EIGHTEEN = 18;

export default function Menu({ showClose = false }) {
  const { logout } = useUser();
  const { setMenuOpen, userLogged } = useContext(RecipesContext);
  const date = new Date();
  const greeting = ['Good Morning', 'Good Afternoon', 'Good Evening'];
  const { name } = userLogged || { name: '' };

  const getGreeting = () => {
    if (date.getHours() < MIDDAY) return greeting[0];
    if (date.getHours() < EIGHTEEN) return greeting[1];
    return greeting[2];
  };

  return (
    <nav className={ `options-menu ${showClose ? 'top-0' : ''}` }>
      <h4 className="pt-3 text-[var(--green)] font-normal">
        { `${getGreeting()}, ${name}.`}
      </h4>
      <ul className="list-none flex justify-center flex-col p-0 m-0 pb-4 gap-y-3">
        <li>
          <Link
            className="option-menu"
            to="/meals"
            onClick={ () => setMenuOpen(false) }
          >
            <HiOutlineHome className="border-2 border-solid rounded-[100%]" />
            Home
          </Link>
        </li>
        <li>
          <Link
            className="option-menu"
            to="/profile"
            onClick={ () => setMenuOpen(false) }
          >
            <CgProfile />
            Profile
          </Link>
        </li>
        <li>
          <Link
            className="option-menu"
            to="/my-recipes"
            onClick={ () => setMenuOpen(false) }
          >
            <MdOutlineEditNote className="border-2 border-solid rounded-[100%]" />
            My Recipes
          </Link>
        </li>
        <li>
          <Link
            className="option-menu"
            to="/in-progress-recipes"
            onClick={ () => setMenuOpen(false) }
          >
            <LuChefHat className="border-2 border-solid rounded-[100%]" />
            Recipes in Progress
          </Link>
        </li>
        <li>
          <Link
            className="option-menu"
            to="/done-recipes"
            onClick={ () => setMenuOpen(false) }
          >
            <FiCheckCircle />
            Done Recipes
          </Link>
        </li>
        <li>
          <Link
            className="option-menu"
            to="/favorite-recipes"
            onClick={ () => setMenuOpen(false) }
          >
            <HiHeart className="border-2 border-solid rounded-[100%]" />
            Favorite Recipes
          </Link>
        </li>
        <li>
          <Link
            className="option-menu"
            to="/ranking"
            onClick={ () => setMenuOpen(false) }
          >
            <FaRankingStar className="border-2 border-solid rounded-[100%]" />
            Ranking
          </Link>
        </li>
        <li>
          <Link
            className="option-menu"
            onClick={ logout }
            to="/"
          >
            <HiLogout className="border-2 border-solid rounded-[100%]" />
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
}

Menu.propTypes = {
  ShowClose: PropTypes.bool,
}.isRequired;
