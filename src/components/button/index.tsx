import React from "react";

interface ButtonProps {
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "submit";
  disabled?: boolean
}
export const Button = ({ text, onClick, type, disabled }: ButtonProps) => {
  return (
    <button
      className="bg-blue-600 text-white drop-shadow-lg hover:bg-blue-700 focus:ring-blue-500 shadow-lg px-4 py-1 rounded-md"
      disabled={disabled}
      type={type}
    >
      {text}
    </button>
  );
};
