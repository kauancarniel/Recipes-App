import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import validator from 'validator';

import logo from '../images/logo-recipes-app.svg';
import bgLogin from '../images/bg-login.png';
import './Login.css';

function Login() {
  const [user, setUser] = useState({ email: '', password: '' });
  const history = useHistory();

  const PASSWORD_LENGTH = 7;

  const handleChange = ({ name, value }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = () => {
    localStorage.setItem('user', JSON.stringify({ email: user.email }));
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
    <main
      className="min-h-screen flex-center bg-center bg-cover bg"
    >
      <div className="login-box flex-center flex-col bg-form glass">
        <img src={ logo } alt="logo" className="w-40" />
        <form
          className="flex-center flex-col gap-7"
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
              data-testid="email-input"
              onChange={ ({ target }) => handleChange(target) }
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
              id="password"
              name="password"
              type="password"
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
            className={ `anim-hover ${classBtn}` }
            type="submit"
            data-testid="login-submit-btn"
            disabled={ !(
              validator.isEmail(user.email) && user.password.length >= PASSWORD_LENGTH
            ) }
          >
            <span className="absolute block anim1 line1" />
            <span className="absolute block anim2 line2" />
            <span className="absolute block anim3 line3" />
            <span className="absolute block anim4 line4" />
            SUBMIT
          </button>
          <p className="text-[#aaa]">
            Don&apos;t have an account?
            {' '}
            <Link
              to="/register"
              className="no-underline text-white hover:text-[#aaa]"
            >
              Sign up!
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}

export default Login;
