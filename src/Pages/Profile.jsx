import React, { useState } from 'react';
import Header from '../components/Header';
import EditUserInfo from '../components/EditUserInfo';

import './Profile.css';
import './Login.css';

function Profile() {
  const [editInfos, setEditInfos] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  return (
    <>
      <Header title="Profile" iconeProfile />
      <main
        className="text-white min-h-scree flex flex-col self-center whitespace-nowrap"
      >
        <EditUserInfo editInfos={ editInfos } editPassword={ editPassword } setEditInfos={ setEditInfos } setEditPassword={ setEditPassword } />
      </main>
    </>
  );
}

export default Profile;
