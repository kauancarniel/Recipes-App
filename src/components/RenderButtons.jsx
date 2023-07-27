import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { PiBowlFoodFill } from 'react-icons/pi';
import { IoListCircleSharp } from 'react-icons/io5';

import IngredientsList from './IngredientsList';

export default function RenderButtons({ title, recipe, isInProgress }) {
  const [visible, setVisible] = useState(false);

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
        <div className={ `${visible ? 'animate-open' : 'h-0'} ` }>
          {title === 'Ingredients' ? (
              <IngredientsList recipe={ recipe } isInProgress={ isInProgress }
              visible={ visible }
              />
          ) : (
            <div className={ visible ? 'animate-open' : 'h-0' }>
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
