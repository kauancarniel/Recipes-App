import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import RecipesContext from '../context/RecipesContext';
import useFetch from '../hooks/useFetch';
import useComment from '../hooks/useComment';
import Star from './Star';
import './FormCommentary.css';
import CountRatings from './CountRatings';
import CommentBtn from './CommentBtn';

const FIVE = 5;
const FOUR = 4;
const THREE = 3;

export default function FormCommentary() {
  const { userLogged, comments, setComments } = useContext(RecipesContext);
  const { id } = useParams();
  const { fetchRecipeComments } = useFetch();
  const { addComment } = useComment();
  const [assessment, setComment] = useState({ comment: '', rating: 0 });

  useEffect(() => {
    (async () => {
      if (userLogged) {
        const dataComments = await fetchRecipeComments('recipeId', id);
        setComments(dataComments);
      }
    })();
  }, []);

  const star = '★';
  const grades = [FIVE, FOUR, THREE, 2, 1];

  const handleSubmit = async () => {
    setComment({ comment: '', rating: 0 });
    await addComment(assessment);
  };

  return (
    <div className="flex flex-col items-center mt-10 px-3 text-white">
      <h3 className="self-start text-white">Assessments: </h3>
      <div className="w-full flex flex-wrap justify-around gap-4">
        <form
          onSubmit={ (event) => {
            event.preventDefault();
            handleSubmit();
          } }
        >
          <div className="flex justify-between px-2 items-center">
            <h4 className="m-1">Evaluate:</h4>
            <div className="rating flex flex-row-reverse justify-end">
              { grades.map((grade) => (
                <Star
                  key={ grade }
                  grade={ grade }
                  setComment={ setComment }
                  assessment={ assessment }
                />
              )) }
            </div>
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
              value={ assessment.comment }
              onChange={ ({ target: { name, value } }) => {
                setComment({ ...assessment, [name]: value });
              } }
              placeholder="Add a comment..."
            />
            <CommentBtn assessment={ assessment } />
          </div>
        </form>
        <div>
          <h4 className="m-1">
            {`Rated by ${comments.length} people.`}
          </h4>
          { grades.map((grade) => {
            const commentsLength = comments
              .filter(({ rating }) => rating === grade).length;
            return (
              <div className="text-[#ffa723] text-[20px]" key={ grade }>
                <p className="m-0">
                  {Array.from({ length: grade }, () => star).join('')}
                  <span className="text-white text-[16px] m-0">
                    {` ${commentsLength} people`}
                  </span>
                </p>
                <CountRatings commentsLength={ commentsLength } />
              </div>
            );
          }) }
          <p className="my-3 text-[20px]">
            Average rating:
            <span className="text-[#ffa723] font-bold">
              { ` ${(comments
                .reduce((sum, { rating }) => rating + sum, 0) / comments.length)
                .toFixed(2)}` }
            </span>
          </p>
        </div>
      </div>
      <div className="self-start divide-y max-w-xs">
        { comments
    && comments.map(({ id: comId, userName, rating, comment }) => {
      return (
        <div key={ comId } className="flex flex-col mb-10">
          <p className="mb-0 text-white">{userName}</p>
          <div className="flex items-center">
            <p className="mb-0 text-white">{`${rating},0  `}</p>
            <p className="mb-0 text-[#ffa723] text-[20px]">
              {Array.from({ length: rating }, () => star).join('')}
            </p>
          </div>
          <p className="text-white break-words">{comment}</p>
        </div>
      );
    })}
      </div>
    </div>
  );
}
