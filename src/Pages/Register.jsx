import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import validator from 'validator';
import { IoChevronBackCircleSharp } from 'react-icons/io5';

import useFetch from '../hooks/useFetch';
import useUser from '../hooks/useUser';
import InitialLayout from '../components/InitialLayout';
import './Login.css';
import RegisterInputs from '../components/RegisterInputs';

export default function Register() {
  const [user, setUser] = useState({
    email: '',
    name: '',
    password: '',
    photo: '',
    acceptCookies: false,
  });
  const [confirmPass, setConfirmPass] = useState('');
  const [emailRegister, setEmailRegister] = useState(false);
  const { postNewUser } = useFetch();
  const { validateCookie } = useUser();
  const history = useHistory();

  const PASSWORD_LENGTH = 7;
  const NAME_LENGTH = 3;

  useEffect(() => {
    (async () => {
      await validateCookie();
    })();
  }, []);

  const handleSubmit = async () => {
    const success = await postNewUser(user);
    if (success) history.push('/meals');
  };

  const classBtnMain = 'reset-input btn-login';
  const classBtbHover = 'enabled:hover:text-[#F9EFBB] shadow-hover';
  const classBtnDisabled = 'disabled:cursor-not-allowed disabled:text-[#CF5927]';
  const classBtn = `${classBtnMain} ${classBtbHover} ${classBtnDisabled}`;

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
          SIGN UP
        </h1>
      </div>
      <form
        className="flex-center flex-col gap-7 w-full max-w-sm"
        onSubmit={ (event) => {
          event.preventDefault();
          handleSubmit();
        } }
      >
        <div className="flex flex-row flex-wrap gap-4 justify-center">
          <RegisterInputs
            setConfirmPass={ setConfirmPass }
            setEmailRegister={ setEmailRegister }
            setUser={ setUser }
            user={ user }
            confirmPass={ confirmPass }
          />
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
            && user.name.length >= NAME_LENGTH
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
