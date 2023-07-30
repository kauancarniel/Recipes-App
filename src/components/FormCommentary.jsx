import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import data from '../data/db.json';
import Star from './Star';
import './FormCommentary.css';
import RecipesContext from '../context/RecipesContext';

export default function FormCommentary({ onSubmit }) {
  const { pathname } = useLocation();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('0');
  const { userLogged } = useContext(RecipesContext);
  const parts = pathname.split('/');
  const limitBarra = 3;
  const requiredPart = parts.slice(1, limitBarra).join('/');
  const url = `/${requiredPart}`;
  const { comments } = data;
  const star = '★';
  const grades = ['5', '4', '3', '2', '1'];

  return (
    <div className="flex flex-col items-center mt-10 px-3">
      <h3 className="self-start text-white">Comments: </h3>
      <form>
        <div className="rating flex flex-row-reverse justify-end">
          { grades.map((nota) => (
            <Star key={ nota } nota={ nota } setRating={ setRating } />
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
            disabled={ rating === '0' }
            type="submit"
            onClick={ (event) => {
              event.preventDefault();
              const radioInputs = document.getElementsByName('rating');
              radioInputs.forEach((input) => {
                input.checked = false;
              });
              setRating('0');
              setComment('');
              onSubmit(url, comment, rating, userLogged.name);
            } }
          >
            Comment
          </button>
        </div>
      </form>
      <div className="self-start divide-y max-w-xs">
        { comments[url]
    && comments[url].map((com, ind) => {
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

FormCommentary.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
