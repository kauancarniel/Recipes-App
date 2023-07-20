import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './RecommendRecipes.css';

function RecommendRecipes({ recommendRecipes }) {
  const { pathname } = useLocation();
  const KEY_BASE = pathname.split('/')[1] === 'meals' ? 'Drink' : 'Meal';

  return (
    <Carousel className="mb-10">
      {recommendRecipes.map((recipe, index) => (
        <Carousel.Item key={ `${recipe[`id${KEY_BASE}`]}${recipe[`str${KEY_BASE}`]}` }>
          <div className='bg-black  '>
            <h1 className='absolute text-white font-bold left-7 top-3 text-xl'>Recommends</h1>
            <img
              className="w-[100%] h-[250px] opacity-40  border-2 border-black border-r-0 border-l-0 "
              src={ `${recipe[`str${KEY_BASE}Thumb`]}` }
              alt={ `${recipe[`str${KEY_BASE}`]}` }
              data-testid={ `${index}-recommendation-card` }
            />
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

RecommendRecipes.propTypes = {
  recommendRecipes: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
};

export default RecommendRecipes;
