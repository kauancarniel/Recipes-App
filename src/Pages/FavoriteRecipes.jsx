import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import imgcompt from '../images/shareIcon.svg';
import Header from '../components/Header';

const timeMessage = 1000;

function FavoriteRecipes() {
  const [favoritesDefault, setDefaultFavorites] = useState([]);
  const [favorites, setFavorites] = useState(favoritesDefault);
  const [coping, setCopy] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const storage = localStorage.getItem('favoriteRecipes');
    setDefaultFavorites(JSON.parse(storage));
    setFavorites(JSON.parse(storage));
  }, []);

  useEffect(() => {
    setTimeout(() => setCopy(false), timeMessage);
  }, [coping]);

  const deleteFavorite = ({ target }) => {
    const newFavorites = favorites.filter((recipe) => recipe.id !== target.name);
    setFavorites(newFavorites);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
  };

  const filter = ({ target }) => {
    if (target.name === 'all') setFavorites(favoritesDefault);
    else {
      const faFiltered = favoritesDefault.filter((recipe) => recipe.type === target.name);
      setFavorites(faFiltered);
    }
  };

  return (
    <div>
      <Header title="Profile" iconeProfile search={ false } />
      <button data-testid="filter-by-all-btn" onClick={ filter } name="all">All</button>
      <button
        data-testid="filter-by-meal-btn"
        onClick={ filter }
        name="meal"
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ filter }
        name="drink"
      >
        Drinks
      </button>
      {coping && <p>Link copied!</p>}
      <nav>
        {!favorites ? <p>Sem favoritos</p> : favorites.map((recipe, index) => (
          <div key={ index }>
            <button
              onClick={ deleteFavorite }
            >
              <img
                src={ blackHeartIcon }
                alt="Favorito"
                name={ recipe.id }
                data-testid={ `${index}-horizontal-favorite-btn` }
              />
            </button>
            <button
              className="compartilhar"
              onClick={ () => {
                setCopy(true);
                copy(recipe.type === 'meal' ? `http://localhost:3000/meals/${recipe.id}` : `http://localhost:3000/drinks/${recipe.id}`);
              } }
            >
              <img
                src={ imgcompt }
                alt="compartilhar"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>
            {recipe.type === 'meal' ? (
              <button onClick={ () => history.push(`/meals/${recipe.id}`) }>
                <img
                  src={ recipe.image }
                  alt="foto da comida"
                  data-testid={ `${index}-horizontal-image` }
                />
                <a href={ `/meals/${recipe.id}` }>
                  <p data-testid={ `${index}-horizontal-name` }>{ recipe.name }</p>
                  <p data-testid={ `${index}-horizontal-top-text` }>
                    { `${recipe.nationality} - ${recipe.category}` }
                  </p>
                </a>
              </button>
            ) : (
              <button onClick={ () => history.push(`/drinks/${recipe.id}`) }>
                <img
                  src={ recipe.image }
                  alt="Foto da bebida"
                  data-testid={ `${index}-horizontal-image` }
                />
                <a href={ `/drinks/${recipe.id}` }>
                  <p data-testid={ `${index}-horizontal-name` }>{ recipe.name }</p>
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    { recipe.alcoholicOrNot }
                  </p>
                </a>
              </button>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}

export default FavoriteRecipes;
