import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import RecipesContext from '../context/RecipesContext';
import CommentLikedBtn from './CommentLikedBtn';

const TEEN = 10;

function Comments({ inRecipe = false }) {
  const { comments } = useContext(RecipesContext);

  const star = '★';
  const MAX_COMMENTS = inRecipe ? TEEN : comments.length;

  return (
    <div className="flex flex-col w-full items-center">
      {comments.slice(0, MAX_COMMENTS)
        .sort((a, b) => (
          ((b.liked.length + b.disliked.length) - (a.liked.length + a.disliked.length))
        )).map((comment) => (
          <div
            key={ comment.id }
            className="comment-container"
          >
            <div className="flex justify-between">
              <div>
                { inRecipe ? (
                  <p className="mb-0 text-white">{comment.userName}</p>
                ) : (
                  <Link
                    to={ `/${comment.recipeType}s/${comment.recipeId}` }
                    className="mb-0 text-white"
                  >
                    {comment.recipeName}
                  </Link>
                )}
                <div className="flex items-center gap-x-2">
                  <p className="mb-0 text-white">{`${comment.rating},0  `}</p>
                  <p className="mb-0 text-[#ffa723] text-[20px]">
                    {Array.from({ length: comment.rating }, () => star).join('')}
                  </p>
                </div>
              </div>
              <CommentLikedBtn comment={ comment } inRecipe={ inRecipe } />
            </div>
            <p className="text-white break-words m-0">{comment.comment}</p>
          </div>
        ))}
    </div>
  );
}

Comments.propTypes = {
  inRecipe: PropTypes.bool,
};

export default Comments;
