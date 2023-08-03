import React, { useContext, useEffect, useState } from 'react';
import { TbStarsFilled } from 'react-icons/tb';
import { PiStarFill } from 'react-icons/pi';
import { IoPerson } from 'react-icons/io5';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import { fetchRanking } from '../services/fetchAPI';
import useUser from '../hooks/useUser';

function Ranking() {
  const { loading, userLogged } = useContext(RecipesContext);
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

  const { name, id, score } = userLogged || { name: '', id: '', score: '' };
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
      <main className="recipe-box bg-form glass p-10 mb-16 rounded-b-lg">
        {loading ? (
          <div className="w-full h-[80vh] flex-center">
            <h2 className="text-[var(--yellow)]">Loading...</h2>
          </div>
        ) : (
          <>
            <h3 className="font-bold p-2 m-0 text-white">
              SUA COLOCAÇÃO:
            </h3>
            <table className="table-auto w-[100%] mb-5 text-white">
              <thead>
                <tr className="border-grey table-icon">
                  <th className="text-center w-[15%] border-r-[1px]  p-2">
                    position
                  </th>
                  <th className="text-center border-r-[1px]  p-2">
                    User
                  </th>
                  <th className="text-center border-r-[1px]  p-2">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-grey table-icon">
                  <td className="text-center border-r-[1px] p-2">
                    { `${ranking.findIndex((el) => el.id === id) + 1} ` }
                  </td>
                  <td className="text-[var(--gray)] font-bold text-lg p-2">
                    {name}
                  </td>
                  <td className="table-score">
                    {score}
                  </td>
                </tr>
              </tbody>
            </table>
            <h3 className="font-bold p-2 m-0 text-white">
              TOP 10:
            </h3>
            <table className="table-auto w-[100%]">
              <tbody>
                {rankingUsers.map((user, index) => {
                  const medalIcon = index <= 2 ? iconsRanked[index] : iconsRanked[3];
                  return (
                    <tr key={ user.id } className="border-grey table-icon">
                      <td className="text-center w-[15%] border-r-[1px]  p-2">
                        {medalIcon && (
                          <span
                            className={ `${index === 0
                              ? 'text-[30px]' : ''} icon-design` }
                          >
                            {medalIcon}
                          </span>
                        )}
                      </td>
                      <td
                        className={ `name-top-ranking ${user.name === name
                          ? 'text-[var(--darkYellow)]' : ''}` }
                      >
                        {user.name}
                      </td>
                      <td className="table-score">{user.score}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </main>
    </>
  );
}

export default Ranking;
