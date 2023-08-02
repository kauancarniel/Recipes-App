import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { MdOutlineDelete } from 'react-icons/md';
import { BiSolidLike, BiSolidDislike } from 'react-icons/bi';

import RecipesContext from '../context/RecipesContext';
import useComment from '../hooks/useComment';
import useFetch from '../hooks/useFetch';

function CommentLikedBtn({ comment, inRecipe }) {
  const { userLogged } = useContext(RecipesContext);
  const { deleteComment, changeLiked } = useComment();
  const { sweetAlert } = useFetch();

  const { id: idLogged } = userLogged || { id: '' };

  const isLiked = comment.liked.includes(idLogged)
    ? 'text-[var(--darkYellow)]' : 'text-white';
  const isDisliked = comment.disliked.includes(idLogged)
    ? 'text-[var(--darkYellow)]' : 'text-white';

  const handleChangeLiked = async (id, name) => {
    await changeLiked(id, name);
  };

  return (
    <div className="flex gap-2 justify-end flex-wrap xs:flex-row-reverse">
      <div className="flex gap-x-4">
        <button
          type="button"
          disabled={ !inRecipe || comment.userId === idLogged }
          className={ `like-btn ${isLiked}` }
          onClick={ () => handleChangeLiked(comment, 'liked') }
        >
          <BiSolidLike size="30px" />
          <span>{comment.liked.length}</span>
        </button>
        <button
          type="button"
          disabled={ !inRecipe || comment.userId === idLogged }
          className={ `like-btn ${isDisliked}` }
          onClick={ () => handleChangeLiked(comment, 'disliked') }
        >
          <BiSolidDislike size="30px" />
          <span>{comment.disliked.length}</span>
        </button>
      </div>
      { comment.userId === idLogged && (
        <button
          type="button"
          className="reset-btn del-in-progress-btn"
          onClick={ () => sweetAlert(deleteComment, comment.id) }
        >
          <MdOutlineDelete size="40px" />
        </button>
      )}
    </div>
  );
}

CommentLikedBtn.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    liked: PropTypes.arrayOf(PropTypes.string).isRequired,
    disliked: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  inRecipe: PropTypes.bool.isRequired,
};

export default CommentLikedBtn;
