import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getStorage, setStorage } from '../utils/functions';

export default function FormCommentary() {
  const { pathname } = useLocation();
  const [allComents, setAllComents] = useState(getStorage(pathname));
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');
  const [renderFormComment, setRenderForm] = useState(false);

  useEffect(() => { if (!allComents) setStorage(pathname, []); }, []);

  const onChange = ({ target }) => {
    if (target.name === 'comment') setComment(target.value);
    else setRating(target.value);
  };

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
    // setAllComents((prev) => [...prev, { comment, rating, email: user.email }]);
  };
  return (
    <div>
      <h3>Comentarios: </h3>
      <button onClick={ () => setRenderForm((prev) => !prev) }>Adicionar</button>
      {renderFormComment && (
        <form>
          <textarea
            required
            name="comment"
            cols="10"
            rows="2"
            onChange={ onChange }
          />
          <label htmlFor="rating">
            <input
              type="radio"
              name="rating"
              value="1"
              onChange={ onChange }
            />
            1
            <input
              type="radio"
              name="rating"
              value="2"
              onChange={ onChange }
            />
            2
            <input
              type="radio"
              name="rating"
              value="3"
              onChange={ onChange }
            />
            3
            <input
              type="radio"
              name="rating"
              value="4"
              onChange={ onChange }
            />
            4
            <input
              type="radio"
              name="rating"
              value="5"
              onChange={ onChange }
            />
            5
          </label>
          <button
            type="submit"
            data-testid="submit-review-btn"
            onClick={ onSubmit }
          >
            Enviar
          </button>
        </form>
      )}
      {allComents && allComents.map((com, ind) => (
        <div key={ ind }>
          <p>{com.email}</p>
          <p>{`Usuário: ${com.name}`}</p>
          <p>{`Nota: ${com.rating}`}</p>
          <p>{`Comentário: ${com.comment}`}</p>
          <br />
        </div>
      ))}
    </div>
  );
}
