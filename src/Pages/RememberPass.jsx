import React, { useEffect, useState } from 'react';
import validator from 'validator';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import { IoChevronBackCircleSharp } from 'react-icons/io5';

import InitialLayout from '../components/InitialLayout';
import useFetch from '../hooks/useFetch';
import useUser from '../hooks/useUser';

export default function RememberPass() {
  const { fetchUser, fireToast } = useFetch();
  const { validateCookie } = useUser();
  const [user, setUser] = useState({
    email: '',
    name: '',
  });
  const [password, setPassword] = useState('');
  const [indexBtn, setIndexBtn] = useState(0);

  useEffect(() => {
    (async () => {
      await validateCookie();
    })();
  }, []);

  const NAME_LENGTH = 3;

  const focus = 'peer-focus:-top-5 peer-focus:text-xs';
  const valid = '-top-5 text-xs';
  const classBtnMain = 'reset-input btn-login';
  const classBtbHover = 'enabled:hover:text-[#F9EFBB] shadow-hover';
  const classBtnDisabled = 'disabled:cursor-not-allowed disabled:text-[#CF5927]';
  const classBtn = `${classBtnMain} ${classBtbHover} ${classBtnDisabled}`;

  const buttons = [
    '',
    <button
      key="copy"
      type="button"
      onClick={ () => {
        copy(password);
        fireToast('Password copied', 'success');
      } }
      className="reset-btn text-[var(--orange)] font-bold hover:text-[var(--red)]"
    >
      Copy
    </button>,
    <Link
      key="register"
      to="/signup"
      className="no-underline text-[var(--orange)] hover:text-[var(--red)]"
    >
      Sing Up
    </Link>,
  ];

  const handleChange = ({ name, value }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async () => {
    const userResponse = await fetchUser(user);
    if (userResponse.length) {
      if (userResponse[0].name !== user.name) {
        setPassword('Valid email, but name does not match registered. Please try again');
        setIndexBtn(0);
      } else {
        setPassword(userResponse[0].password);
        setIndexBtn(1);
      }
    } else {
      setPassword('Email not registered. Please,');
      setIndexBtn(2);
    }
  };

  return (
    <InitialLayout>
      <div className="text-center mb-3 flex gap-x-2 items-center">
        <Link
          className="no-underline text-[var(--yellow)] hover:text-[var(--darkYellow)]"
          to="/"
        >
          <IoChevronBackCircleSharp size="40px" />
        </Link>
        <h1 className="text-[var(--green)] font-bold text-5xl tracking-widest m-0">
          REMEMBER PASS
        </h1>
      </div>
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
            Registered Email
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
            className={ `label ${focus} ${user.name.length ? valid : ''}` }
            htmlFor="name"
          >
            Registered Name
          </label>
        </div>
        { password && (
          <div>
            <p
              className="password-remember"
            >
              {password}
              {' '}
              {buttons[indexBtn]}
              { indexBtn === 1 && (
                <p className="m-0">
                  <Link
                    className="go-login"
                    to="/"
                  >
                    Go to Login
                  </Link>
                </p>
              )}
            </p>
          </div>

        )}

        <button
          className={ `anim-hover ${classBtn}` }
          type="submit"
          data-testid="login-submit-btn"
          disabled={ !(
            validator.isEmail(user.email)
            && user.name.length >= NAME_LENGTH
          ) }
        >
          <span className="absolute block anim1 line1" />
          <span className="absolute block anim2 line2" />
          <span className="absolute block anim3 line3" />
          <span className="absolute block anim4 line4" />
          REMEMBER
        </button>
      </form>
    </InitialLayout>
  );
}
