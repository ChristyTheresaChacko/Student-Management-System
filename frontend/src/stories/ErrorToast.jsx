import React, { useState } from 'react';
import ErrorToast from './ErrorToast';
import Button from './Button';

export default {
  title: 'Components/ErrorToast',
  component: ErrorToast,
  tags: ['autodocs'],
};

export const SuccessMessage = () => {
  const [show, setShow] = useState(true);
  return (
    <div>
      {show && (
        <ErrorToast
          message="✓ Operation completed successfully!"
          onClose={() => setShow(false)}
        />
      )}
      {!show && (
        <Button
          onClick={() => setShow(true)}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Show Success Toast
        </Button>
      )}
    </div>
  );
};

export const ErrorMessage = () => {
  const [show, setShow] = useState(true);
  return (
    <div>
      {show && (
        <ErrorToast
          message="✗ An error occurred. Please try again."
          onClose={() => setShow(false)}
        />
      )}
      {!show && (
        <Button
          onClick={() => setShow(true)}
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          Show Error Toast
        </Button>
      )}
    </div>
  );
};

export const WarningMessage = () => {
  const [show, setShow] = useState(true);
  return (
    <div>
      {show && (
        <ErrorToast
          message="⚠ Warning: This action cannot be undone."
          onClose={() => setShow(false)}
        />
      )}
      {!show && (
        <Button
          onClick={() => setShow(true)}
          className="bg-yellow-600 hover:bg-yellow-700 text-white"
        >
          Show Warning Toast
        </Button>
      )}
    </div>
  );
};

export const InfoMessage = () => {
  const [show, setShow] = useState(true);
  return (
    <div>
      {show && (
        <ErrorToast
          message="ℹ Information: Your profile has been updated."
          onClose={() => setShow(false)}
        />
      )}
      {!show && (
        <Button
          onClick={() => setShow(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Show Info Toast
        </Button>
      )}
    </div>
  );
};