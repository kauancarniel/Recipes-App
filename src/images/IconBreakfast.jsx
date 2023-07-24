/* eslint-disable react/jsx-max-depth */
/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';

function IconBreakfast({ categorySelected, strCategory }) {
  const color = categorySelected === strCategory ? 'var(--green)' : 'var(--yellow)';

  return (
    <svg width="29" height="29" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Group 7">
        <g id="&#240;&#159;&#166;&#134; icon &#34;toast&#34;">
          <path id="Vector" d="M20.2922 7.7364V18.9394C20.2922 19.6862 20.028 20.3239 19.4995 20.8523C18.9711 21.3808 18.3334 21.645 17.5866 21.645H4.05844C3.31157 21.645 2.67392 21.3808 2.14548 20.8523C1.61703 20.3239 1.35281 19.6862 1.35281 18.9394V7.7364C0.94415 7.49684 0.616516 7.17272 0.36991 6.76406C0.123303 6.3554 0 5.90446 0 5.41125C0 4.42482 0.482644 3.51943 1.44793 2.69506C2.41322 1.87069 3.72728 1.21542 5.39011 0.72925C7.05294 0.243084 8.86374 0 10.8225 0C12.7813 0 14.5921 0.243084 16.2549 0.72925C17.9177 1.21542 19.2318 1.87069 20.1971 2.69506C21.1624 3.51943 21.645 4.42482 21.645 5.41125C21.645 5.90446 21.5217 6.3554 21.2751 6.76406C21.0285 7.17272 20.7008 7.49684 20.2922 7.7364Z" fill={ color } />
        </g>
        <g id="&#240;&#159;&#166;&#134; icon &#34;Food Egg&#34;">
          <g id="Group">
            <path id="Vector_2" d="M10.4559 11.0859C10.4906 10.9217 10.5884 10.7578 10.7052 10.6486C10.7619 10.5955 10.8092 10.5685 10.8369 10.5574L10.8421 10.5554C11.1553 10.606 11.4561 10.4021 11.5223 10.0884C11.5905 9.76519 11.3838 9.44786 11.0606 9.37964C10.5799 9.27816 10.1524 9.52762 9.88801 9.77493C9.60488 10.0398 9.37435 10.4178 9.28548 10.8388C9.21725 11.1621 9.42396 11.4794 9.74717 11.5476C10.0704 11.6158 10.3877 11.4091 10.4559 11.0859Z" fill="#262321" />
            <path id="Vector_3" d="M5.46554 8.22671C3.32761 9.9298 3.27238 12.8155 4.27426 14.7596C4.9476 16.0661 6.24247 17.2289 8.1848 17.2289C8.66675 17.2289 9.0143 17.2157 9.28796 17.2053C10.1172 17.1738 10.2677 17.1681 11.422 17.634C12.9573 18.2536 14.5899 18.0697 15.9541 17.2094C17.1818 16.4352 17.8864 14.6375 17.767 13.1786C17.7036 12.4053 17.7729 12.0899 17.852 11.7299C17.9221 11.4108 18 11.0566 18 10.3172C18 8.7437 17.5338 7.74057 17.0677 6.92016C16.6016 6.09975 16.095 5.28688 14.6593 4.37235C13.48 3.62125 11.2463 3.26131 9.47969 4.24171C8.18481 4.96031 7.53737 5.61359 6.76044 6.92016C6.46633 7.41476 6.1842 7.65425 5.46554 8.22671ZM15.129 11.1814C15.129 13.3615 13.3616 15.129 11.1814 15.129C9.00118 15.129 7.23377 13.3615 7.23377 11.1814C7.23377 9.00117 9.00118 7.23376 11.1814 7.23376C13.3616 7.23376 15.129 9.00117 15.129 11.1814Z" fill="#262321" />
          </g>
        </g>
      </g>
    </svg>

  );
}

IconBreakfast.propTypes = {
  categorySelected: PropTypes.string.isRequired,
  strCategory: PropTypes.string.isRequired,
};

export default IconBreakfast;