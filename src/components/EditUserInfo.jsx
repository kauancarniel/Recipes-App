import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import validator from 'validator';

import InitialLayout from './InitialLayout';
import '../Pages/Login.css';
import './EditUserInfo.css';
import './FormCommentary.css';
import useFetch from '../hooks/useFetch';

export default function EditUserInfo({ editInfos, editPassword, setEditInfos, setEditPassword }) {
  const [user, setUser] = useState({
    email: '',
    name: '',
    password: '',
  });
  const [confirmPass, setConfirmPass] = useState('');
  const [lastPassword, setLastPass] = useState('');
  const [viewLastPassword, setViewLastPassword] = useState(false);
  const [viewPassword, setViewPassword] = useState(false);
  const [viewConfirmPass, setViewConfirmPass] = useState(false);
  const [emailRegister, setEmailRegister] = useState(false);
  const { postNewUser, checkUserExist } = useFetch();
  const history = useHistory();

  const PASSWORD_LENGTH = 7;
  const NAME_LENGTH = 3;

  const handleChange = ({ name, value }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async () => {
    await postNewUser(user);
    history.push('/meals');
  };

  const focus = 'peer-focus:-top-5 peer-focus:text-xs';
  const valid = 'peer-valid:-top-5 peer-valid:text-xs';
  const classLabel = `label ${focus} ${valid}`;
  const classBtnMain = 'reset-input btn-login';
  const classBtbHover = 'enabled:hover:text-[#F9EFBB] shadow-hover';
  const classBtnDisabled = 'disabled:cursor-not-allowed disabled:text-[#CF5927]';
  const classBtn = `${classBtnMain} ${classBtbHover} ${classBtnDisabled}`;

  const checkEmail = async (email) => {
    const emailExist = await checkUserExist(email);
    setEmailRegister(emailExist);
  };

  return (
    <InitialLayout>
      <div>
        <div className="flex flex-row">
          <button
            className="button w-100"
            onClick={ () => {
              setEditInfos((prev) => !prev);
              setEditPassword(false);
            } }
          >
            <svg className="svg-icon" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <g stroke="#a649da" strokeLinecap="round" strokeWidth="2">
                <path d="m20 20h-16" />
                <path clipRule="evenodd" d="m14.5858 4.41422c.781-.78105 2.0474-.78105 2.8284 0 .7811.78105.7811 2.04738 0 2.82843l-8.28322 8.28325-3.03046.202.20203-3.0304z" fillRule="evenodd" />
              </g>
            </svg>
            <span className="lable">Edit Infos</span>
          </button>
          <button
            className="button"
            onClick={ () => {
              setEditPassword((prev) => !prev);
              setEditInfos(false);
            } }
          >
            <svg className="svg-icon" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <g stroke="#a649da" strokeLinecap="round" strokeWidth="2">
                <path d="m20 20h-16" />
                <path clipRule="evenodd" d="m14.5858 4.41422c.781-.78105 2.0474-.78105 2.8284 0 .7811.78105.7811 2.04738 0 2.82843l-8.28322 8.28325-3.03046.202.20203-3.0304z" fillRule="evenodd" />
              </g>
            </svg>
            <span className="lable">Edit Password</span>
          </button>
        </div>
        <div>
          <h1>Nome do usuario</h1>
          <h1>E-mail do usuario</h1>
        </div>
      </div>
      { editInfos && (
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
              onBlur={ ({ target }) => checkEmail(target.value) }
              required
            />
            <label
              className={ classLabel }
              htmlFor="email"
            >
              Email
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
              className={ classLabel }
              htmlFor="name"
            >
              Name
            </label>
          </div>
          <button
            id="button"
            type="submit"
            disabled={ !(
              validator.isEmail(user.email)
            ) }
          >
            Save Changes
          </button>
        </form>
      ) }
      { editPassword && (
        <form
          className="flex-center flex-col gap-7 w-full max-w-sm"
          onSubmit={ (event) => {
            event.preventDefault();
            handleSubmit();
          } }
        >
          <div className="flex-center relative w-full">
            <div className="user-box">
              <input
                className="peer reset-input input"
                id="lastPassword"
                name="lastPassword"
                value={ user.viewLastPassword }
                type={ viewLastPassword ? 'text' : 'password' }
                onChange={ ({ target }) => setLastPass(target.value) }
                required
              />
              <label
                className={ classLabel }
                htmlFor="password"
              >
                Last Password
              </label>
            </div>
            <button
              type="button"
              className="flex-center viewpass-btn"
              onClick={ () => setViewLastPassword(!viewLastPassword) }
            >
              { viewLastPassword ? (
                <BsEyeSlash />
              ) : (
                <BsEye />
              )}
            </button>
          </div>
          <div className="flex-center relative w-full">
            <div className="user-box">
              <input
                className="peer reset-input input"
                id="password"
                name="password"
                value={ user.password }
                type={ viewPassword ? 'text' : 'password' }
                onChange={ ({ target }) => handleChange(target) }
                required
              />
              <label
                className={ classLabel }
                htmlFor="password"
              >
                NewPassword
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
          <div className="flex-center relative w-full">
            <div className="user-box">
              <input
                className="peer reset-input input"
                id="confirmPass"
                name="confirmPass"
                value={ confirmPass }
                type={ viewConfirmPass ? 'text' : 'password' }
                data-testid="confirmPass-input"
                onChange={ ({ target }) => setConfirmPass(target.value) }
                required
              />
              <label
                className={ classLabel }
                htmlFor="confirmPass"
              >
                Confirm Password
              </label>
            </div>
            <button
              type="button"
              className="flex-center viewpass-btn"
              onClick={ () => setViewConfirmPass(!viewConfirmPass) }
            >
              { viewConfirmPass ? (
                <BsEyeSlash />
              ) : (
                <BsEye />
              )}
            </button>
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
        </form>
      ) }
    </InitialLayout>
  );
}
