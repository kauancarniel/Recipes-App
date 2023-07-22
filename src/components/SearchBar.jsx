import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import RecipesContext from '../context/RecipesContext';
import useFetch from '../hooks/useFetch';

const MAX_RECIPES = 12;

function SearchBar() {
  const [optSearch, setOptSearch] = useState('');
  const [textSearch, setTextSearch] = useState('');
  const { setRecipes } = useContext(RecipesContext);
  const { fetchRecipes } = useFetch();
  const history = useHistory();

  const { location: { pathname } } = history;

  const saveSearchOpt = ({ target }) => {
    if (target.name === 'search') setOptSearch(target.value);
    else setTextSearch(target.value);
  };

  const fetchingApi = async (event) => {
    event.preventDefault();
    if (optSearch === 'firstLetter' && textSearch.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      const data = await fetchRecipes(pathname, optSearch, textSearch);
      if (!data) global.alert('Sorry, we haven\'t found any recipes for these filters.');
      else {
        setRecipes(data.slice(0, MAX_RECIPES));
        if (data.length === 1) {
          history.push(`${pathname}/${pathname === '/meals'
            ? data[0].idMeal : data[0].idDrink}`);
        }
      }
    }
  };

  return (
    <div>
      <form>
        <input
          type="text"
          onChange={ saveSearchOpt }
          name="textSearch"
          data-testid="search-input"
          placeholder="Type here"
        />
        <div>
          <label htmlFor="ingredient">
            <input
              id="ingredient"
              type="radio"
              value="ingredient"
              name="search"
              data-testid="ingredient-search-radio"
              onChange={ saveSearchOpt }
            />
            Ingredient
          </label>
          <label htmlFor="name">
            <input
              id="name"
              type="radio"
              value="name"
              name="search"
              data-testid="name-search-radio"
              onChange={ saveSearchOpt }
            />
            Name
          </label>
          <label htmlFor="firstLetter">
            <input
              id="firstLetter"
              type="radio"
              value="firstLetter"
              name="search"
              data-testid="first-letter-search-radio"
              onChange={ saveSearchOpt }
            />
            First letter
          </label>
        </div>
        <button onClick={ fetchingApi } data-testid="exec-search-btn">Search</button>
      </form>
    </div>
  );
}

export default SearchBar;
