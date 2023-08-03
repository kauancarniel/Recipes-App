import React, { useState, useContext, useEffect } from 'react';
import validator from 'validator';
import Header from '../components/Header';
import EditUserInfo from '../components/EditUserInfo';
import RecipesContext from '../context/RecipesContext';
import useUser from '../hooks/useUser';

import EditUserPass from '../components/EditUserPass';
import './Login.css';
import './Profile.css';
import ProfileErrors from '../components/ProfileErrors';

const NAME_LENGTH = 3;
const PASSWORD_LENGTH = 7;

function Profile() {
  const { userLogged } = useContext(RecipesContext);
  const [passwords, setPasswords] = useState(
    { lastPass: '', newPass: '', confirmPass: '', validLastPass: true },
  );
  const [editPass, setEditPass] = useState(false);
  const [emailRegister, setEmailRegister] = useState(false);
  const { validateCookie } = useUser();

  useEffect(() => {
    (async () => {
      await validateCookie();
    })();
  }, []);

  const { name, email } = userLogged || { name: '', email: '', score: 0 };
  const { lastPass, newPass, confirmPass, validLastPass } = passwords
    || { lastPass: '', newPass: '', confirmPass: '', validLastPass: true };

  const handleSubmit = async () => {
    patchUser(userLogged.id, { email, name });
    fireToast('Saved Changes!', 'success');
    setEditInfos(false);
  };

  const verifyDisabled = () => {
    if (editPass) {
      return (
        newPass === confirmPass
        && newPass.length >= PASSWORD_LENGTH
        && lastPass.length >= PASSWORD_LENGTH
        && validLastPass
        && newPass !== lastPass
      );
    }
    return (
      validator.isEmail(email)
        && !emailRegister
        && name.length >= NAME_LENGTH
    );
  };

  return (
    <>
      <Header title="Profile" iconeProfile />
      <main
        className="recipe-box flex flex-col items-center bg-form glass box-bottom gap-3"
      >
        <EditUserInfo setEmailRegister={ setEmailRegister } />
        <div className="flex flex-row">
          <button
            className="button"
            onClick={ () => {
              setEditPass(!editPass);
            } }
          >
            <svg className="svg-icon" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <g stroke="white" strokeLinecap="round" strokeWidth="2">
                <path d="m20 20h-16" />
                <path clipRule="evenodd" d="m14.5858 4.41422c.781-.78105 2.0474-.78105 2.8284 0 .7811.78105.7811 2.04738 0 2.82843l-8.28322 8.28325-3.03046.202.20203-3.0304z" fillRule="evenodd" />
              </g>
            </svg>
            <span className="lable">{ editPass ? 'Cancel Edit Pass' : 'Edit Pass'}</span>
          </button>
        </div>
        <div>
          { editPass && (
            <EditUserPass passwords={ passwords } setPasswords={ setPasswords } />
          )}
        </div>
        <ProfileErrors
          editPass={ editPass }
          emailRegister={ emailRegister }
          passwords={ passwords }
        />
        <div className="space-x-5">
          <button
            id="button"
            type="submit"
            disabled={ !(verifyDisabled()) }
            onClick={ handleSubmit }
          >
            {editPass ? 'Save New Pass' : 'Save Changes Infos'}
          </button>
        </div>
      </main>
    </>
  );
}

export default Profile;
