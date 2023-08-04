import React from 'react';
import { useHistory } from 'react-router';
import img from '../images/imgNotFounded.png';
import './NotFound.css';

export default function NotFound() {
  const history = useHistory();
  const exit = () => {
    history.push('/meals');
  };
  return (
    <div
      className="flex justify-center items-center my-auto
      flex-col bg-notFounded glass w-1/2 mx-auto rounded-xl p-10 h-150"
    >
      <img src={ img } alt="asd" className="mt-30" />
      <h1>Page Not Found</h1>
      <button id="buttonNotFound" onClick={ exit }>Back To Home</button>
    </div>
  );
}
