import { useHistory } from 'react-router-dom';

import useFetch from '../hooks/useFetch';
import iconFood from '../images/icon-foods.svg';
import iconDrink from '../images/icon-drinks.svg';
import './Footer.css';

export default function Footer() {
  const history = useHistory();
  const { initialFetch } = useFetch();

  const handleClick = async (pathname) => {
    initialFetch(pathname);
    history.push(pathname);
  };

  return (
    <footer
      className="fixed bottom-0 w-full flex justify-around items-center bg-[#F9EFBB] py-2"
      data-testid="footer"
    >
      <button
        className="reset-btn"
        disabled={ history.location.pathname.includes('/drinks') }
        onClick={ () => handleClick('/drinks') }
      >
        <img
          className="h-7"
          src={ iconDrink }
          alt="Drink"
          data-testid="drinks-bottom-btn"
        />
      </button>
      <button
        className="reset-btn"
        disabled={ history.location.pathname.includes('/meals') }
        onClick={ () => handleClick('/meals') }
      >
        <img
          className="h-7"
          src={ iconFood }
          alt="Meals"
          data-testid="meals-bottom-btn"
        />
      </button>
    </footer>
  );
}
