import PropTypes from 'prop-types';
import React, { useState, useContext } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import RecipesContext from '../context/RecipesContext';
import InitialLayout from './InitialLayout';
import useFetch from '../hooks/useFetch';

export default function EditUserPass({ setEditUserPass }) {
  const { patchUser, fetchUser, fireToast } = useFetch();
  const { userLogged } = useContext(RecipesContext);
  const [user, setUser] = useState({
    email: '',
    name: '',
    password: '',
    lastPassword: '',
    userEmail: userLogged.email,
    confirmPass: '',
  });

  const [errorLastPass, setErroLastPass] = useState(false);
  const [viewLastPassword, setViewLastPassword] = useState(false);
  const [viewPassword, setViewPassword] = useState(false);
  const [viewConfirmPass, setViewConfirmPass] = useState(false);

  const PASSWORD_LENGTH = 7;
  const focus = 'peer-focus:-top-5 peer-focus:text-xs';
  const valid = 'peer-valid:-top-5 peer-valid:text-xs';
  const classLabel = `label ${focus} ${valid}`;

  const handleChange = ({ name, value }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async () => {
    const checkPass = await fetchUser(
      { email: user.userEmail, password: user.lastPassword },
    );
    setErroLastPass(!checkPass.length);
    if (!checkPass.length === false) {
      patchUser(userLogged.id, { password: user.password });
      fireToast('Saved Changes!', 'success');
      setEditUserPass(false);
    }
  };

  const exit = () => {
    setEditUserPass(false);
  };

  return (
    <InitialLayout>
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
              onChange={ ({ target }) => handleChange(target) }
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
            />
            <label
              className={ classLabel }
              htmlFor="password"
            >
              New Password
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
              value={ user.confirmPass }
              type={ viewConfirmPass ? 'text' : 'password' }
              onChange={ ({ target }) => handleChange(target) }
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
        { user.password !== user.confirmPass && (
          <p className="error-register">
            New password and confirmation password do not match.
          </p>
        )}
        { user.password.length > 0 && user.password.length < PASSWORD_LENGTH && (
          <p className="error-register">
            New password must be at least 7 characters long.
          </p>
        )}
        { errorLastPass && (
          <p className="error-register">
            Invalid current password.
          </p>
        )}
        <div className="space-x-5">
          <button
            type="submit"
            id="button"
            disabled={ user.password !== user.confirmPass
              || user.password.length < PASSWORD_LENGTH
              || user.lastPassword.length < PASSWORD_LENGTH }
          >
            Changes saved!
          </button>
          <button
            onClick={ exit }
            id="button"
          >
            Cancel
          </button>
        </div>
      </form>
    </InitialLayout>
  );
}

EditUserPass.propTypes = {
  setEditUserPass: PropTypes.func.isRequired,
};
