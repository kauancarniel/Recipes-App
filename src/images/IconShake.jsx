/* eslint-disable react/jsx-max-depth */
/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';

function IconShake({ categorySelected, strCategory }) {
  const color = categorySelected === strCategory ? 'var(--green)' : 'var(--yellow)';

  return (
    <svg width="21" height="29" viewBox="0 0 22 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="&#240;&#159;&#166;&#134; icon &#34;drink&#34;">
        <g id="Group">
          <path id="Vector" d="M1.90002 9.95215H20.455" stroke={ color } strokeWidth="2.65071" strokeLinecap="round" />
          <path id="Vector_2" d="M4.65212 11.3719C4.59731 10.6048 5.20499 9.95215 5.97416 9.95215H16.3809C17.15 9.95215 17.7577 10.6048 17.7029 11.3719L16.5669 27.2762C16.5173 27.9698 15.9402 28.5071 15.2449 28.5071H7.11013C6.41484 28.5071 5.83772 27.9698 5.78815 27.2762L4.65212 11.3719Z" stroke={ color } strokeWidth="2.65071" />
          <path id="Vector_3" d="M11.1775 5.97607V3.32536C11.1775 2.59338 11.7709 2 12.5028 2H14.4909" stroke={ color } strokeWidth="2.65071" strokeLinecap="round" />
          <path id="Vector_4" d="M5.02884 7.08348C5.13534 6.44439 5.68827 5.97601 6.33617 5.97601H16.0188C16.6667 5.97601 17.2197 6.44439 17.3262 7.08348L17.8043 9.95208H4.55072L5.02884 7.08348Z" fill={ color } stroke={ color } strokeWidth="2.65071" />
        </g>
      </g>
    </svg>

  );
}

IconShake.propTypes = {
  categorySelected: PropTypes.string.isRequired,
  strCategory: PropTypes.string.isRequired,
};

export default IconShake;
