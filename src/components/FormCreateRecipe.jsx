import React, { useState, useContext, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { TfiClose } from 'react-icons/tfi';
import { RiAddLine } from 'react-icons/ri';
import { MdPublicOff, MdPublic } from 'react-icons/md';

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
  const { categories, loading, recipeEdit, setRecipeEdit } = useContext(RecipesContext);
  const { formatedRecipe, postMyRecipe, patchRecipe } = useRecipe();
  const { fetchCategories } = useFetch();
  const [infosRecipe, setInfosRecipe] = useState(() => formatedRecipe(type, recipeEdit));

  useLayoutEffect(() => {
    (async () => {
      await fetchCategories(`/${type.toLowerCase()}s`);
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

  const newRecipe = async () => {
    postMyRecipe(infosRecipe);
    setNewRecipe(false);
  };

  const editRecipe = async () => {
    await patchRecipe(infosRecipe);
    setNewRecipe(false);
    setRecipeEdit(null);
  };

  return (
    <div className="form-new-recipe-container z-50">
      <form
        className="form-new-recipe"
        onSubmit={ (e) => {
          e.preventDefault();
          if (!recipeEdit) {
            newRecipe();
          } else {
            editRecipe();
          }
        } }
      >
        { loading ? (
          <p className="font-bold text-[var(--yellow)]">Loading...</p>
        ) : (
          <>
            <button
              className="reset-btn text-[var(--yellow)] absolute top-3 right-3"
              type="button"
              onClick={ () => {
                setNewRecipe(false);
                setRecipeEdit(null);
              } }
            >
              <TfiClose size="35px" />
            </button>
            <InfosInputsRecipe
              infosRecipe={ infosRecipe }
              handleChange={ handleChange }
              type={ type }
              categories={ categories }
              setInfosRecipe={ setInfosRecipe }
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
            <div className="flex-center gap-3 h-fit w-full text-white">
              <label
                htmlFor="strPublic"
                className="flex gap-1 cursor-pointer font-bold"
              >
                <div className="flex-center gap-2">
                  VISIBILITY:
                  {' '}
                  { infosRecipe.strPublic ? (
                    <MdPublic size="30px" />
                  ) : (
                    <MdPublicOff size="30px" />
                  )}
                </div>
                <input
                  className="hidden"
                  type="checkbox"
                  name="strPublic"
                  id="strPublic"
                  checked={ infosRecipe.strPublic }
                  onChange={
                    ({ target: { name, checked } }) => setInfosRecipe({
                      ...infosRecipe, [name]: checked })
                  }
                />
              </label>
              <button
                className="button"
              >
                {recipeEdit ? 'UPDATE' : 'CREATE'}
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
