import { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import RecipesContext from '../context/RecipesContext';
import { deleteCookie, getCookie } from '../utils/functions';

const useCookies = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const { userLogged, setUserLogged, setMenuOpen } = useContext(RecipesContext);

  const validateCookie = () => {
    const userInCookie = getCookie('userLogged');
    if (userInCookie) {
      if (userLogged.id !== userInCookie.id) setUserLogged(userInCookie);
      history.push(pathname === '/' ? '/meals' : pathname);
      return true;
    }
    setUserLogged(null);
    history.push('/');
    return false;
  };

  const logout = () => {
    deleteCookie('userLogged');
    setUserLogged({ id: '' });
    setMenuOpen(false);
  };

  return { validateCookie, logout };
};

export default useCookies;
