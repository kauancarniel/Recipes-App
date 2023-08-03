import React, { useState } from 'react';
import Header from '../components/Header';
import Filter from '../components/Filter';
import FormCreateRecipe from '../components/FormCreateRecipe';

export default function MyRecipes() {
  const [newRecipe, setNewRecipe] = useState(false);
  const funcTest = () => {
    setNewRecipe(!newRecipe);
  };
 
  const { filter } = useContext(RecipesContext);
  return (
    <>
      <Header title="My Recipes" />
      <main className="recipe-box bg-form glass p-10 mb-16 rounded-b-lg">
        <button onClick={ funcTest }>Criar Uma nova receita</button>
        <Filter />
        { newRecipe && <FormCreateRecipe /> }
      </main>
    </>
  );
}
