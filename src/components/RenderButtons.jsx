import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { PiBowlFoodFill } from 'react-icons/pi';
import { IoListCircleSharp } from 'react-icons/io5';

import IngredientsList from './IngredientsList';

export function RenderButtons({ title, recipe, isInProgress }) {
  const [visible, setVisible] = useState(false);
  const animateOpen = 'animate-open';

  const lgWidth = 1024;
  const windowWidth = (window.innerWidth > lgWidth);

  useEffect(() => {
    (async () => {
      setVisible(windowWidth);
    })();
  }, []);

  return (
    <div>
      {' '}
      <button
        className="btn-design lg:w-[100%] "
        onClick={ () => {
          setVisible(!visible);
        } }
      >
        {title === 'Ingredients' ? (
          <PiBowlFoodFill />
        ) : (
          <IoListCircleSharp />
        )}
        <h4 className="p-1 tam-title">{title}</h4>
      </button>
      {visible && (
        <div className={ `${visible ? animateOpen : 'h-0'} ` }>
          {title === 'Ingredients' ? (
            <ul
              className={ `text-sm p-0 ${visible ? animateOpen : 'h-0'}
       ` }
            >
              <IngredientsList recipe={ recipe } isInProgress={ isInProgress } />
            </ul>
          ) : (
            <div className={ visible ? animateOpen : 'h-0' }>
              <p
                className="text-white"
                data-testid="instructions"
              >
                {recipe.strInstructions}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

RenderButtons.propTypes = {
  title: PropTypes.string.isRequired,
  isInProgress: PropTypes.bool.isRequired,
  recipe: PropTypes.shape({
    strInstructions: PropTypes.string.isRequired,
    strYoutube: PropTypes.string.isRequired,
  }).isRequired,
};
