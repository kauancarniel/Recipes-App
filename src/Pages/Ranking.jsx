import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import { fetchRanking } from '../services/fetchAPI';
import useUser from '../hooks/useUser';

function Ranking() {
  const { loading } = useContext(RecipesContext);
  const [ranking, setRanking] = useState([]);
  const { validateCookie } = useUser();
  useEffect(() => {
    (async () => {
      const isLogged = await validateCookie();
      if (!isLogged) return;
      const dataUsers = await fetchRanking();
      setRanking(dataUsers);
    })();
  }, []);

  const MAXRANKING = 10;
  const TOP10 = ranking.slice(0, MAXRANKING);

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
          {TOP10.map((user, index) => {
            const { name, score } = user;
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
                <p className="text-[var(--darkYellow)] font-bold">{score}</p>
              </div>
            );
          })}
        </section>
      </main>
    </>
  );
}

export default Ranking;
