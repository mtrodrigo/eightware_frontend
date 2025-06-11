import React from "react";

interface ButtonProps {
  text: string;
  type?: "submit";
  disabled?: boolean;
  onClick: () => void
}
export const Button = ({ text, type, disabled, onClick }: ButtonProps) => {
  return (
    <button
      className="bg-blue-600 text-white drop-shadow-lg hover:bg-blue-700 focus:ring-blue-500 shadow-lg px-4 py-1 rounded-md"
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
