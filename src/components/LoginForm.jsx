import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import validator from 'validator';

export default function LoginForm() {
  const [user, setUser] = useState({ email: '', password: '' });
  const [viewPassword, setViewPassword] = useState(false);
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
      <div className="flex-center relative w-full">
        <div className="user-box">
          <input
            className="peer reset-input input"
            id="password"
            name="password"
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
          className="flex-center viewpass-btn absolute right-0"
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
  );
}
