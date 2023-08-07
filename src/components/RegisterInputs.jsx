import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';

import useFetch from '../hooks/useFetch';

function RegisterInputs({
  setConfirmPass, setEmailRegister, setUser, user, confirmPass,
}) {
  const { checkUserExist } = useFetch();
  const [viewPassword, setViewPassword] = useState(false);
  const [viewConfirmPass, setViewConfirmPass] = useState(false);

  const focus = 'peer-focus:-top-5 peer-focus:text-xs';
  const valid = '-top-5 text-xs';

  const handleChange = ({ name, value }) => {
    setUser({ ...user, [name]: value });
  };

  const checkEmail = async (email) => {
    const emailExist = await checkUserExist(email);
    setEmailRegister(emailExist);
  };

  return (
    <>
      <div className="flex flex-col items-center gap-3 w-full max-w-[216px]">
        { user.photo ? (
          <img
            src={ user.photo }
            alt="user"
            className="rounded-[100px] w-[148px] h-[148px]  border-div"
          />
        ) : (
          <CgProfile className="rounded-[100px] w-[148px] h-[148px] bg-[var(--yellow)]" />
        )}
        <div className="user-box">
          <input
            className="peer reset-input input"
            name="photo"
            value={ user.photo }
            type="url"
            onChange={ ({ target }) => {
              handleChange(target);
            } }
          />
          <label
            className={ `label ${focus} ${confirmPass.length ? valid : ''}` }
            htmlFor="confirmPass"
          >
            Photo
          </label>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 w-full max-w-[216px]">
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
            className={ `label ${focus} ${user.email.length ? valid : ''}` }
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
            className={ `label ${focus} ${user.name.length ? valid : ''}` }
            htmlFor="name"
          >
            Name
          </label>
        </div>
        <div className="flex-center relative w-full">
          <div className="user-box">
            <input
              className="peer reset-input input"
              id="password"
              name="password"
              value={ user.password }
              type={ viewPassword ? 'text' : 'password' }
              data-testid="password-input"
              onChange={ ({ target }) => handleChange(target) }
              required
            />
            <label
              className={ `label ${focus} ${user.password.length ? valid : ''}` }
              htmlFor="password"
            >
              Password
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
              className={ `label ${focus} ${user.photo.length ? valid : ''}` }
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
      </div>
    </>
  );
}

RegisterInputs.propTypes = {
  setConfirmPass: PropTypes.func.isRequired,
  setEmailRegister: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string,
    name: PropTypes.string,
    password: PropTypes.string,
    photo: PropTypes.string,
  }).isRequired,
  confirmPass: PropTypes.string.isRequired,
};

export default RegisterInputs;
