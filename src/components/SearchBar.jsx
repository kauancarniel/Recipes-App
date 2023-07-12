import React, { useContext, useState } from 'react';

import RecipesContext from '../context/RecipesContext';

const alert = 'Your search must have only 1 (one) character';
const MAX_RECIPES = 12;

function SearchBar() {
  const [optSearch, setOptSearch] = useState('');
  const [textSearch, setTextSearch] = useState('');
  const { setRecipes } = useContext(RecipesContext);
  const { location } = useHistory();

  const saveSearchOpt = ({ target }) => {
    if (target.name === 'search') setOptSearch(target.value);
    else if (target.name === 'textSearch') setTextSearch(target.value);
  };

  const fetchingApi = async (event) => {
    event.preventDefault();
    if (optSearch === 'firstLetter' && textSearch.length > 1) {
      global.alert(alert);
    } else {
      const data = await fetchApi(location.pathname, optSearch, textSearch);
      setRecipes(data.slice(0, MAX_RECIPES));
    }
  };

  return (
    <div data-testid="search-top-btn">
      <form>
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
        <input
          type="text"
          onChange={ saveSearchOpt }
          name="textSearch"
          data-testid="search-input"
          placeholder="Type here"
        />
        <button onClick={ fetchingApi } data-testid="exec-search-btn">Search</button>
      </form>
    </div>
  );
}

export default SearchBar;
