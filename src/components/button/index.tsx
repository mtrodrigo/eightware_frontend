import React from "react";

interface ButtonProps {
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
export const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <button
      className="bg-blue-600 text-white drop-shadow-lg hover:bg-blue-700 focus:ring-blue-500 shadow-lg px-4 py-1 rounded-md"
      onClick={onClick}
    >
      {text}
    </button>
  );
};
