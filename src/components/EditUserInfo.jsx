import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import validator from 'validator';
import { CgProfile } from 'react-icons/cg';

import RecipesContext from '../context/RecipesContext';
import useFetch from '../hooks/useFetch';
import './FormCommentary.css';
import '../Pages/Login.css';

export default function EditUserInfo({ setEmailRegister }) {
  const { userLogged, setUserLogged } = useContext(RecipesContext);
  const { checkUserExist } = useFetch();

  const { name, email, score, photo } = userLogged
  || { name: '', email: '', score: 0, photo: '' };
  const focus = 'peer-focus:-top-5 peer-focus:text-xs';
  const valid = 'peer-valid:-top-5 peer-valid:text-xs';
  const classLabel = `label ${focus} ${valid}`;

  const handleChange = ({ name: nameInput, value }) => {
    setUserLogged({ ...userLogged, [nameInput]: value });
  };

  const checkEmail = async (value) => {
    if (value !== email && validator.isEmail(value)) {
      const emailExist = await checkUserExist(value);
      setEmailRegister(emailExist);
    }
  };

  return (
    <div className="editUser-container">
      <form
        className="flex-center flex-col gap-7 w-full max-w-[216px]"
        onSubmit={ (event) => {
          event.preventDefault();
          handleSubmit();
        } }
      >
        <div className="user-box">
          <input
            className="peer reset-input input"
            id="email"
            type="email"
            name="email"
            value={ email }
            data-testid="email-input"
            onChange={ ({ target }) => handleChange(target) }
            onBlur={ ({ target }) => checkEmail(target.value) }
            required
          />
          <label
            className={ classLabel }
            htmlFor="email"
          >
            Email
          </label>
        </div>
        <div className="user-box">
          <input
            className="peer reset-input input"
            id="name"
            type="text"
            name="name"
            value={ name }
            data-testid="name-input"
            onChange={ ({ target }) => handleChange(target) }
            required
          />
          <label
            className={ classLabel }
            htmlFor="name"
          >
            Name
          </label>
          <p className="my-2 text-white text-xl">
            {`Score: ${score}`}
          </p>
        </div>
      </form>
      <div className="flex flex-col items-center gap-3 w-full max-w-[216px]">
        { photo && validator.isURL(photo) ? (
          <img
            src={ photo }
            alt="user"
            className="rounded-[100px] w-[150px] h-[150px]  border-div"
          />
        ) : (
          <CgProfile
            className="rounded-[100px] w-[150px] h-[150px] bg-[var(--yellow)]"
          />
        )}
        <div className="user-box">
          <input
            className="peer reset-input input"
            name="photo"
            value={ photo }
            type="url"
            onChange={ ({ target }) => {
              handleChange(target);
            } }
          />
          <label
            className={ `label ${focus} ${photo.length ? valid : ''}` }
            htmlFor="confirmPass"
          >
            Photo
          </label>
        </div>
      </div>
    </div>
  );
}

EditUserInfo.propTypes = {
  setEmailRegister: PropTypes.func.isRequired,
};
