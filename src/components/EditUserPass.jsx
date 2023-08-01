import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

import InitialLayout from './InitialLayout';

export default function EditUserPass({ setEditUserPass }) {
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
  const history = useHistory();

  const PASSWORD_LENGTH = 7;

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

  return (
    <InitialLayout>
      <form
        className="flex-center flex-col gap-7 w-full max-w-sm"
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
        { user.password !== confirmPass && (
          <p className="error-register">
            Different passwords!
          </p>
        )}
        <div className="space-x-5">
          {/* <button
            id="button"
            disabled={ user.password !== confirmPass || user.password.length === 0 }
            onClick={ handleSubmit() }
          >
            Sanve Changes
          </button> */}
          <button
            onClick={ setEditUserPass(false) }
            id="button"
          >
            Cancel
          </button>
        </div>
      </form>
    </InitialLayout>
  );
}
