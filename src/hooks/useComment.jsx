import { useContext } from 'react';
import { useParams } from 'react-router-dom';

import RecipesContext from '../context/RecipesContext';
import { fetchAllComments, fetchDeleteComment, fetchPatchComment,
  fetchPostComment } from '../services/fetchAPI';

const useComment = () => {
  const { userLogged, setComments, setError, comments } = useContext(RecipesContext);
  const { id: idUrl } = useParams();

  const addComment = async ({ comment, rating }, { recipeName, recipeType }) => {
    const formatedComment = {
      recipeId: idUrl,
      recipeName,
      recipeType,
      userId: userLogged.id,
      comment,
      rating,
      liked: [],
      disliked: [],
      createAt: new Date().toISOString(),
    };
    setComments((prevComments) => [formatedComment, ...prevComments]);
    await fetchPostComment(formatedComment);
  };

  const deleteComment = async (id) => {
    try {
      const allComments = await fetchAllComments();
      const newAllComments = allComments.filter((comment) => comment.id !== id);
      const newComments = comments.filter((comment) => comment.id !== id);
      await fetchDeleteComment(id, newAllComments);
      setComments(newComments);
    } catch ({ message }) {
      setError(message);
      return [];
    }
  };

  const changeLiked = async (comment, name) => {
    const other = name === 'liked' ? 'disliked' : 'liked';
    let names = null;
    let others = null;
    if (comment[name].includes(userLogged.id)) {
      names = comment[name].filter((userId) => userId !== userLogged.id);
      setComments(comments.map((com) => {
        if (com.id === comment.id) {
          return {
            ...com,
            [name]: names,
          };
        }
        return com;
      }));
    } else {
      if (comment[other].includes(userLogged.id)) {
        others = comment[other].filter((userId) => userId !== userLogged.id);
      }
      names = [userLogged.id, ...comment[name]];
      setComments(comments.map((com) => {
        if (com.id === comment.id) {
          return {
            ...com,
            [name]: names,
            [other]: others || comment[other],
          };
        }
        return com;
      }));
    }
    await fetchPatchComment(comment.id, {
      [name]: names,
      [other]: others || comment[other],
    });
  };

  return { addComment, deleteComment, changeLiked };
};

export default useComment;
