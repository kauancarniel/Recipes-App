import React from 'react';
import PropTypes from 'prop-types';

const focus = 'peer-focus:-top-5 peer-focus:text-xs';
const valid = 'peer-valid:-top-5 peer-valid:text-xs';
const classLabel = `label ${focus} ${valid}`;

function InfosInputsRecipe({ infosRecipe, handleChange,
  categories, type, setInfosRecipe }) {
  return (
    <div className="flex flex-col mt-3 h-[324px]">
      <h3 className="text-[var(--yellow)] m-0">Infos</h3>
      <div className="user-box self-center mt-3">
        <input
          className="peer reset-input input"
          id="nameRecipe"
          value={ infosRecipe[`str${type}`] }
          type="text"
          name={ `str${type}` }
          onChange={ ({ target }) => handleChange(target) }
        />
        <label
          className={
            `label ${focus} ${infosRecipe[`str${type}`].length ? valid : ''}`
          }
          htmlFor="nameRecipe"
        >
          Name
        </label>
      </div>
      <div className="user-box self-center mt-3">
        <select
          className="peer reset-input input"
          id="categoryRecipe"
          value={ infosRecipe.strCategory }
          name="strCategory"
          onChange={ ({ target }) => handleChange(target) }
        >
          { categories.map((category) => (
            <option
              className="text-black"
              key={ category.strCategory }
              value={ category.strCategory }
            >
              { category.strCategory }
            </option>
          ))}
        </select>
        <label
          className={ classLabel }
          htmlFor="categoryRecipe"
        >
          Category
        </label>
      </div>
      { type === 'Meal' ? (
        <div className="user-box self-center mt-3">
          <input
            className="peer reset-input input"
            id="areaRecipe"
            value={ infosRecipe.strArea }
            type="text"
            name="strArea"
            onChange={ ({ target }) => handleChange(target) }
          />
          <label
            className={
              `label ${focus} ${infosRecipe.strArea.length ? valid : ''}`
            }
            htmlFor="areaRecipe"
          >
            Area
          </label>
        </div>
      ) : (
        <div className="user-box self-center mt-3">
          <select
            className="peer reset-input input"
            id="isAlcoholic"
            value={ infosRecipe.strAlcoholic }
            name="strAlcoholic"
            onChange={ ({ target }) => handleChange(target) }
          >
            <option value="Alcoholic" className="text-black">
              Alcoholic
            </option>
            <option value="Non alcoholic" className="text-black">
              Non Alcoholic
            </option>
          </select>
          <label
            className={ classLabel }
            htmlFor="isAlcoholic"
          >
            Is alcoholic
          </label>
        </div>
      )}
      <div className="user-box">
        <input
          className="hidden"
          name="photo"
          id="photo"
          type="file"
          onChange={ ({ target }) => {
            if (target.files[0]) {
              setInfosRecipe({ ...infosRecipe, [`str${type}Thumb`]: target.files[0] });
            } else {
              setInfosRecipe({ ...infosRecipe, [`str${type}Thumb`]: '' });
            }
          } }
        />
        <label
          className={ `file-btn ${infosRecipe[`str${type}Thumb`]
            ? ' select-file' : ''} py-1` }
          htmlFor="photo"
        >
          Photo Upload
        </label>
      </div>
      { type === 'Meal' && (
        <div className="user-box self-center mt-3">
          <input
            className="peer reset-input input"
            id="youtubeRecipe"
            value={ infosRecipe.strYoutube }
            type="url"
            name="strYoutube"
            onChange={ ({ target }) => handleChange(target) }
          />
          <label
            className={
              `label ${focus} ${infosRecipe.strYoutube.length ? valid : ''}`
            }
            htmlFor="youtubeRecipe"
          >
            YouTube URL (use embed)
          </label>
        </div>
      )}
      <div className="user-box self-center mt-3">
        <input
          className="peer reset-input input"
          id="tagsRecipe"
          value={ infosRecipe.strTags }
          type="text"
          name="strTags"
          onChange={ ({ target: { name, value } }) => {
            handleChange({ name, value: value.replaceAll(' ', '') });
          } }
        />
        <label
          className={
            `label ${focus} ${infosRecipe.strTags.length ? valid : ''}`
          }
          htmlFor="tagsRecipe"
        >
          Tags (separeted by comma)
        </label>
      </div>
    </div>
  );
}

InfosInputsRecipe.propTypes = {
  infosRecipe: PropTypes.shape({
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
    strCategory: PropTypes.string,
    strArea: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strMealThumb: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    strDrinkThumb: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    strYoutube: PropTypes.string,
    strTags: PropTypes.string,
  }).isRequired,
  setInfosRecipe: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  categories: PropTypes.instanceOf(Array).isRequired,
  type: PropTypes.string.isRequired,
};

export default InfosInputsRecipe;
