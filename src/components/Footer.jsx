import { useHistory } from 'react-router-dom';

import useFetch from '../hooks/useFetch';
import IconFood from '../images/IconFood';
import IconDrinks from '../images/IconDrinks';

export default function Footer() {
  const history = useHistory();
  const { pathname } = history.location;
  const { initialFetch } = useFetch();

  const handleClick = async (route) => {
    initialFetch(route);
    history.push(route);
  };

  return (
    <footer
      className="footer"
      data-testid="footer"
    >
      <div className="w-full max-w-[1000px] flex justify-around items-center">
        <button
          className="reset-btn"
          disabled={ pathname.includes('/drinks') }
          onClick={ () => handleClick('/drinks') }
        >
          <IconDrinks />
        </button>
        <button
          className="reset-btn"
          disabled={ pathname.includes('/meals') }
          onClick={ () => handleClick('/meals') }
        >
          <IconFood />
        </button>
      </div>
    </footer>
  );
}
