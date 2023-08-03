import React, { useState, useContext, useEffect } from 'react';
import './FormCommentary.css';
import '../Pages/Login.css';

function FormCreateRecipe() {
  const [inputsIngredients, setNewIngredients] = useState([{ id: 0 }]);
  const [infosRecipe, setInfosRecipe] = useState({
    nameRecipe: '',
    categoryRecipe: '',
    Ingredients: [{ id: 0 }],
  });

  const focus = 'peer-focus:-top-5 peer-focus:text-xs';
  const valid = 'peer-valid:-top-5 peer-valid:text-xs';
  const classLabel = `label ${focus} ${valid}`;

  const handleChange = ({ name: nameInput, value }) => {
    setInfosRecipe({ ...infosRecipe, [nameInput]: value });
  };

  const test = (event) => {
    event.preventDefault();
    console.log(infosRecipe.nameRecipe);
  };

  const astd = (event) => {
    event.preventDefault();
    setNewIngredients([...inputsIngredients, { id: inputsIngredients.length }]);
  };

  return (
    <main>
      <form
        className="flex-center flex-col gap-7 w-full max-w-sm mt-10"
      >
        <div className="user-box self-center">
          <input
            className="peer reset-input input"
            id="nameRecipe"
            value={ infosRecipe.nameRecipe }
            type="text"
            name="nameRecipe"
            onChange={ ({ target }) => handleChange(target) }
          />
          <label
            className={ classLabel }
            htmlFor="nameRecipe"
          >
            Nome da Receita
          </label>
        </div>
        <div className="user-box self-center">
          <input
            className="peer reset-input input"
            id="categoryRecipe"
            value={ infosRecipe.categoryRecipe }
            type="text"
            name="categoryRecipe"
            onChange={ ({ target }) => handleChange(target) }
          />
          <label
            className={ classLabel }
            htmlFor="categoryRecipe"
          >
            Categoria da Receitaa
          </label>
        </div>
        { inputsIngredients.map((input, index) => (
          <div key={ input.id }>
            <input
              type="text"
              placeholder={ `Ingrediente ${input.id + 1}` }
              name={ `ingrediente${input.id + 1}` }
              className="peer reset-input input"
              id="categoryRecipe"
            />
          </div>
        )) }
        <button onClick={ astd }>New Ingrediente</button>
        <button onClick={ test }>teste</button>
      </form>
    </main>
  );
}

export default FormCreateRecipe;
