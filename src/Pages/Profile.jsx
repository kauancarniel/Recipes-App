import React, { useState } from 'react';
import Header from '../components/Header';
import EditUserInfo from '../components/EditUserInfo';

import InitialLayout from '../components/InitialLayout';
import EditUserPass from '../components/EditUserPass';
import './Login.css';
import './Profile.css';

function Profile() {
  const [editInfos, setEditUserInfo] = useState(false);
  const [editPass, setEditUserPass] = useState(false);

  const infosUser = (
    <div>
      <div className="flex flex-row">
        <button
          className="button w-100"
          onClick={ () => {
            setEditUserInfo(true);
            setEditUserPass(false);
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
            setEditUserPass(true);
            setEditUserInfo(false);
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
      <h1>Nome do Usuario</h1>
      <h1>Email do Usuario</h1>
    </div>
  );

  return (
    <>
      <Header title="Profile" iconeProfile />
      <InitialLayout>
        <main
          className="text-white min-h-screeflex flex-col self-center whitespace-nowrap"
        >
          { editInfos ? <EditUserInfo setEditUserInfo={ setEditUserInfo }/>
          : editPass ? <EditUserPass setEditUserPass={ setEditUserPass } /> : infosUser }
        </main>
      </InitialLayout>
    </>
  );
}

export default Profile;
