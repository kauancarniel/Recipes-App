import React, { useState } from 'react';

import Header from '../components/Header';
import Filter from '../components/Filter';
import FormCreateRecipe from '../components/FormCreateRecipe';

export default function MyRecipes() {
  const [type, setType] = useState('Meal');
  const [newRecipe, setNewRecipe] = useState(false);
  const createRecipe = () => {
    setNewRecipe(!newRecipe);
  };

  // const { filter } = useContext(RecipesContext);
  return (
    <>
      <Header title="My Recipes" />
      <main className="recipe-box bg-form glass p-10 mb-16 rounded-b-lg">
        <div className="flex justify-center mb-5">
          <select
            className="reset-input input w-fit"
            value={ type }
            onChange={ ({ target }) => setType(target.value) }
          >
            <option className="text-black" value="Meal">Meal</option>
            <option className="text-black" value="Drink">Drink</option>
          </select>
          <button
            className="button"
            onClick={ createRecipe }
          >
            Create Recipe
          </button>
        </div>
        <Filter />
      </main>
      { newRecipe && <FormCreateRecipe type={ type } setNewRecipe={ setNewRecipe } /> }
    </>
  );
}
