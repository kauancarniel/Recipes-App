/* eslint-disable react/jsx-max-depth */
/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';

function IconDessert({ categorySelected, strCategory }) {
  const color = categorySelected === strCategory ? 'var(--green)' : 'var(--yellow)';

  return (
    <svg width="33" height="29" viewBox="0 0 29 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="&#240;&#159;&#166;&#134; emoji &#34;shortcake&#34;">
        <g id="Group">
          <path id="Vector" d="M27.212 10.0158V22.641C27.212 23.0912 26.8473 23.4555 26.3975 23.4555H2.7762C2.32637 23.4555 1.96167 23.0912 1.96167 22.641V10.0158C1.96167 9.56641 2.32637 9.2013 2.7762 9.2013L16.6216 6.9864" stroke={ color } strokeWidth="2.71681" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
          <path id="Vector_2" d="M23.5542 5.96408C25.6084 6.17187 27.212 7.90713 27.212 10.0158" stroke={ color } strokeWidth="2.71681" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
          <path id="Vector_3" d="M1.96168 9.65929L2.36894 14.903C3.49368 14.903 4.40526 13.9914 4.40526 12.8671C4.40526 11.7423 5.31683 10.8304 6.44157 10.8304C7.56631 10.8304 8.47789 11.7423 8.47789 12.8671C8.47789 13.9914 9.38947 14.903 10.5142 14.903C11.6389 14.903 12.5505 13.9914 12.5505 12.8671C12.5505 11.7423 13.4621 10.8304 14.5868 10.8304C15.7116 10.8304 16.6232 11.7423 16.6232 12.8671C16.6232 13.9914 17.5347 14.903 18.6595 14.903C19.7842 14.903 20.6958 13.9914 20.6958 12.8671C20.6958 11.7423 21.6074 10.8304 22.7321 10.8304C23.8568 10.8304 24.7684 11.7423 24.7684 12.8671C24.7684 13.9914 25.68 14.903 26.8047 14.903L26.413 6.48967" fill={ color } />
          <path id="Vector_4" d="M1.96167 18.8845H27.212" stroke={ color } strokeWidth="2.71681" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
          <path id="Vector_5" d="M20.0849 9.33813C21.9598 9.33813 23.4796 7.81826 23.4796 5.94341C23.4796 4.06855 21.9598 2.54868 20.0849 2.54868C18.21 2.54868 16.6902 4.06855 16.6902 5.94341C16.6902 7.81826 18.21 9.33813 20.0849 9.33813Z" fill="none" stroke={ color } strokeWidth="2.71681" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
          <path id="Vector_6" d="M20.0848 5.12868C20.0848 2.8794 21.908 1.05605 24.1575 1.05605" stroke={ color } strokeWidth="1.81121" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
    </svg>

  );
}

IconDessert.propTypes = {
  categorySelected: PropTypes.string.isRequired,
  strCategory: PropTypes.string.isRequired,
};

export default IconDessert;
