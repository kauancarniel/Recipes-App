import React, { useContext, useEffect, useState } from 'react';
import { TbStarsFilled } from 'react-icons/tb';
import { PiStarFill } from 'react-icons/pi';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import { fetchRanking } from '../services/fetchAPI';
import useUser from '../hooks/useUser';

function Ranking() {
  const { loading } = useContext(RecipesContext);
  const [ranking, setRanking] = useState([]);
  const { validateCookie } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      const isLogged = await validateCookie();
      if (!isLogged) return;
      const dataUsers = await fetchRanking();
      setRanking(dataUsers);
    };
    fetchData();
  }, []);

  const MAXRANKING = 10;
  const TOP10 = ranking.slice(0, MAXRANKING);

  const medalIcons = {
    0: <TbStarsFilled size={ 30 } />,
    1: (
      <>
        <PiStarFill />
        <PiStarFill />
      </>
    ),
    2: <PiStarFill />,
  };

  return (
    <>
      <Header title="Ranking" />
      <main className="min-h-screen recipe-box bg-form glass p-0 mb-16 rounded-b-lg">
        {loading && (
          <div className="w-full h-[80vh] flex-center">
            <h2 className="text-[var(--yellow)]">Loading...</h2>
          </div>
        )}
        <section className="flex flex-col p-[28px] ">
          {TOP10.map((user, index) => {
            const { name, score } = user;
            const medalIcon = index < 3 && medalIcons[index];
            return (
              <div
                key={ user.id }
                className="flex border-grey
               p-2 items-center border-[0.1px] rounded-none"
              >
                {medalIcon && (
                  <div className="flex justify-center items-center w-[15%]">
                    <p
                      className={ `mr-2 text-yellow-500 ${index === 0 && 'text-[30px]'}` }
                    >
                      {medalIcon}
                    </p>
                  </div>
                )}
                <p
                  className={ `mr-2 ${index > 2 ? 'ml-7' : 'ml-0'}
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
