import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import RecipesContext from '../context/RecipesContext';
import useFetch from '../hooks/useFetch';
import useComment from '../hooks/useComment';
import Star from './Star';
import CountRatings from './CountRatings';
import CommentBtn from './CommentBtn';
import Comments from './Comments';
import './FormCommentary.css';

const FIVE = 5;
const FOUR = 4;
const THREE = 3;

export default function FormCommentary({ recipe }) {
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
    setComment({ comment: '', rating: 0, photo: userLogged.photo });
    await addComment(assessment, recipe);
  };

  const setAverage = () => {
    const sumRatings = comments.reduce((sum, { rating }) => rating + sum, 0);
    if (sumRatings) return (sumRatings / comments.length).toFixed(2);
    return 'Not yet.';
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
              { ' ' }
              { setAverage() }
            </span>
          </p>
        </div>
      </div>
      <Comments inRecipe />
    </div>
  );
}

FormCommentary.propTypes = {
  recipe: PropTypes.shape({
    recipeName: PropTypes.string,
    recipeType: PropTypes.string,
  }).isRequired,
};
