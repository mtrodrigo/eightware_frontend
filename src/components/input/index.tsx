import { useState } from "react";
import { UseFormRegister, RegisterOptions } from "react-hook-form";

interface InputProps {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  rules?: RegisterOptions;
  onBlur?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  error?: string;
}

export const Input = ({
  label,
  type,
  name,
  placeholder,
  register,
  rules,
  onBlur,
  error,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div className="w-full">
      <label className="mb-3" htmlFor={name}>
        {label}
      </label>
      <div className="flex items-center">
        <input
          className="w-full rounded-md outline-none focus:border-2 focus:border-blue-400 px-2 py-1"
          type={type === "password" && showPassword ? "text" : type}
          {...register(name, rules)}
          onBlur={onBlur}
          placeholder={placeholder}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            style={{
              position: "absolute",
              right: 30,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              display: "flex",
              alignItems: "center",
              height: "100%",
            }}
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            tabIndex={-1}
          >
            {showPassword ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-5 0-9.27-3.11-11-7 1.21-2.61 3.29-4.77 5.88-6.11" />
                <path d="M1 1l22 22" />
                <path d="M9.53 9.53A3.5 3.5 0 0 0 12 15.5c.96 0 1.84-.38 2.47-1" />
                <path d="M14.47 14.47A3.5 3.5 0 0 0 12 8.5c-.96 0-1.84.38-2.47 1" />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        )}
      </div>
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
};
