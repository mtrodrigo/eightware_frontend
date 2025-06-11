"use client";
import Image from "next/image";
import logo from "../../assets/logo.png";
import { Button } from "../button";
import { useContext, useState } from "react";
import { Context } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { LinkButton } from "../linkButton";

const Header = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { authenticated, logout } = useContext(Context);
  const router = useRouter();

  const handleLogout = () => {
    setIsLoading(true);
    logout();
    setIsLoading(false);
  };

  const handleForLogin = () => {
    setIsLoading(true);
    router.push("/")
    setIsLoading(false);
  };

  return (
    <header className="w-full bg-white border-b border-b-blue-200 shadow-xl mb-10">
      <div className="max-w-6xl flex flex-col sm:flex-row items-center justify-between mx-auto py-2 px-6">
        <section>
          <Image className="max-w-40 w-full" src={logo} alt="Logo Eightware" />
        </section>
        <section>
          <h1 className="text-2xl text-center">
            Teste Técnico – Fullstack Developer
          </h1>
        </section>
        <nav className="mt-3 sm:mt-0">
          {authenticated ? (
            <Button text="Sair" onClick={handleLogout} disabled={isLoading} />
          ) : (
            <LinkButton text="Entrar" href="/" />
          )}
        </nav>
      </div>
    </header>
  );
};
export default Header;
