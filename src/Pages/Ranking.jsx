import React, { useContext } from 'react';
import Header from '../components/Header';
import usersData from '../data/db.json';
import RecipesContext from '../context/RecipesContext';
import { fetchUsers } from '../services/fetchAPI';

function Ranking() {
  const { user } = useContext(RecipesContext);
  const { users } = usersData;
  const identifyUser = users.find((userData) => userData.email === user.email);



  return (
    <>
    {console.log(fetchUsers(user.id))}
      <Header title="Ranking" />
      <main className="min-h-screen recipe-box bg-form glass p-0 mb-16 rounded-b-lg">
      {console.log(identifyUser)}
        <h1 data-testid="ranking-title">Ranking</h1>
      </main>
    </>
  );
}

export default Ranking;
