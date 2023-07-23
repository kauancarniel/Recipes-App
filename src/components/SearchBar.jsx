import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import RecipesContext from '../context/RecipesContext';
import useFetch from '../hooks/useFetch';

const MAX_RECIPES = 12;
const radiosOpt = ['Name', 'Ingredient', 'First-Letter'];

function SearchBar() {
  const [optSearch, setOptSearch] = useState('Name');
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
    <form className="flex-center flex-col w-full max-w-md gap-y-1">
      <div className="flex-center w-full">
        <input
          className="reset-input search-input placeholder:text-[var(--gray)]"
          type="text"
          onChange={ saveSearchOpt }
          name="textSearch"
          data-testid="search-input"
          placeholder="Type Here"
        />
        <button
          className="reset-btn search-btn"
          onClick={ fetchingApi }
          data-testid="exec-search-btn"
        >
          Search
        </button>
      </div>
      <div className="flex justify-evenly items-center w-full">
        { radiosOpt.map((radio) => (
          <label
            key={ radio }
            className={ `${optSearch === radio
              ? 'text-[var(--red)] font-bold' : 'text-[var(--green)]'} cursor-pointer` }
            htmlFor={ radio }
          >
            <input
              className="hidden"
              id={ radio }
              type="radio"
              value={ radio }
              name="search"
              data-testid={ `${radio.toLocaleLowerCase()}-search-radio` }
              onChange={ saveSearchOpt }
            />
            { radio.replace('-', ' ') }
          </label>
        ))}
      </div>
    </form>
  );
}

export default SearchBar;
