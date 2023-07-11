import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import copy from 'clipboard-copy';
import imgcompt from '../images/shareIcon.svg';
import { fetchDrink,
  fetchFood, fetchRecomendsDrinks, fetchRecomendsMeals } from '../api/RecipeDetais';
import RecipeContent from '../components/RecipeData';
import RecipeCarousel from '../components/RecipeCarousel';
import { handleStartRecipe, handleFavoriteRecipe } from '../utils/RecipeDetailsFunctions';

function RecipeDetails() {
  const [foodData, setFoodData] = useState(null);
  const [drinkData, setDrinkData] = useState(null);
  const [recomendsMeals, setRecomendsMeals] = useState([]);
  const [recomendsDrinks, setRecomendsDrinks] = useState([]);
  const [recipeStatus, setRecipeStatus] = useState(false);
  const [linkCopy, setLinkCopy] = useState(false);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const fetchRecipes = async () => {
      const food = await fetchFood(id);
      const drink = await fetchDrink(id);
      const recomendMeals = await fetchRecomendsMeals();
      const recomendDrinks = await fetchRecomendsDrinks();
      setFoodData(food);
      setDrinkData(drink);
      setRecomendsMeals(recomendMeals);
      setRecomendsDrinks(recomendDrinks);
    };

    fetchRecipes();

    // Caso queira entender melhor verificar chave inProgress no readme do projeto.
    const progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (progressRecipes) {
      const { meals, drinks } = progressRecipes;
      if ((meals && meals[id]) || (drinks && drinks[id])) {
        setRecipeStatus(true);
      }
    }
  }, [id]);

  // Condição necessária para ciclo de vida do componente;
  if (!foodData && !drinkData) {
    return <div>Loading...</div>;
  }
  // função para copiar link
  const handleShareClick = () => {
    const recipeLink = window.location.href;
    copy(recipeLink);
    setLinkCopy(true);
  };

  // const para receber a receita de comida ou bebida;
  const recipe = foodData || drinkData;

  // const para verificar se a receita é de comida ou bebida;
  const { strMeal } = recipe;

  // condição que verifica se a receita é de comida ou bebida;
  const recipeType = strMeal ? 'meal' : 'drink';

  // variavel para quantia de recomendações;
  const QNT_RECOMMENDS = 6;

  return (
    <div className="recipes">
      <RecipeContent recipe={ recipe } />

      {recipeType === 'meal' && (
        <RecipeCarousel
          recommendations={ recomendsMeals }
          recipeQntRecomend={ QNT_RECOMMENDS }
          recipeType={ recipeType }
        />
      )}

      {recipeType === 'drink' && (
        <RecipeCarousel
          recommendations={ recomendsDrinks }
          recipeQntRecomend={ QNT_RECOMMENDS }
          recipeType={ recipeType }
        />
      )}
      <div className="btn-recipe">
        <button
          onClick={ () => handleStartRecipe(recipeType, id, history) }
          type="button"
          data-testid="start-recipe-btn"
        >
          {recipeStatus ? 'Continue Recipe' : 'Start Recipe'}
        </button>
        <button
          data-testid="share-btn"
          type="button"
          className="compartilhar"
          onClick={ () => handleShareClick() }
        >
          <img src={ imgcompt } alt="compartilhar" />

        </button>
        <button
          data-testid="favorite-btn"
          type="button"
          onClick={ () => handleFavoriteRecipe(recipe, id, recipeType) }
        >
          Favoritar
        </button>

      </div>
      <div className="link-copy">
        {linkCopy && (
          <p>Link copied!</p>
        )}

      </div>
    </div>
  );
}

export default RecipeDetails;
