import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function RecommendRecipes({ recommendRecipes }) {
  const { pathname } = useLocation();
  const KEY_BASE = pathname.split('/')[1] === 'meals' ? 'Drink' : 'Meal';

  return (
    <div className="md:border-grey md:flex md:justify-center md:p-6 ">
      <h1 className="recommend-title">Recommends</h1>
      <Carousel className=" flex bg-inherit md:w-[70%] box-shadow ">
        {recommendRecipes.map((recipe, index) => (
          <Carousel.Item key={ `${recipe[`id${KEY_BASE}`]}` }>
            <div className="bg-black lg:rounded-xl">
              <img
                className="caroussel-img lg:rounded-xl"
                src={ `${recipe[`str${KEY_BASE}Thumb`]}` }
                alt={ `${recipe[`str${KEY_BASE}`]}` }
                data-testid={ `${index}-recommendation-card` }
              />
              <h4
                className="absolute
               top-5 left-3 p-3  sm:left-[1%]  text-white"
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
