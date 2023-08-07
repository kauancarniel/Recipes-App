import React from 'react';
import PropTypes from 'prop-types';

const PASSWORD_LENGTH = 7;

export default function ProfileErrors({ editPass, emailRegister, passwords }) {
  const { lastPass, newPass, confirmPass, validLastPass } = passwords;

  return (
    <div>
      { emailRegister && (
        <p className="error-register">
          E-mail already registered.
        </p>
      )}
      { (editPass && newPass !== confirmPass
      && newPass.length > 0 && confirmPass.length > 0) && (
        <p className="error-register">
          New password and confirmation password do not match.
        </p>
      )}
      { (editPass && newPass === lastPass && newPass.length >= PASSWORD_LENGTH) && (
        <p className="error-register">
          New password same as previous
        </p>
      )}
      { (editPass && !validLastPass) && (
        <p className="error-register">
          Invalid current password.
        </p>
      )}
    </div>
  );
}

ProfileErrors.propTypes = {
  editPass: PropTypes.bool.isRequired,
  emailRegister: PropTypes.bool.isRequired,
  passwords: PropTypes.shape({
    lastPass: PropTypes.string,
    newPass: PropTypes.string,
    confirmPass: PropTypes.string,
    validLastPass: PropTypes.bool,
  }).isRequired,
};
