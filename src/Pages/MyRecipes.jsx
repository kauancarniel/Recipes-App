import React, { useContext, useEffect, useState } from 'react';

import RecipesContext from '../context/RecipesContext';
import useUser from '../hooks/useUser';
import useRecipe from '../hooks/useRecipe';
import Header from '../components/Header';
import Filter from '../components/Filter';
import FormCreateRecipe from '../components/FormCreateRecipe';
import RecipeItem from '../components/RecipeItem';

export default function MyRecipes() {
  const { filter, recipes, recipeEdit, userLogged } = useContext(RecipesContext);
  const { validateCookie } = useUser();
  const { getMyRecipes } = useRecipe();
  const [type, setType] = useState('Meal');
  const [newRecipe, setNewRecipe] = useState(false);

  const { id } = userLogged || { id: 0 };

  useEffect(() => {
    (async () => {
      await validateCookie();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await getMyRecipes({ key: 'strUserId', value: id });
    })();
  }, [userLogged]);

  const createRecipe = () => {
    setNewRecipe(!newRecipe);
  };

  const fiilteredRecipes = filter === 'all' ? recipes
    : recipes.filter((recipe) => recipe.strType === filter);

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
        {!recipes.length ? (
          <div className="no-search">
            <h2 className="text-[var(--yellow)] text-2xl">Make Recipes</h2>
          </div>
        )
          : (
            <section className="ready-recipe">
              {fiilteredRecipes.map((recipe, index) => (
                <RecipeItem
                  key={ index }
                  recipe={ recipe }
                  setNewRecipe={ setNewRecipe }
                />
              ))}
            </section>
          )}
      </main>
      { newRecipe && (
        <FormCreateRecipe
          type={ recipeEdit
            ? `${recipeEdit.strType[0].toUpperCase()}${recipeEdit.strType.slice(1)}`
            : type }
          setNewRecipe={ setNewRecipe }
        />
      ) }
    </>
  );
}
