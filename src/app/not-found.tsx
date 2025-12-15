'use client';
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { SearchX   } from "lucide-react";
const NotFound = () => {
  return (
    <div className="flex flex-col gap-3 justify-center min-h-screen items-center bg-background-100">
      <SearchX   className="w-16 h-16 text-primary" />
      <div className="text-center">
        <h1 className="mb-4 text-4xl text-primary font-bold">Erro 404</h1>
        <p className="mb-4 text-xl text-foreground">Oops! Página Não Encontrada.</p>
        <a href="/" className="text-foreground text-l hover:text-blue-700">
          Retornar
        </a>
      </div>
    </div>
  );
};

export default NotFound;