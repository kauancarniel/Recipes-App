import React from 'react';

import LoginForm from '../components/LoginForm';
import logo from '../images/logo-recipes-app.svg';
import './Login.css';

function Login() {
  return (
    <main
      className="min-h-screen flex-center"
    >
      <div className="login-box flex-center flex-col bg-form glass max-h-screen">
        <img src={ logo } alt="logo" className="w-40" />
        <LoginForm />
      </div>
    </main>
  );
}

export default Login;
