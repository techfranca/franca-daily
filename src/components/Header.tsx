"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface HeaderProps {
  userName: string;
}

export default function Header({ userName }: HeaderProps) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
      
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="bg-gradient-to-r from-franca-blue via-franca-blue to-[#0a1940] text-white shadow-2xl relative overflow-hidden">
      {/* Efeito de brilho */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-5 transform -skew-x-12"></div>
      
      <div className="container mx-auto px-6 py-5 flex items-center justify-between relative z-10">
        {/* Logo */}
        <div className="flex items-center gap-4 animate-slide-in">
          <div className="w-12 h-12 bg-gradient-to-br from-franca-green to-franca-green-dark rounded-xl flex items-center justify-center shadow-lg transform hover:scale-110 hover:rotate-6 transition-all duration-300">
            <span className="text-2xl font-bold text-franca-blue">F</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              FRANCA<span className="text-franca-green">.</span>
            </h1>
            <p className="text-xs text-gray-300 tracking-wider uppercase">
              Daily Reports System
            </p>
          </div>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-4 animate-slide-in" style={{ animationDelay: '0.1s' }}>
          <div className="text-right hidden md:block">
            <p className="font-semibold text-lg">{userName}</p>
            <p className="text-xs text-gray-300 uppercase tracking-wide">Membro da Equipe</p>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-franca-green rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-franca-green to-franca-green-dark flex items-center justify-center text-franca-blue font-bold text-xl shadow-lg transform group-hover:scale-110 transition-transform duration-300">
              {userName.charAt(0).toUpperCase()}
            </div>
          </div>

          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="bg-gradient-to-r from-franca-green to-franca-green-dark hover:from-franca-green-dark hover:to-franca-green text-franca-blue font-semibold px-6 py-2.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoggingOut ? "Saindo..." : "Sair"}
          </button>
        </div>
      </div>
    </header>
  );
}