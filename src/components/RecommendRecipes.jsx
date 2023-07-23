import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function RecommendRecipes({ recommendRecipes }) {
  const { pathname } = useLocation();
  const KEY_BASE = pathname.split('/')[1] === 'meals' ? 'Drink' : 'Meal';

  return (
    <div>
      <h1 className="recommend-title">Recommends</h1>
      <Carousel className="mb-10 flex">
        {recommendRecipes.map((recipe, index) => (
          <Carousel.Item key={ `${recipe[`id${KEY_BASE}`]}${recipe[`str${KEY_BASE}`]}` }>
            <div className="bg-black ">
              <img
                className="caroussel-img shadow-img"
                src={ `${recipe[`str${KEY_BASE}Thumb`]}` }
                alt={ `${recipe[`str${KEY_BASE}`]}` }
                data-testid={ `${index}-recommendation-card` }
              />
              <h4
                className="absolute
               top-5 left-3 p-3 text-white"
              >
                {recipe[`str${KEY_BASE}`]}

              </h4>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

RecommendRecipes.propTypes = {
  recommendRecipes: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
};

export default RecommendRecipes;
