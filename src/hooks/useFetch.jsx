import { useState } from 'react';

import fetchAPI from '../services/fetchAPI';

const useFetch = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecipes = async (pathname) => {
    try {
      return await fetchAPI(pathname);
    } catch ({ message }) {
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, fetchRecipes };
};

export default useFetch;
