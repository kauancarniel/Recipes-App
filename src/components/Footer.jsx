import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  const history = useHistory();
  return (
    <footer data-testid="footer">
      <button onClick={ () => history.push('/drinks') }>
        <img src={ drinkIcon } alt="Drink" data-testid="drinks-bottom-btn" />
      </button>
      <button onClick={ () => history.push('/meals') }>
        <img src={ mealIcon } alt="Meals" data-testid="meals-bottom-btn" />
      </button>
    </footer>
  );
}
