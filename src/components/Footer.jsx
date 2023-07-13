import { useHistory } from 'react-router-dom';

import useFetch from '../hooks/useFetch';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './Footer.css';

export default function Footer() {
  const history = useHistory();
  const { initialFetch } = useFetch();

  const handleClick = async (pathname) => {
    initialFetch(pathname);
    history.push(pathname);
  };

  return (
    <footer data-testid="footer">
      <button
        disabled={ history.location.pathname.includes('/drinks') }
        onClick={ () => handleClick('/drinks') }
      >
        <img src={ drinkIcon } alt="Drink" data-testid="drinks-bottom-btn" />
      </button>
      <button
        disabled={ history.location.pathname.includes('/meals') }
        onClick={ () => handleClick('/meals') }
      >
        <img src={ mealIcon } alt="Meals" data-testid="meals-bottom-btn" />
      </button>
    </footer>
  );
}
