import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import validator from 'validator';

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
    <main className="min-h-screen">
      <div className="login-box">
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
