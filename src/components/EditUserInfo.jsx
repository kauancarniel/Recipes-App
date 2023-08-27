/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import validator from 'validator';
import { CgProfile } from 'react-icons/cg';

import useFetch from '../hooks/useFetch';
import RecipesContext from '../context/RecipesContext';
import './FormCommentary.css';
import '../Pages/Login.css';

export default function EditUserInfo({ setEmailRegister, user, setUser }) {
  const { userLogged } = useContext(RecipesContext);
  const { checkUserExist } = useFetch();

  const focus = 'peer-focus:-top-5 peer-focus:text-xs';
  const valid = 'peer-valid:-top-5 peer-valid:text-xs';
  const classLabel = `label ${focus} ${valid}`;

  const handleChange = ({ name, value }) => {
    setUser({ ...user, [name]: value });
  };

  const checkEmail = async (value) => {
    if (value !== email && validator.isEmail(value)) {
      const emailExist = await checkUserExist(value);
      setEmailRegister(emailExist);
    }
  };

  const { score, photo } = userLogged || { score: 0, photo: '' };

  return (
    <>
      <div className="editUser-container">
        <form
          className="flex-center flex-col gap-7 w-full max-w-[216px]"
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
            <p className="my-2 text-white text-xl">
              {`Score: ${score}`}
            </p>
          </div>
        </form>
        <div className="flex flex-col items-center gap-3 w-full max-w-[216px]">
          { user.photo ? (
            <div
              style={ {
                backgroundImage: `url(${typeof user.photo === 'string'
                  ? user.photo : URL.createObjectURL(user.photo)})`,
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              } }
              className="rounded-[100px] w-[150px] h-[150px]  border-div"
            />
          ) : (
            <CgProfile
              className="rounded-[100px] w-[150px] h-[150px] bg-[var(--yellow)]"
            />
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
                  setUser({ ...user, photo });
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
      </div>
      <div className="checkbox-wrapper-10 text-white flex items-center max-w-[448px]">
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

EditUserInfo.propTypes = {
  setEmailRegister: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    acceptCookies: PropTypes.bool,
    photo: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]).isRequired,
  }).isRequired,
  setUser: PropTypes.func.isRequired,
};
