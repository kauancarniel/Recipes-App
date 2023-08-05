import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import useFetch from '../hooks/useFetch';
import IconFood from '../images/IconFood';
import IconDrinks from '../images/IconDrinks';

export default function Footer({ setCategorySelected = null }) {
  const history = useHistory();
  const { pathname } = history.location;
  const { initialFetch } = useFetch();

  const handleClick = async (route) => {
    if (setCategorySelected) {
      setCategorySelected('All');
      initialFetch(route);
    }
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
          onClick={ () => handleClick(pathname.includes('users') ? '/drinks/users'
            : '/drinks') }
        >
          <IconDrinks />
        </button>
        <button
          className="reset-btn"
          disabled={ pathname.includes('/meals') }
          onClick={ () => handleClick(pathname.includes('users') ? '/meals/users'
            : '/meals') }
        >
          <IconFood />
        </button>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  setCategorySelected: PropTypes.func,
};
