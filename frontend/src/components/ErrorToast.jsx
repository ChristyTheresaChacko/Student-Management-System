import React, { useEffect, useState } from "react";

const ErrorToast = ({ message, duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setVisible(false);

      // Allow fade-out animation to finish before removing
      setTimeout(() => {
        onClose && onClose();
      }, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message || !visible) return null;

  return (
    <div className="flex items-center justify-center">
      <div
        role="alert"
        aria-live="assertive"
        className="
          w-full max-w-sm p-4 mb-4
          text-sm text-black
          bg-white
          border border-gray-200
          rounded-lg
          shadow-md
          animate-fade-in-down
          relative
          transition-opacity duration-300
        "
      >
        {/* Left green line */}
        <span className="absolute left-0 top-0 h-full w-1 bg-green-800 rounded-l-lg"></span>

        <div className="flex items-center space-x-3 pl-2">
          {/* Green icon */}
          <svg
            className="w-5 h-5 text-green-800 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10A8 8 0 11.001 10 8 8 0 0118 10zM9 5a1 1 0 112 0 1 1 0 01-2 0zM10 9a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>

          {/* Text */}
          <span className="font-medium">{message}</span>
        </div>
      </div>
    </div>
  );
};

export default ErrorToast;
