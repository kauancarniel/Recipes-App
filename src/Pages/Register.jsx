import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import validator from 'validator';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

import InitialLayout from '../components/InitialLayout';
import './Login.css';
import useFetch from '../hooks/useFetch';

export default function Register() {
  const [user, setUser] = useState({
    email: '',
    name: '',
    password: '',
  });
  const [confirmPass, setConfirmPass] = useState('');
  const [viewPassword, setViewPassword] = useState(false);
  const [viewConfirmPass, setViewConfirmPass] = useState(false);
  const [emailRegister, setEmailRegister] = useState(false);
  const { postNewUser, checkUserExist } = useFetch();
  const history = useHistory();

  const PASSWORD_LENGTH = 7;
  const NAME_LENGTH = 3;

  const handleChange = ({ name, value }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async () => {
    await postNewUser(user);
    history.push('/meals');
  };

  const focus = 'peer-focus:-top-5 peer-focus:text-xs';
  const valid = 'peer-valid:-top-5 peer-valid:text-xs';
  const classLabel = `label ${focus} ${valid}`;
  const classBtnMain = 'reset-input btn-login';
  const classBtbHover = 'enabled:hover:text-[#F9EFBB] shadow-hover';
  const classBtnDisabled = 'disabled:cursor-not-allowed disabled:text-[#CF5927]';
  const classBtn = `${classBtnMain} ${classBtbHover} ${classBtnDisabled}`;

  return (
    <InitialLayout>
      <p className="text-[var(--green)] font-bold text-5xl tracking-widest">
        SING UP
      </p>
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
            onBlur={ ({ target }) => setEmailRegister(checkUserExist(target.value)) }
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
        <div className="flex-center relative w-full">
          <div className="user-box">
            <input
              className="peer reset-input input"
              id="password"
              name="password"
              value={ user.password }
              type={ viewPassword ? 'text' : 'password' }
              data-testid="password-input"
              onChange={ ({ target }) => handleChange(target) }
              required
            />
            <label
              className={ classLabel }
              htmlFor="password"
            >
              Password
            </label>
          </div>
          <button
            type="button"
            className="flex-center viewpass-btn"
            onClick={ () => setViewPassword(!viewPassword) }
          >
            { viewPassword ? (
              <BsEyeSlash />
            ) : (
              <BsEye />
            )}
          </button>
        </div>
        <div className="flex-center relative w-full">
          <div className="user-box">
            <input
              className="peer reset-input input"
              id="confirmPass"
              name="confirmPass"
              value={ confirmPass }
              type={ viewConfirmPass ? 'text' : 'password' }
              data-testid="confirmPass-input"
              onChange={ ({ target }) => setConfirmPass(target.value) }
              required
            />
            <label
              className={ classLabel }
              htmlFor="confirmPass"
            >
              Confirm Password
            </label>
          </div>
          <button
            type="button"
            className="flex-center viewpass-btn"
            onClick={ () => setViewConfirmPass(!viewConfirmPass) }
          >
            { viewConfirmPass ? (
              <BsEyeSlash />
            ) : (
              <BsEye />
            )}
          </button>
        </div>
        { emailRegister && (
          <p className="error-register">
            E-mail already registered, change it or
            {' '}
            <Link
              className="no-underline text-[var(--darkYellow)] hover:text-[var(--yellow)]"
              to="/"
            >
              login
            </Link>
            {' '}
            to proceed!
          </p>
        )}
        { user.password !== confirmPass && (
          <p className="error-register">
            Different passwords!
          </p>
        )}
        <button
          className={ `anim-hover ${classBtn}` }
          type="submit"
          data-testid="login-submit-btn"
          disabled={ !(
            validator.isEmail(user.email)
            && user.password.length >= PASSWORD_LENGTH
            && user.password === confirmPass
            && !emailRegister
            && user.name >= NAME_LENGTH
          ) }
        >
          <span className="absolute block anim1 line1" />
          <span className="absolute block anim2 line2" />
          <span className="absolute block anim3 line3" />
          <span className="absolute block anim4 line4" />
          REGISTER
        </button>
      </form>
    </InitialLayout>
  );
}
