/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';

import useFetch from '../hooks/useFetch';
// import { getFirebase } from '../services/firebase';
import './AcceptCookies.css';

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
    // await getFirebase(email);
    const emailExist = await checkUserExist(email);
    setEmailRegister(emailExist);
  };

  return (
    <>
      <div
        className="flex flex-col items-center gap-3 w-full max-w-[216px]"
      >
        { user.photo ? (
          <div
            style={ {
              backgroundImage: `url(${user.photo && URL.createObjectURL(user.photo)})`,
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            } }
            className="rounded-[100px] w-[150px] h-[150px]  border-div"
          />
        ) : (
          <CgProfile className="rounded-[100px] w-[150px] h-[150px] bg-[var(--yellow)]" />
        )}
        <div className="user-box">
          <input
            className="hidden"
            name="photo"
            id="photo"
            type="file"
            onChange={ ({ target }) => {
              if (target.files[0]) {
                setUser({ ...user, photo: target.files[0] });
              } else {
                setUser({ ...user, photo: '' });
              }
            } }
          />
          <label
            className={ `file-btn ${user.photo ? ' select-file' : ''}` }
            htmlFor="photo"
          >
            Photo Upload
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
              className={ `label ${focus} ${confirmPass.length ? valid : ''}` }
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
      <div className="checkbox-wrapper-10 text-white flex items-center">
        Do you agree to use cookies to keep you logged in for a certain time?
        <div className="checkbox-wrapper-10">
          <input
            checked={ user.acceptCookies }
            type="checkbox"
            id="cb5"
            className="tgl tgl-flip"
            onChange={ () => setUser({ ...user, acceptCookies: !user.acceptCookies }) }
          />
          <label
            htmlFor="cb5"
            data-tg-on="Yes"
            data-tg-off="No"
            className="tgl-btn"
          />
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
    photo: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]).isRequired,
    acceptCookies: PropTypes.bool,
  }).isRequired,
  confirmPass: PropTypes.string.isRequired,
};

export default RegisterInputs;
