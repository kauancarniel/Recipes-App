import React from 'react';
import PropTypes from 'prop-types';

const focus = 'peer-focus:-top-5 peer-focus:text-xs';
const valid = 'peer-valid:-top-5 peer-valid:text-xs';

function IngredientsInputs({ ingredients, handleChange, infosRecipe, type }) {
  return (
    <div className="flex flex-col overflow-y-scroll h-[289px] gap-3 pt-3">
      {ingredients.map(([key, value], index) => (
        <div
          className="flex w-full justify-between gap-2"
          key={ key }
        >
          <div className="user-box self-center">
            <input
              type="text"
              name={ key }
              value={ value }
              className="peer reset-input input"
              id={ key }
              onChange={ ({ target }) => handleChange(target) }
            />
            <label
              className={
                `label ${focus} ${infosRecipe[`str${type}`].length ? valid : ''}`
              }
              htmlFor={ key }
            >
              { `Ingredient ${index + 1}`}
            </label>
          </div>
          <div className="user-box self-center w-[55%]">
            <input
              type="text"
              name={ `strMeasure${index + 1}` }
              value={ infosRecipe[`strMeasure${index + 1}`] }
              className="peer reset-input input"
              id={ `strMeasure${index + 1}` }
              onChange={ ({ target }) => handleChange(target) }
            />
            <label
              className={
                `label ${focus} ${infosRecipe[`str${type}`].length ? valid : ''}`
              }
              htmlFor={ `strMeasure${index + 1}` }
            >
              { `Measure ${index + 1}`}
            </label>
          </div>
        </div>))}
    </div>
  );
}

IngredientsInputs.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  handleChange: PropTypes.func.isRequired,
  infosRecipe: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default IngredientsInputs;
