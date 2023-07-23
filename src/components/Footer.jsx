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
      className="fixed bottom-0 w-full flex justify-around items-center bg-[#F9EFBB] py-2"
      data-testid="footer"
    >
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
    </footer>
  );
}
