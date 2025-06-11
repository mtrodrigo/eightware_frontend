import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import {Toaster} from "react-hot-toast"

export const metadata: Metadata = {
  title: "Frontend - Teste Técnico",
  description: "Teste técnico para fullstack developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="bg-slate-200 flex flex-col items-center justify-between min-h-screen">
        <Header />
        <Toaster position="top-center" reverseOrder={false} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
