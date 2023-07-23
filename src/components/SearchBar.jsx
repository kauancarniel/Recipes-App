import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import RecipesContext from '../context/RecipesContext';
import useFetch from '../hooks/useFetch';

const MAX_RECIPES = 12;

function SearchBar() {
  const [optSearch, setOptSearch] = useState('');
  const [textSearch, setTextSearch] = useState('');
  const { setRecipes, error } = useContext(RecipesContext);
  const { fetchRecipes, fireToast } = useFetch();
  const history = useHistory();

  const { location: { pathname } } = history;

  const saveSearchOpt = ({ target }) => {
    if (target.name === 'search') setOptSearch(target.value);
    else setTextSearch(target.value);
  };

  const fetchingApi = async (event) => {
    event.preventDefault();
    if (!textSearch || !optSearch) {
      fireToast('Please, select an option and type in the search field to search!');
      return;
    }
    if (optSearch === 'firstLetter' && textSearch.length > 1) {
      fireToast('Your search must have only 1 (one) character!');
      return;
    }
    const data = await fetchRecipes(pathname, optSearch, textSearch);
    if (error) {
      fireToast('Sorry, we haven\'t found any recipes for these filters.');
      return;
    }
    setRecipes(data.slice(0, MAX_RECIPES));
    if (data.length === 1) {
      history.push(`${pathname}/${pathname === '/meals'
        ? data[0].idMeal : data[0].idDrink}`);
    }
  };

  return (
    <div>
      <form>
        <div>
          <input
            className="reset-input search-input placeholder:text-[var(--gray)]"
            type="text"
            onChange={ saveSearchOpt }
            name="textSearch"
            data-testid="search-input"
            placeholder="Type Here"
          />
          <button onClick={ fetchingApi } data-testid="exec-search-btn">Search</button>
        </div>
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
      </form>
    </div>
  );
}

export default SearchBar;
