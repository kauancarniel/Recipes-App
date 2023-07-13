import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const history = useHistory();
  const userData = JSON.parse(localStorage.getItem('user'));
  const email = userData ? userData.email : '';

  const logout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <>
      <div>
        <Header title="Profile" iconeProfile />
        <p data-testid="profile-email">{email}</p>
        <button
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          data-testid="profile-logout-btn"
          onClick={ logout }
        >
          Logout
        </button>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
