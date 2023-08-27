import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import validator from 'validator';

import useFetch from '../hooks/useFetch';
import useUser from '../hooks/useUser';
import InitialLayout from '../components/InitialLayout';
import logo from '../images/logo-recipes-app.svg';
import './Login.css';

function Login() {
  const [user, setUser] = useState({ email: '', password: '' });
  const [viewPassword, setViewPassword] = useState(false);
  const { loginUser } = useFetch();
  const { validateCookie } = useUser();
  const history = useHistory();

  const PASSWORD_LENGTH = 7;

  useEffect(() => {
    (async () => {
      await validateCookie();
    })();
  }, []);

  const handleChange = ({ name, value }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async () => {
    const login = await loginUser(user);
    if (login) history.push('/meals');
  };

  const focus = 'peer-focus:-top-5 peer-focus:text-xs';
  const valid = '-top-5 text-xs';
  const classBtnMain = 'reset-input btn-login';
  const classBtbHover = 'enabled:hover:text-[#F9EFBB] shadow-hover';
  const classBtnDisabled = 'disabled:cursor-not-allowed disabled:text-[#CF5927]';
  const classBtn = `${classBtnMain} ${classBtbHover} ${classBtnDisabled}`;

  return (
    <InitialLayout>
      <img src={ logo } alt="logo" className="w-40" />
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
            required
          />
          <label
            className={ `label ${focus} ${user.email.length ? valid : ''}` }
            htmlFor="email"
          >
            Email
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
              className={ `label ${focus} ${user.password.length ? valid : ''}` }
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
        <div>
          <p className="my-1">
            <Link
              to="/remember-password"
              className="no-underline text-[#fff] hover:text-[#aaa]"
            >
              Forgot your password?
            </Link>
          </p>
          <p className="text-[#aaa] my-1">
            Don&apos;t have an account?
            {' '}
            <Link
              to="/signup"
              className="no-underline text-[#fff] hover:text-[#aaa]"
            >
              Sign up!
            </Link>
          </p>
          <p className="my-1">
            <Link
              className="no-underline text-[#fff] hover:text-[#aaa]"
              to="/about"
            >
              About this project
            </Link>
          </p>
        </div>
      </form>
    </InitialLayout>
  );
}

export default Login;
