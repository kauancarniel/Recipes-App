import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import validator from 'validator';

import InitialLayout from './InitialLayout';
import './FormCommentary.css';
import '../Pages/Login.css';
import useFetch from '../hooks/useFetch';

export default function EditUserInfo({ setEditUserInfo }) {
  const [user, setUser] = useState({
    email: '',
    name: '',
    password: '',
  });
  const [emailRegister, setEmailRegister] = useState(false);
  const { postNewUser, checkUserExist } = useFetch();
  const history = useHistory();

  const NAME_LENGTH = 3;

  const handleChange = ({ name, value }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async () => {
    history.push('/profile');
  };

  const focus = 'peer-focus:-top-5 peer-focus:text-xs';
  const valid = 'peer-valid:-top-5 peer-valid:text-xs';
  const classLabel = `label ${focus} ${valid}`;
  const classBtnMain = 'reset-input btn-login';
  const classBtbHover = 'enabled:hover:text-[#F9EFBB] shadow-hover';
  const classBtnDisabled = 'disabled:cursor-not-allowed disabled:text-[#CF5927]';
  const classBtn = `${classBtnMain} ${classBtbHover} ${classBtnDisabled}`;

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
            value={ user.email }
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
            value={ user.name }
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
        <div className="space-x-5">
          <button
            id="button"
            type="submit"
            disabled={ !(
              validator.isEmail(user.email)
            ) }
          >
            Save Changes
          </button>
          <button
            id="button"
          >
            Cancel
          </button>
        </div>
      </form>
    </InitialLayout>
  );
}
