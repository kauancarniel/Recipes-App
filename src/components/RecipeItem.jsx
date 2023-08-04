import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { MdOutlineDelete } from 'react-icons/md';
import { AiOutlineEdit } from 'react-icons/ai';

import RecipesContext from '../context/RecipesContext';
import useFetch from '../hooks/useFetch';
import useRecipe from '../hooks/useRecipe';
import ShareBtn from './ShareBtn';

function RecipeItem({ recipe, setNewRecipe }) {
  const { setRecipeEdit } = useContext(RecipesContext);
  const { deleteRecipe } = useRecipe();
  const { sweetAlert } = useFetch();

  const { strType, strTags, strArea, strCategory,
    strAlcoholic, strCreateAt, id } = recipe;
  const type = strType === 'meal' ? 'Meal' : 'Drink';
  const tags = strTags ? strTags.split(',').splice(0, 2) : [];

  return (
    <div className="border-grey container-ready p-0">
      <div>
        <img className="detail-img" src={ recipe[`str${type}Thumb`] } alt="RecipeIMG" />
      </div>
      <div className="lg:p-3 p-[0.7rem] w-[100%]">
        <div className="flex justify-between items-center">
          <h4 className="title-done">{recipe[`str${type}`]}</h4>
        </div>
        <p className="text-[var(--gray)] text-sm mb-1">
          {strType === 'meal' ? `${strArea} - ${strCategory}` : strAlcoholic}
        </p>
        <div className="justify-normal flex w-[100%]">
          <p className="text-[var(--darkYellow)] text-xs sm:text-sm mb-3">
            Create In:
            {' '}
            <span
              className="text-white"
            >
              { new Date(strCreateAt).toLocaleDateString('en-US')}
            </span>
          </p>
        </div>
        <div className="flex w-full gap-2 flex-wrap">
          {tags.map((tag) => (
            <div
              className="tag"
              key={ tag }
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col p-1">
        <ShareBtn type={ `/${strType}s` } id={ `${id}` } testId="share-btn" />
        <button
          className="reset-btn text-[var(--yellow)]"
          type="button"
          onClick={ () => {
            setNewRecipe(true);
            setRecipeEdit(recipe);
          } }
        >
          <AiOutlineEdit size="40px" />
        </button>
        <button
          type="button"
          className="reset-btn del-in-progress-btn"
          onClick={ () => sweetAlert(deleteRecipe, id) }
        >
          <MdOutlineDelete size="40px" />
        </button>
      </div>
    </div>
  );
}

RecipeItem.propTypes = {
  recipe: PropTypes.shape({
    strMealThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
    strType: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    strArea: PropTypes.string,
    strCategory: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strTags: PropTypes.string,
    strCreateAt: PropTypes.string.isRequired,
  }).isRequired,
  setNewRecipe: PropTypes.func.isRequired,
};

export default RecipeItem;
