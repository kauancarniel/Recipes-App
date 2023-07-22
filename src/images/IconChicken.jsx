/* eslint-disable react/jsx-max-depth */
/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';

function IconChicken({ categorySelected, strCategory }) {
  const color = categorySelected === strCategory ? '#7D8C00' : '#F9EFBB';

  return (
    <svg width="24" height="29" viewBox="0 0 25 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="&#240;&#159;&#166;&#134; emoji &#34;chicken&#34;">
        <path id="Vector" d="M16.95 8.38575C16.95 8.38575 19.0641 4.88236 18.0977 4.39914C17.1312 3.91591 15.6816 4.88236 15.6816 4.88236C15.6816 4.88236 16.648 1.49979 14.7151 1.49979C12.7822 1.49979 12.299 3.43269 12.299 3.43269C12.299 3.43269 11.5949 -0.576147 8.91642 0.533337C7.24253 1.22677 6.5003 2.94946 8.91642 7.78171" fill={ color } />
        <path id="Vector_2" d="M8.90485 18.1084C9.65508 18.1084 10.2633 17.5003 10.2633 16.75C10.2633 15.9998 9.65508 15.3916 8.90485 15.3916C8.15463 15.3916 7.54645 15.9998 7.54645 16.75C7.54645 17.5003 8.15463 18.1084 8.90485 18.1084Z" fill={ color } />
        <path id="Vector_3" d="M17.603 18.1084C18.3532 18.1084 18.9614 17.5003 18.9614 16.75C18.9614 15.9998 18.3532 15.3916 17.603 15.3916C16.8527 15.3916 16.2446 15.9998 16.2446 16.75C16.2446 17.5003 16.8527 18.1084 17.603 18.1084Z" fill={ color } />
        <g id="Group">
          <path id="Vector_4" d="M12.8717 18.291C12.8717 18.291 21.5697 17.8077 12.8717 26.989C12.8717 26.989 4.17361 18.291 12.8717 18.291Z" fill={ color } />
          <path id="Vector_5" d="M12.862 28.4387C12.9072 29.7963 12.9079 29.7963 12.9086 29.7963L12.9104 29.7962L12.9149 29.7961L12.928 29.7956L12.9695 29.7937C13.004 29.792 13.0518 29.7894 13.1118 29.7855C13.2319 29.7776 13.4012 29.7644 13.6108 29.7427C14.0292 29.6993 14.6128 29.6214 15.288 29.4822C16.6199 29.2078 18.3953 28.6777 19.9578 27.6361C21.5473 26.5764 22.9556 24.9547 23.3739 22.5563C23.782 20.2163 23.2083 17.3565 21.3474 13.8579C21.327 13.8067 21.2988 13.7382 21.2625 13.6548C21.187 13.4813 21.0758 13.2418 20.9254 12.9582C20.6261 12.3939 20.1637 11.6393 19.5075 10.8795C18.1898 9.3538 16.0317 7.75128 12.862 7.75128C9.69222 7.75128 7.53409 9.3538 6.2164 10.8795C5.56026 11.6393 5.09779 12.3939 4.79856 12.9582C4.64818 13.2418 4.53691 13.4813 4.4614 13.6548C4.42511 13.7382 4.39694 13.8067 4.37655 13.8579C2.51567 17.3565 1.94189 20.2163 2.35004 22.5563C2.76837 24.9547 4.17658 26.5764 5.76613 27.6361C7.32866 28.6777 9.10399 29.2078 10.436 29.4822C11.1111 29.6214 11.6948 29.6993 12.1131 29.7427C12.3227 29.7644 12.4921 29.7776 12.6121 29.7855C12.6721 29.7894 12.72 29.792 12.7544 29.7937L12.796 29.7956L12.809 29.7961L12.8135 29.7962L12.8153 29.7963C12.816 29.7963 12.8167 29.7963 12.862 28.4387ZM12.862 28.4387L12.8167 29.7963C12.8469 29.7973 12.8771 29.7973 12.9072 29.7963L12.862 28.4387Z" stroke={ color } strokeWidth="2.71681" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
    </svg>

  );
}

IconChicken.propTypes = {
  categorySelected: PropTypes.string.isRequired,
  strCategory: PropTypes.string.isRequired,
};

export default IconChicken;
