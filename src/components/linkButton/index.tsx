import Link from "next/link";
import React from "react";

interface LinkButtonProps {
  text: string;
  href: string;
}
export const LinkButton = ({ text, href }: LinkButtonProps) => {
  return (
    <Link
      className="bg-blue-600 text-white drop-shadow-lg hover:bg-blue-700 focus:ring-blue-500 shadow-lg px-4 py-2 rounded-md"
      href={href}
    >
      {text}
    </Link>
  );
};
