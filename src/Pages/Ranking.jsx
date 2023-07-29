import React, { useContext } from 'react';
import Header from '../components/Header';
import usersData from '../data/db.json';
import RecipesContext from '../context/RecipesContext';

function Ranking() {
  const { users } = usersData;
  const { loading } = useContext(RecipesContext);

  return (
    <>
      <Header title="Ranking" />
      <main className="min-h-screen recipe-box bg-form glass p-0 mb-16 rounded-b-lg">
        { loading && (
          <div className="w-full h-[80vh] flex-center">
            <h2 className="text-[var(--yellow)]">Loading...</h2>
          </div>
        )}
        <section className="flex flex-col p-[28px] ">
          <h1 className="mb-9 text-center text-[var(--orange)]">Colocações</h1>
          {users
            .sort((a, b) => b.points - a.points)
            .map((user, index) => {
              const { name, points } = user;
              let medalIcon = null;
              if (index === 0) {
                medalIcon = '🥇';
              } else if (index === 1) {
                medalIcon = '🥈';
              } else if (index === 2) {
                medalIcon = '🥉';
              }
              return (
                <div
                  key={ user.id }
                  className="flex border-grey p-2 border-[0.1px] rounded-none"
                >
                  {medalIcon && <p className="mr-2">{medalIcon}</p>}
                  <p
                    className={ ` mr-2 ${index > 2 ? 'ml-7' : 'ml-0'} 
                    text-[var(--gray)] font-bold` }
                  >
                    {name}
                  </p>
                  <p className="text-[var(--darkYellow)] font-bold">{points}</p>
                </div>
              );
            })}
        </section>
      </main>
    </>
  );
}

export default Ranking;
