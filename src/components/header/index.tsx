"use client";
import Image from "next/image";
import logo from "../../assets/logo.png";
import { Button } from "../button";

const Header = () => {
  return (
    <header className="w-full bg-white border-b border-b-blue-200 shadow-xl mb-10">
      <div className="max-w-6xl flex flex-col sm:flex-row items-center justify-between mx-auto py-2 px-6">
        <section>
          <Image className="max-w-40 w-full" src={logo} alt="Logo Eightware" />
        </section>
        <section>
          <h1 className="text-2xl text-center">Teste Técnico – Fullstack Developer</h1>
        </section>
        <nav className="mt-3 sm:mt-0">
          <Button text="Sair" onClick={() => {} }/>
        </nav>
      </div> 
    </header>
  );
};
export default Header;
