import PropTypes from 'prop-types';
import React, { useState, useContext } from 'react';
import validator from 'validator';
import InitialLayout from './InitialLayout';
import useFetch from '../hooks/useFetch';
import RecipesContext from '../context/RecipesContext';
import './FormCommentary.css';
import '../Pages/Login.css';

export default function EditUserInfo({ setEditUserInfo }) {
  const { userLogged } = useContext(RecipesContext);
  const [user, setUser] = useState({
    email: userLogged.email,
    name: userLogged.name,
  });

  const { patchUser, fireToast } = useFetch();
  const [emailRegister, setEmailRegister] = useState(false);
  const { checkUserExist } = useFetch();

  const NAME_LENGTH = 3;
  const focus = 'peer-focus:-top-5 peer-focus:text-xs';
  const valid = 'peer-valid:-top-5 peer-valid:text-xs';
  const classLabel = `label ${focus} ${valid}`;

  const handleChange = ({ name, value }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async () => {
    patchUser(userLogged.id, { email: user.email, name: user.name });
    fireToast('Saved Changes!', 'success');
    setEditUserInfo(false);
  };

  const exit = () => {
    setEditUserInfo(false);
  };

  const checkEmail = async (email) => {
    const emailExist = await checkUserExist(email);
    setEmailRegister(emailExist);
  };

  return (
    <InitialLayout>
      <form
        className="flex-center flex-col gap-7 w-full max-w-sm"
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
            defaultValue={ userLogged.email }
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
            defaultValue={ userLogged.name }
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
        </div>
        { emailRegister && (
          <p className="error-register">
            E-mail already registered.
          </p>
        )}
        <div className="space-x-5">
          <button
            id="button"
            type="submit"
            disabled={ !(
              validator.isEmail(user.email)
              && !emailRegister
              && user.name.length >= NAME_LENGTH
            ) }
          >
            Save Changes
          </button>
          <button
            onClick={ exit }
            id="button"
          >
            Cancel
          </button>
        </div>
      </form>
    </InitialLayout>
  );
}

EditUserInfo.propTypes = {
  setEditUserInfo: PropTypes.func.isRequired,
};
