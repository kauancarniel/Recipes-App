import React from 'react';
import PropTypes from 'prop-types';

function CommentBtn({ assessment }) {
  const { comment, rating } = assessment;
  return (
    <div className="flex px-2 justify-between w-full">
      <div>
        { `${comment.length}/200` }
      </div>
      <button
        id="button"
        className="button"
        disabled={ !(!!rating && !!comment.length) }
      >
        Comment
      </button>
    </div>
  );
}

CommentBtn.propTypes = {
  assessment: PropTypes.shape({
    rating: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
  }).isRequired,
};

export default CommentBtn;
