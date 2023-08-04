import React from 'react';
import PropTypes from 'prop-types';
import ShareBtn from './ShareBtn';

function RecipeItem({ recipe }) {
  const { strMealThumb,
    strMeal, strDrink, strType, id, strArea, strCategory, Alcoholic, strTags } = recipe;

  return (
    <div className="border-grey container-ready p-0">
      <div>
        <img className="detail-img" src={ strMealThumb } alt="RecipeIMG" />
      </div>
      <div className="lg:p-3 p-[0.7rem] w-[100%]">
        <div className="flex justify-between items-center">
          <h4 className="title-done">{strMeal || strDrink}</h4>
          <div>
            <ShareBtn type={ `/${strType}s` } id={ id } />
          </div>
        </div>
        <p className="text-[var(--gray)] text-sm mb-1">
          {strType === 'meal' ? `${strArea} - ${strCategory}` : Alcoholic}
        </p>
        <div className="flex w-full gap-2 flex-wrap">
          <p className="tag mt-3">
            {strTags}
          </p>
        </div>
      </div>
    </div>
  );
}

RecipeItem.propTypes = {
  recipe: PropTypes.shape({
    strMealThumb: PropTypes.string.isRequired,
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
    strType: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    strArea: PropTypes.string,
    strCategory: PropTypes.string,
    Alcoholic: PropTypes.string,
    strTags: PropTypes.string,
  }).isRequired,
};

export default RecipeItem;
