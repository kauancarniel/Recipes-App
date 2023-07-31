import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import RecipesContext from '../context/RecipesContext';
import Star from './Star';
import './FormCommentary.css';
import { fetchComments } from '../services/fetchAPI';

export default function FormCommentary() {
  const { userLogged } = useContext(RecipesContext);
  const { pathname } = useLocation();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('0');
  const [comments, setComments] = useState([]);

  const URL_ARRAY = pathname.split('/');
  const key = `${URL_ARRAY[1]}/${URL_ARRAY[2]}`;

  useEffect(() => {
    (async () => {
      if (userLogged) {
        const dataComments = await fetchComments(key);
        console.log(dataComments);
        setComments(dataComments);
      }
    })();
  }, [userLogged]);

  const star = '★';
  const grades = ['5', '4', '3', '2', '1'];

  const handleSubmit = async () => {
    setRating('0');
    setComment('');
    // await fetchAddComment(key, comment, rating, userLogged);
  };

  return (
    <div className="flex flex-col items-center mt-10 px-3">
      <h3 className="self-start text-white">Comments: </h3>
      <form
        onSubmit={ (event) => {
          event.preventDefault();
          handleSubmit();
        } }
      >
        <div className="rating flex flex-row-reverse justify-end">
          { grades.map((grade) => (
            <Star
              key={ grade }
              grade={ grade }
              setRating={ setRating }
              rating={ rating }
            />
          )) }
        </div>
        <div className="flex flex-col items-center gap-y-2">
          <textarea
            className="resize-none block bg-transparent p-2.5 w-full text-sm text-white
            rounded-lg border border-solid border-gray-300 outline-none"
            maxLength="200"
            id="formComment"
            required
            name="comment"
            cols="40"
            rows="3"
            value={ comment }
            onChange={ ({ target }) => setComment(target.value) }
            placeholder="Add a comment..."
          />
          <button
            id="button"
            className="self-end"
            disabled={ !(!!rating && !!comment.length) }
          >
            Comment
          </button>
        </div>
      </form>
      <div className="self-start divide-y max-w-xs">
        { comments
    && comments.map((com, ind) => {
      return (
        <div key={ ind } className="flex flex-col mb-10">
          <p className="mb-0 text-white">{com.name}</p>
          <div className="flex flex-row">
            <p className="mb-0 text-white">{`${com.rat},0  `}</p>
            <p id="st" className="mb-0">
              {Array.from({ length: Number(com.rat) }, () => star).join('')}
            </p>
          </div>
          <p className="text-white break-words">{com.text}</p>
        </div>
      );
    })}
      </div>
    </div>
  );
}
