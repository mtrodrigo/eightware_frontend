"use client";

import React, { createContext } from "react";
import useAuth from "@/hooks/useAuth";

interface UserContextProps {
  authenticated: boolean;
  login: (user: { email: string; password: string }) => Promise<void>;
  isLoading: boolean;
}

interface ChildrenProps {
  children: React.ReactNode;
}

const Context = createContext<UserContextProps>({
  authenticated: false,
  login: async () => {},
  isLoading: false,
});

const UserProvider = ({ children }: ChildrenProps) => {
  const { authenticated, login, isLoading } = useAuth();

  return (
    <Context.Provider value={{ authenticated, login, isLoading }}>
      {children}
    </Context.Provider>
  );
};

export { Context, UserProvider };
