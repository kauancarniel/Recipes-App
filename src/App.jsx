import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Recipes from './Pages/Recipes';
import Login from './Pages/Login';
import DoneRecipes from './Pages/DoneRecipes';
import FavoriteRecipes from './Pages/FavoriteRecipes';
import Profile from './Pages/Profile';
import Recipe from './Pages/Recipe';
import NotFound from './Pages/NotFound';
import Register from './Pages/Register';
import './App.css';
import RememberPass from './Pages/RememberPass';
import Ranking from './Pages/Ranking';

function App() {
  return (
    <Switch>
      <Route path="/" component={ Login } exact />
      <Route path="/meals" component={ Recipes } exact />
      <Route path="/drinks" component={ Recipes } exact />
      <Route path="/meals/:id" component={ Recipe } exact />
      <Route path="/drinks/:id" component={ Recipe } exact />
      <Route path="/meals/:id/in-progress" component={ Recipe } />
      <Route path="/drinks/:id/in-progress" component={ Recipe } />
      <Route path="/profile" component={ Profile } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route path="/signup" component={ Register } />
      <Route path="/remember-password" component={ RememberPass } />
      <Route path="/ranking" component={ Ranking } />
      <Route path="*" component={ NotFound } />
    </Switch>
  );
}

export default App;
