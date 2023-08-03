import React from 'react';
import Header from '../components/Header';
import Filter from '../components/Filter';

export default function MyRecipes() {
  return (
    <>
      <Header title="My Recipes" />
      <main className="recipe-box bg-form glass p-10 mb-16 rounded-b-lg">
        <Filter />
      </main>
    </>
  );
}
