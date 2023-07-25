import React from 'react';
import { useLocation } from 'react-router-dom';

import LoginForm from '../components/LoginForm';
import logo from '../images/logo-recipes-app.svg';
import './Login.css';
import RegisterForm from '../components/RegisterForm';

function Login() {
  const { pathname } = useLocation();
  return (
    <main
      className="min-h-screen flex-center w-full"
    >
      <div className="login-box flex-center flex-col bg-form glass max-h-screen">
        <img src={ logo } alt="logo" className="w-40" />
        { pathname === '/register' ? (
          <RegisterForm />
        ) : (
          <LoginForm />
        )}
      </div>
    </main>
  );
}

export default Login;
