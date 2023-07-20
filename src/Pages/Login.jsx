import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
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

  return (
    <main
      className="min-h-screen flex-center bg-center bg-cover"
      style={ { backgroundImage: `url(${bgLogin})` } }
    >
      <div className="login-box flex-center flex-col bg-[rgba(0,0,0,.9)]">
        <img src={ logo } alt="logo" />
        <form
          onSubmit={ (event) => {
            event.preventDefault();
            handleSubmit();
          } }
        >
          <input
            type="email"
            name="email"
            data-testid="email-input"
            onChange={ ({ target }) => handleChange(target) }
          />
          <input
            name="password"
            type="password"
            data-testid="password-input"
            onChange={ ({ target }) => handleChange(target) }
          />
          <button
            type="submit"
            data-testid="login-submit-btn"
            disabled={ !(
              validator.isEmail(user.email) && user.password.length >= PASSWORD_LENGTH
            ) }
          >
            Enter
          </button>
        </form>
      </div>
    </main>
  );
}

export default Login;
