import React, { useState } from 'react';

const alert = 'Your search must have only 1 (one) character';

function SearchBar() {
  const [optSearch, setOptSearch] = useState('');
  const [textSearch, setTextSearch] = useState('');

  const saveSearchOpt = ({ target }) => {
    if (target.name === 'search') setOptSearch(target.value);
    else if (target.name === 'textSearch') setTextSearch(target.value);
  };

  const fetchingApi = async (event) => {
    event.preventDefault();
    let endpoint = '';
    if (optSearch === 'ingredient') endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${textSearch}`;
    else if (optSearch === 'name') endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${textSearch}`;
    else if (optSearch === 'firstLetter') {
      if (textSearch.length > 1) global.alert(alert);
      else if (textSearch.length === 1) endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${textSearch[0]}`;
    }
    const response = await fetch(endpoint);
    const data = await response.json();
    console.log(data);
  };

  return (
    <div data-testid="search-top-btn">
      <form>
        <input
          type="radio"
          value="ingredient"
          name="search"
          data-testid="ingredient-search-radio"
          onChange={ saveSearchOpt }
        />
        Ingredient
        <input
          type="radio"
          value="name"
          name="search"
          data-testid="name-search-radio"
          onChange={ saveSearchOpt }
        />
        Name
        <input
          type="radio"
          value="firstLetter"
          name="search"
          data-testid="first-letter-search-radio"
          onChange={ saveSearchOpt }
        />
        First letter
        <input
          type="text"
          onChange={ saveSearchOpt }
          name="textSearch"
          data-testid="search-input"
        />
        <button onClick={ fetchingApi } data-testid="exec-search-btn">Pesquisar</button>
      </form>
    </div>
  );
}

export default SearchBar;
