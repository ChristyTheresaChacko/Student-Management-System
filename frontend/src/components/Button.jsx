import React from "react";

const Button = ({
  onClick,
  children,
  className = "",
  type = "button",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-green-800 text-white px-5 py-2 rounded-md shadow-md hover:shadow-lg hover:bg-green-700 text-lg font-medium transition-all duration-200 disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
