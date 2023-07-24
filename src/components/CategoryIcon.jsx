import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { PiCoffee } from 'react-icons/pi';

import IconBeef from '../images/IconBeef';
import IconBreakfast from '../images/IconBreakfast';
import IconChicken from '../images/IconChicken';
import IconDessert from '../images/IconDessert';
import IconGoat from '../images/IconGoat';
import IconOrdinary from '../images/IconOrdinary';
import IconCocktail from '../images/IconCocktail';
import IconShake from '../images/IconShake';
import IconOther from '../images/IconOther';

function CategoryIcon({ strCategory, index, categorySelected }) {
  const { pathname } = useLocation();
  const mealsIcons = [
    <IconBeef
      key="Beef"
      categorySelected={ categorySelected }
      strCategory={ strCategory }
    />,
    <IconBreakfast
      key="Breakfast"
      categorySelected={ categorySelected }
      strCategory={ strCategory }
    />,
    <IconChicken
      key="Chicken"
      categorySelected={ categorySelected }
      strCategory={ strCategory }
    />,
    <IconDessert
      key="Dessert"
      categorySelected={ categorySelected }
      strCategory={ strCategory }
    />,
    <IconGoat
      key="Goat"
      categorySelected={ categorySelected }
      strCategory={ strCategory }
    />,
  ];

  const drinksIcons = [
    <IconOrdinary
      key="Ordinary Drink"
      categorySelected={ categorySelected }
      strCategory={ strCategory }
    />,
    <IconCocktail
      key="Cocktail"
      categorySelected={ categorySelected }
      strCategory={ strCategory }
    />,
    <IconShake
      key="Shake"
      categorySelected={ categorySelected }
      strCategory={ strCategory }
    />,
    <IconOther
      key="Other / Unknown"
      categorySelected={ categorySelected }
      strCategory={ strCategory }
    />,
    <PiCoffee
      key="Cocoa"
      size="31px"
      color={ categorySelected === strCategory ? 'var(--green)' : 'var(--yellow)' }
    />,
  ];
  return pathname.includes('/meals') ? mealsIcons[index] : drinksIcons[index];
}

CategoryIcon.propTypes = {
  strCategory: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  categorySelected: PropTypes.string.isRequired,
};

export default CategoryIcon;
