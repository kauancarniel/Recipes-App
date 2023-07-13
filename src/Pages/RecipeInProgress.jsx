import React, { useEffect, useState } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import imgcompt from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function RecipeInProgress() {
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const [recipeInProgress, setRecipeInProgress] = useState(null);
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchRecipeInProgress = async () => {
      const response = await fetch(
        window.location.pathname.includes('meals')
          ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
          : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
      );
      const data = await response.json();
      setRecipeInProgress(data.meals?.[0] || data.drinks?.[0]);
    };

    fetchRecipeInProgress();
  }, [id]);

  const getLocalStorageKey = () => `checkedIngredients_${location.pathname}`;

  useEffect(() => {
    const storedCheckedIngredients = JSON.parse(
      localStorage.getItem(getLocalStorageKey()),
    );
    if (storedCheckedIngredients) {
      setCheckedIngredients(storedCheckedIngredients);
    }
  }, []);

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const isRecipeFavorited = favoriteRecipes.some(
      (favoriteRecipe) => favoriteRecipe.id === id && favoriteRecipe.type === recipeType,
    );
    setIsFavorite(isRecipeFavorited);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      getLocalStorageKey(),
      JSON.stringify(checkedIngredients),
    );
  }, [checkedIngredients]);

  const handleIngredientClick = (event, ingredientIndex) => {
    const { target } = event;
    const isChecked = target.checked;
    if (isChecked) {
      setCheckedIngredients([...checkedIngredients, ingredientIndex]);
    } else {
      const updatedCheckedIngredients = checkedIngredients.filter(
        (index) => index !== ingredientIndex,
      );
      setCheckedIngredients(updatedCheckedIngredients);
    }
  };

  const renderIngredients = () => {
    const limiteDeIngredientes = 21;
    const ingredients = [];
    for (let index = 0; index <= limiteDeIngredientes; index += 1) {
      const ingredient = recipeInProgress[`strIngredient${index}`];
      if (ingredient) {
        const ingredientStepTestId = `${index - 1}-ingredient-step`;
        const isChecked = checkedIngredients.includes(index);
        ingredients.push(
          <label
            key={ index }
            data-testid={ ingredientStepTestId }
            style={ {
              textDecoration: isChecked
                ? 'line-through solid rgb(0, 0, 0)'
                : 'none',
            } }
          >
            <input
              type="checkbox"
              checked={ isChecked }
              onChange={ (event) => handleIngredientClick(event, index) }
            />
            {ingredient}
          </label>,
        );
      }
    }
    return ingredients;
  };

  if (!recipeInProgress) {
    return <div>Loading...</div>;
  }

  const {
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
    strDrinkThumb,
    strDrink,
    strAlcoholic,
  } = recipeInProgress;

  const addRecipeToLocalStorage = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const newRecipe = {
      id: recipeInProgress.idMeal || recipeInProgress.idDrink,
      nationality: recipeInProgress.strArea || '',
      name: recipeInProgress.strMeal || recipeInProgress.strDrink,
      category: recipeInProgress.strCategory || recipeInProgress.strAlcoholic,
      image: recipeInProgress.strMealThumb || recipeInProgress.strDrinkThumb,
      tags: recipeInProgress.strTags ? recipeInProgress.strTags.split(',') : [],
      alcoholicOrNot: recipeInProgress.strAlcoholic || '',
      type: recipeInProgress.idMeal ? 'meal' : 'drink',
      doneDate: new Date().toISOString(),
    };
    localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, newRecipe]));
  };

  const verifyChecked = checkedIngredients.length === renderIngredients().length;

  const finishRecipe = () => {
    addRecipeToLocalStorage();
    history.push('/done-recipes');
  };

  // const recipeDetailsPathname = window.location.pathname.replace('/in-progress', '');

  return (
    <div>
      <div>
        <p data-testid="recipe-category">
          {strMeal ? strCategory : `${strCategory} : ${strAlcoholic}`}
        </p>
        <button
          data-testid="share-btn"
          type="button"
          className="compartilhar"
          onClick={ () => copy(window.location.href) && setLinkCopy(true) }
        >
          <img src={ imgcompt } alt="compartilhar" />
        </button>
        <button
          data-testid="favorite-btn"
          type="button"
          onClick={ () => handleFavorite() }
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }

        >
          {
            isFavorite ? (
              <img src={ blackHeartIcon } alt="Favorito" />
            ) : (
              <img src={ whiteHeartIcon } alt="Não favorito" />
            )
          }
        </button>
        {/* <Compartilhar pathname={ recipeDetailsPathname } />
        <Liked receita={ recipeInProgress } /> */}
      </div>
      <div>
        <img
          data-testid="recipe-photo"
          src={ strMealThumb || strDrinkThumb }
          alt="foto da receita"
        />
        <h1 data-testid="recipe-title">{strMeal || strDrink}</h1>
      </div>
      <div>
        <div>
          <h2>Ingredientes:</h2>
          {renderIngredients()}
        </div>
        <p data-testid="instructions">{strInstructions}</p>
        <button
          data-testid="finish-recipe-btn"
          onClick={ finishRecipe }
          disabled={ !verifyChecked }
          style={ {
            position: 'fixed',
            bottom: '0px',
            width: '100%',
          } }
        >
          Finalizar Receita
        </button>
      </div>
    </div>
  );
}

export default RecipeInProgress;
