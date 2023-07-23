/* eslint-disable max-len */
import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

function IconDrinks({ categorySelected = null, strCategory = null }) {
  const { pathname } = useLocation();
  let color;
  if (categorySelected) {
    color = categorySelected === strCategory ? 'var(--green)' : 'var(--yellow)';
  } else {
    color = pathname.includes('/drinks') ? 'var(--orange)' : 'var(--green)';
  }

  return (
    <svg width="28" height="29" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="icone-prato">
        <g id="icone-bebida">
          <path id="Vector" d="M12.1771 16.355V23.9695H7.66525H7.56271V24.072V26.1229V26.2254H7.66525H18.9449H19.0474V26.1229V24.072V23.9695H18.9449H14.433V16.355L25.6859 4.03044L25.7127 4.00106V3.96129V1V0.897458H25.6102H1H0.897458V1V3.96129V4.00106L0.924274 4.03044L12.1771 16.355ZM3.17835 3.15339H23.4318L20.3422 6.53728H6.26797L3.17835 3.15339ZM8.32771 8.79322H18.2824L13.3202 14.228H13.2899L8.32771 8.79322Z" fill={ color } stroke={ color } strokeWidth="0.205085" />
          <path id="Polygon 1" d="M13.3051 17.4067L6.20076 8.17793L20.4094 8.17793L13.3051 17.4067Z" fill={ color } />
        </g>
      </g>
    </svg>
  );
}

IconDrinks.propTypes = {
  categorySelected: PropTypes.string,
  strCategory: PropTypes.string,
};

export default IconDrinks;
