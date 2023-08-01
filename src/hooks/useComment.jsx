import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import RecipesContext from '../context/RecipesContext';
import { fetchPostComment } from '../services/fetchAPI';

const useComment = () => {
  const { userLogged, setComments } = useContext(RecipesContext);
  const { id: idUrl } = useParams();

  const addComment = async ({ comment, rating }) => {
    const formatedComment = {
      id: uuidv4(),
      recipeId: idUrl,
      userId: userLogged.id,
      userName: userLogged.name,
      comment,
      rating,
      liked: [],
      disliked: [],
      createAt: new Date().toISOString(),
    };
    setComments((prevComments) => [formatedComment, ...prevComments]);
    await fetchPostComment(formatedComment);
  };
  return { addComment };
};

export default useComment;
