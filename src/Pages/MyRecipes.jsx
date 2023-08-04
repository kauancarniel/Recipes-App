import React, { useContext, useEffect, useState } from 'react';

import Header from '../components/Header';
import Filter from '../components/Filter';
import FormCreateRecipe from '../components/FormCreateRecipe';
import RecipesContext from '../context/RecipesContext';
import { fetchMyRecipes } from '../services/fetchAPI';
import RecipeItem from '../components/RecipeItem';

export default function MyRecipes() {
  const { filter } = useContext(RecipesContext);
  const [type, setType] = useState('Meal');
  const [newRecipe, setNewRecipe] = useState(false);
  const [recipesData, setRecipesData] = useState([]);

  useEffect(() => {
    (async () => {
      const recipesDataBase = await fetchMyRecipes();
      setRecipesData(recipesDataBase);
    })();
  }, []);

  const createRecipe = () => {
    setNewRecipe(!newRecipe);
  };

  const fiilteredRecipes = filter === 'all' ? recipesData
    : recipesData.filter((recipe) => recipe.strType === filter);

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
        {!recipesData.length ? (
          <div className="no-search">
            <h2 className="text-[var(--yellow)] text-2xl">Make Recipes</h2>
          </div>
        )
          : (
            <section className="ready-recipe">
              {fiilteredRecipes.map((recipe, index) => (
                <RecipeItem key={ index } recipe={ recipe } />
              ))}
            </section>
          )}
      </main>
      { newRecipe && <FormCreateRecipe type={ type } setNewRecipe={ setNewRecipe } /> }
    </>
  );
}
