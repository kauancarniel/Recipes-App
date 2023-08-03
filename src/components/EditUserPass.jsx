import PropTypes from 'prop-types';
import React, { useState, useContext } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import RecipesContext from '../context/RecipesContext';
import useFetch from '../hooks/useFetch';

const PASSWORD_LENGTH = 7;

export default function EditUserPass({ passwords, setPasswords }) {
  const { patchUser, fetchUser, fireToast } = useFetch();
  const { userLogged } = useContext(RecipesContext);

  const [viewLastPassword, setViewLastPassword] = useState(false);
  const [viewPassword, setViewPassword] = useState(false);
  const [viewConfirmPass, setViewConfirmPass] = useState(false);

  const focus = 'peer-focus:-top-5 peer-focus:text-xs';
  const valid = 'peer-valid:-top-5 peer-valid:text-xs';
  const classLabel = `label ${focus} ${valid}`;

  const { lastPass, newPass, confirmPass } = passwords;

  const handleChange = ({ name, value }) => {
    setPasswords({ ...passwords, [name]: value });
  };

  const checkLastPass = async (password) => {
    if (lastPass.length < PASSWORD_LENGTH) return;
    const userResponse = await fetchUser({ email: userLogged.email, password });
    setPasswords({ ...passwords, validLastPass: !!userResponse.length });
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

  return (
    <form
      className="flex-center flex-col gap-7 w-full max-w-sm my-3"
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
            name="lastPass"
            value={ lastPass }
            type={ viewLastPassword ? 'text' : 'password' }
            onChange={ ({ target }) => handleChange(target) }
            onBlur={ ({ target }) => checkLastPass(target.value) }
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
            name="newPass"
            value={ newPass }
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
            value={ confirmPass }
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
    </form>
  );
}

EditUserPass.propTypes = {
  passwords: PropTypes.shape({
    lastPass: PropTypes.string,
    newPass: PropTypes.string,
    confirmPass: PropTypes.string,
    validLastPass: PropTypes.bool,
  }).isRequired,
  setPasswords: PropTypes.func.isRequired,
};
