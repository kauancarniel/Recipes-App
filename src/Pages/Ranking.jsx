import React, { useContext, useEffect, useState } from 'react';
import { TbStarsFilled } from 'react-icons/tb';
import { PiStarFill } from 'react-icons/pi';
import { IoPerson } from 'react-icons/io5';
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
  const rankingUsers = ranking.slice(0, MAXRANKING);

  const iconsRanked = {
    0: <TbStarsFilled size={ 30 } />,
    1: (
      <>
        <PiStarFill />
        <PiStarFill />
      </>
    ),
    2: <PiStarFill />,
    3: <IoPerson color="var(--gray)" size={ 20 } />,
  };

  return (
    <>
      <Header title="Ranking" />
      <main className="min-h-screen recipe-box bg-form glass p-10 mb-16 rounded-b-lg">
        {loading && (
          <div className="w-full h-[80vh] flex-center">
            <h2 className="text-[var(--yellow)]">Loading...</h2>
          </div>
        )}
        <table className="table-auto w-[100%]">
          <tbody>
            {rankingUsers.map((user, index) => {
              const { name, score } = user;
              const medalIcon = index <= 2 ? iconsRanked[index] : iconsRanked[3];
              return (
                <tr key={ user.id } className="border-grey p-2 items-center border-[0.1px] rounded-none m-1">
                  <td className="text-center w-[15%] border-r-[1px] border-white p-2">
                    {medalIcon && (
                      <p
                        className={ `text-yellow-500 ${index === 0 ? 'text-[30px]' : ''}
                         text-center m-0` }
                      >
                        {medalIcon}
                      </p>
                    )}
                  </td>
                  <td className="text-[var(--gray)] font-bold text-lg pl-2 p-2">
                    {name}
                  </td>
                  <td className="text-[var(--darkYellow)] border-l-[1px] border-white font-bold text-2xl text-center w-10">{score}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </>
  );
}

export default Ranking;
