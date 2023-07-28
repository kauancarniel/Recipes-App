import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { HiOutlineHome, HiHeart, HiLogout } from 'react-icons/hi';
import { FiCheckCircle } from 'react-icons/fi';
import { MdOutlineEditNote } from 'react-icons/md';
import { LuChefHat } from 'react-icons/lu';
import { FaRankingStar } from 'react-icons/fa6';

import MenuHamburguer from './MenuHamburguer';

export default function Menu({ showClose = false }) {
  return (
    <nav className={`options-menu ${showClose ? 'top-0' : ''}`}>
      <ul className="list-none flex flex-col p-6 gap-y-3 max-w-[300px]">
        <li>
          <Link
            className="option-menu"
            to="/meals"
          >
            <HiOutlineHome className="border-2 border-solid rounded-[100%]" />
            Home
          </Link>
        </li>
        <li>
          <Link
            className="option-menu"
            to="/profile"
          >
            <CgProfile />
            Profile
          </Link>
        </li>
        <li>
          <Link
            className="option-menu"
            to="/my-recipes"
          >
            <MdOutlineEditNote className="border-2 border-solid rounded-[100%]" />
            My Recipes
          </Link>
        </li>
        <li>
          <Link
            className="option-menu"
            to="/in-progress-recipes"
          >
            <LuChefHat className="border-2 border-solid rounded-[100%]" />
            Recipes in Progress
          </Link>
        </li>
        <li>
          <Link
            className="option-menu"
            to="/done-recipes"
          >
            <FiCheckCircle />
            Done Recipes
          </Link>
        </li>
        <li>
          <Link
            className="option-menu"
            to="/favorite-recipes"
          >
            <HiHeart className="border-2 border-solid rounded-[100%]" />
            Favorite Recipes
          </Link>
        </li>
        <li>
          <Link
            className="option-menu"
            to="/ranking"
          >
            <FaRankingStar className="border-2 border-solid rounded-[100%]" />
            Ranking
          </Link>
        </li>
        <li>
          <Link
            className="option-menu"
            onClick={ () => {} }
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
