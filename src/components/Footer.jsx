import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import RecipesContext from '../context/RecipesContext';
import useFetch from '../hooks/useFetch';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './Footer.css';

export default function Footer() {
  const history = useHistory();
  const { setRecipes } = useContext(RecipesContext);
  const { fetchRecipes } = useFetch();

  const handleClick = async (type) => {
    const data = await fetchRecipes(type);
    setRecipes(data);
    history.push(type);
  };

  return (
    <footer data-testid="footer">
      <button
        disabled={ history.location.pathname === '/drinks' }
        onClick={ () => handleClick('/drinks') }
      >
        <img src={ drinkIcon } alt="Drink" data-testid="drinks-bottom-btn" />
      </button>
      <button
        disabled={ history.location.pathname === '/meals' }
        onClick={ () => handleClick('/meals') }
      >
        <img src={ mealIcon } alt="Meals" data-testid="meals-bottom-btn" />
      </button>
    </footer>
  );
}
