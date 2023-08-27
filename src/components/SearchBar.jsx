import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import RecipesContext from '../context/RecipesContext';
import useFetch from '../hooks/useFetch';
import useRecipe from '../hooks/useRecipe';

const MAX_RECIPES = 12;
const radiosOpt = ['Name', 'Ingredient', 'First-Letter'];

function SearchBar() {
  const { getAllUsersRecipe } = useRecipe();
  const [optSearch, setOptSearch] = useState('name');
  const [textSearch, setTextSearch] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const { setRecipes, error } = useContext(RecipesContext);
  const { fetchRecipes, fireToast, initialFetch } = useFetch();
  const history = useHistory();

  const { location: { pathname } } = history;

  const saveSearchOpt = ({ target }) => {
    if (target.name === 'search') setOptSearch(target.value);
    else setTextSearch(target.value);
  };

  const fetchingApi = async (event) => {
    event.preventDefault();
    if (isSearch) {
      setOptSearch('name');
      setTextSearch('');
      setIsSearch(false);
      await initialFetch(pathname);
      return;
    }
    if (!textSearch || !optSearch) {
      fireToast('Please, select an option and type in the search field to search!');
      return;
    }
    if (optSearch === 'firstLetter' && textSearch.length > 1) {
      fireToast('Your search must have only 1 (one) character!');
      return;
    }
    const type = pathname.includes('/meals') ? 'Meal' : 'Drink';
    const isUserRecipe = pathname.includes('users');
    const data = isUserRecipe
      ? await getAllUsersRecipe(
        ['strType', optSearch, '_sort', '_order'],
        [type.toLowerCase(), textSearch, 'strCreateAt', 'desc'],
      )
      : await fetchRecipes(pathname, optSearch, textSearch);
    if (error || !data) {
      fireToast('Sorry, we haven\'t found any recipes for these filters.');
      return;
    }
    setRecipes(data.slice(0, MAX_RECIPES));
    setIsSearch(true);
    if (data.length === 1) {
      history.push(`${pathname}/${isUserRecipe ? data[0].id : data[0][`id${type}`]}`);
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
          value={ textSearch }
          data-testid="search-input"
          placeholder="Type Here"
        />
        <button
          className="reset-btn search-btn"
          onClick={ fetchingApi }
          data-testid="exec-search-btn"
        >
          {isSearch ? 'Clear' : 'Search'}
        </button>
      </div>
      <div className="flex justify-evenly items-center w-full">
        { radiosOpt.map((radio) => (
          <label
            key={ radio }
            className={ `${optSearch === radio.toLowerCase()
              ? 'text-[var(--red)] font-bold' : 'text-[var(--green)]'} cursor-pointer` }
            htmlFor={ radio }
          >
            <input
              className="hidden"
              id={ radio }
              type="radio"
              value={ radio.toLowerCase() }
              checked={ optSearch === radio.toLowerCase() }
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
