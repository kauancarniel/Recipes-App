import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../Pages/Login';

// Constantes para strings duplicadas
const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const SUBMIT_BTN = 'login-submit-btn';
const VALID_EMAIL = 'user@example.com';
const VALID_PASSWORD = '1234567';

describe('Teste do componente Login', () => {
  test('Verifica se o e-mail é salvo no localStorage após a submissão do formulário', () => {
    const { getByTestId } = render(<Login />);
    const emailInput = getByTestId(EMAIL_INPUT);
    const passwordInput = getByTestId(PASSWORD_INPUT);
    const submitButton = getByTestId(SUBMIT_BTN);

    fireEvent.change(emailInput, { target: { value: VALID_EMAIL } });
    fireEvent.change(passwordInput, { target: { value: VALID_PASSWORD } });
    fireEvent.click(submitButton);

    expect(JSON.parse(localStorage.getItem('user'))).toEqual({ email: VALID_EMAIL });
  });

  test('Verifica se a rota muda para a tela principal de receitas de comidas após a submissão bem-sucedida', () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={ history }>
        <Login />
      </Router>,
    );

    const emailInput = getByTestId(EMAIL_INPUT);
    const passwordInput = getByTestId(PASSWORD_INPUT);
    const submitButton = getByTestId(SUBMIT_BTN);

    fireEvent.change(emailInput, { target: { value: VALID_EMAIL } });
    fireEvent.change(passwordInput, { target: { value: VALID_PASSWORD } });
    fireEvent.click(submitButton);

    const { location } = history;
    expect(location.pathname).toBe('/meals');
  });
});
