import React from "react";

export function Button({ children, onClick, className = "", }) {
  return (
    <button
      onClick={onClick}
      className={`bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-6 rounded-xl shadow-md transition duration-200 ease-in-out ${className}`}
    >
      {children}
    </button>
  );
}
