import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const history = useHistory();

  const PASSWORD_LENGTH = 6;

  const validateForm = (emailValue, passwordValue) => {
    const emailRegex = /\S+@\S+\.\S+/;
    setDisabled(!(emailRegex.test(emailValue) && passwordValue.length > PASSWORD_LENGTH));
  };

  const handleChange = (event, callback, state) => {
    const { value } = event.target;
    callback(value);
    validateForm(
      state === 'email' ? value : email,
      state === 'password' ? value : password,
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };

  return (
    <form onSubmit={ handleSubmit }>
      <input
        type="email"
        data-testid="email-input"
        onChange={ (event) => handleChange(event, setEmail, 'email') }
      />
      <input
        type="password"
        data-testid="password-input"
        onChange={ (event) => handleChange(event, setPassword, 'password') }
      />
      <button
        type="submit"
        data-testid="login-submit-btn"
        disabled={ disabled }
      >
        Enter
      </button>
    </form>
  );
}

export default Login;
