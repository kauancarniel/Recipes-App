import React from 'react';
import PropTypes from 'prop-types';

export default function InitialLayout({ children }) {
  return (
    <main
      className="min-h-screen flex-center w-full"
    >
      <div className="login-box flex-center flex-col bg-form glass max-h-screen">
        { children }
      </div>
    </main>
  );
}

InitialLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
