import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-t-blue-200 mt-10 py-2">
      <div className="flex items-center justify-center gap-5">
        <Link
          href="https://www.linkedin.com/in/rodrigo-marques-tavares-9482b4226/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Linkedin"
        >
          <img
            src="https://img.icons8.com/?size=100&id=xuvGCOXi8Wyg&format=png&color=000000"
            alt="Linkedin"
            className="h-9 w-9"
          />
        </Link>
        <Link
          href="https://github.com/mtrodrigo"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Github"
        >
          <img
            src="https://img.icons8.com/?size=100&id=efFfwotdkiU5&format=png&color=000000"
            alt="Github"
            className="h-9 w-9"
          />
        </Link>
        <a
          href="https://wa.me/5535984061841"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
        >
          <img
            src="https://img.icons8.com/?size=100&id=AltfLkFSP7XN&format=png&color=000000"
            alt="WhatsApp"
            className="h-9 w-9"
          />
        </a>
      </div>
      <p className="text-sm text-center">
        Criado por <span className="font-bold">Rodrigo Marques Tavares</span>
      </p>
    </footer>
  );
};
export default Footer;
