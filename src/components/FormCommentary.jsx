import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getStorage, setStorage } from '../utils/functions';

import Star from './Star';
import './FormCommentary.css';

export default function FormCommentary() {
  const star = '★';
  const notas = ['5', '4', '3', '2', '1'];

  const { pathname } = useLocation();
  const [allComents, setAllComents] = useState(getStorage(pathname));
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');

  useEffect(() => { if (!allComents) setStorage(pathname, []); }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    const user = getStorage('user');
    const coment = [...getStorage(pathname), { comment,
      rating,
      email: user.email,
      name: user.name,
      age: user.age }];
    setAllComents(coment);
    setStorage(pathname, coment);
    const radioInputs = document.getElementsByName('rating');
    radioInputs.forEach((input) => {
      input.checked = false;
    });
    setComment('');
  };
  return (
    <div className="flex flex-col space-x-10 gap-2 items-center">
      <h3 className="self-start ml-15">Comentarios: </h3>
      <form>
        <div className="rating flex flex-row-reverse justify-end">
          { notas.map((nota) => (
            <Star key={ nota } nota={ nota } setRating={ setRating } />
          )) }
        </div>
        <div className="flex flex-col items-center">
          <textarea
            className="resize-none block p-2.5 w-full text-sm text-gray-900
            rounded-lg border border-gray-300 focus:ring-blue-500
           focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400
            dark:focus:ring-blue-500 dark:focus:border-blue-500"
            maxLength="200"
            id="formComment"
            required
            name="comment"
            cols="40"
            rows="3"
            value={ comment }
            onChange={ ({ target }) => setComment(target.value) }
          />
          {/* <p>{200 - comment.length}</p> */}
          <button
            id="button"
            className="self-end"
            disabled={ rating.length === 0 }
            type="submit"
            onClick={ onSubmit }
          >
            Comentar
          </button>
        </div>
      </form>
      <div className="self-start divide-y">
        {allComents && allComents.map((com, ind) => (
          <div key={ ind } className="flex flex-col mb-8">
            <p> com.name </p>
            <div className="flex flex-row">
              <p>
                { `${com.rating},0  `}
              </p>
              <p id="st">
                {Array.from({ length: Number(com.rating) }, () => star).join('')}
              </p>
            </div>
            <p>{ com.comment }</p>
          </div>
        ))}
      </div>
    </div>
  );
}
