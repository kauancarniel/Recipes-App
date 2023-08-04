import React from 'react';
import img from '../images/imgNotFounded.png';

export default function NotFound() {
  return (
    <div
      className="flex justify-center items-center my-auto
      flex-col bg-notFounded glass w-1/2 mx-auto rounded-xl p-10 h-150"
    >
      <img src={ img } alt="asd" className="mt-30" />
      <h1>Page Not Found</h1>
      <button
        className="cursor-pointer duration-200 hover:scale-125 active:scale-100"
        title="Go To Homee"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 24 24" className="stroke-blue-300">
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="1.5"
            d="M11 6L5 12M5 12L11 18M5 12H19"
          />
        </svg>
      </button>
    </div>
  );
}
