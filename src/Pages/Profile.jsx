import React, { useState } from 'react';
import Header from '../components/Header';
import EditUserInfo from '../components/EditUserInfo';

import './Profile.css';
import './Login.css';

function Profile() {
  const [editInfos, setEditInfos] = useState(false);
  return (
    <>
      <Header title="Profile" iconeProfile />
      <main
        className="text-white
          min-h-scree
          h-150 w-190
          flex
          flex-col
          self-center
          whitespace-nowrap"
      >
        <EditUserInfo setEditInfos={ setEditInfos } editInfos={ editInfos } />
      </main>
    </>
  );
}

export default Profile;
