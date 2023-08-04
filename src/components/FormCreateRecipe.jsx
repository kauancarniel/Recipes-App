import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TfiClose } from 'react-icons/tfi';
import { RiAddLine } from 'react-icons/ri';

import RecipesContext from '../context/RecipesContext';
import useRecipe from '../hooks/useRecipe';
import useFetch from '../hooks/useFetch';
import IngredientsInputs from './IngredientsInputs';
import './FormCommentary.css';
import '../Pages/Login.css';
import InfosInputsRecipe from './InfosInputsRecipe';

const fifteen = 15;
const twenty = 20;

export default function FormCreateRecipe({ type, setNewRecipe }) {
  const { categories, loading } = useContext(RecipesContext);
  const { formatedRecipe, postMyRecipe } = useRecipe();
  const { fetchCategories } = useFetch();
  const [infosRecipe, setInfosRecipe] = useState(() => formatedRecipe(type));

  useEffect(() => {
    (async () => {
      await fetchCategories(`/${type.toLowerCase()}s`);
      setInfosRecipe({ ...infosRecipe, strCategory: categories[0] });
    })();
  }, []);

  const handleChange = ({ name, value }) => {
    setInfosRecipe({ ...infosRecipe, [name]: value });
  };

  const ingredients = Object.entries(infosRecipe)
    .filter(([key]) => key.includes('strIngredient'));
  const MAX_INGREDIENTS = type === 'Drink' ? fifteen : twenty;

  const addIngredient = () => {
    setInfosRecipe({ ...infosRecipe,
      [`strIngredient${ingredients.length + 1}`]: '',
      [`strMeasure${ingredients.length + 1}`]: '' });
  };

  return (
    <div className="form-new-recipe-container z-50">
      <form
        className="form-new-recipe"
        onSubmit={ (e) => {
          e.preventDefault();
          postMyRecipe(infosRecipe);
          setNewRecipe(false);
        } }
      >
        { loading ? (
          <p className="font-bold text-[var(--yellow)]">Loading...</p>
        ) : (
          <>
            <button
              className="reset-btn text-[var(--yellow)] absolute top-3 right-3"
              type="button"
              onClick={ () => setNewRecipe(false) }
            >
              <TfiClose size="35px" />
            </button>
            <InfosInputsRecipe
              infosRecipe={ infosRecipe }
              handleChange={ handleChange }
              type={ type }
              categories={ categories }
            />
            <div className="list-ingredients-container">
              <div className="text-[var(--yellow)] flex gap-2 items-center">
                <h3 className="mb-0">
                  Ingredients
                </h3>
                <button
                  className="reset-btn text-[var(--yellow)]"
                  type="button"
                  disabled={ ingredients.length >= MAX_INGREDIENTS }
                  onClick={ addIngredient }
                >
                  <RiAddLine size="35px" />
                </button>
              </div>
              <IngredientsInputs
                ingredients={ ingredients }
                handleChange={ handleChange }
                infosRecipe={ infosRecipe }
                type={ type }
              />
            </div>
            <div className="flex flex-col gap-y-2 w-full">
              <h3 className="text-[var(--yellow)] ml-2 mb-2">
                Instructions
              </h3>
              <textarea
                className="textarea"
                maxLength="1000"
                id="formComment"
                name="strInstructions"
                cols="50"
                rows="5"
                value={ infosRecipe.strInstructions }
                onChange={ ({ target }) => handleChange(target) }
                placeholder="Add a Instructions..."
              />
            </div>
            <div className="flex-center gap-4 h-fit w-full">
              <button
                className="button"
              >
                CREATE
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

FormCreateRecipe.propTypes = {
  type: PropTypes.string.isRequired,
  setNewRecipe: PropTypes.func.isRequired,
};
