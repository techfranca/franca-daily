"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const USERS = ["Gabriel", "Bruna", "Guilherme", "Leonardo", "Davidson"];

export default function LoginPage() {
  const router = useRouter();
  const [selectedUser, setSelectedUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: selectedUser,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao fazer login");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-franca-green via-white to-franca-green-dark p-4">
      {/* Elementos decorativos */}
      <div className="geometric-circle w-96 h-96 top-0 -left-48 animate-float absolute"></div>
      <div className="geometric-circle w-80 h-80 bottom-0 -right-40 animate-float absolute" style={{ animationDelay: '2s' }}></div>
      <div className="geometric-circle w-64 h-64 top-1/2 left-1/4 animate-float absolute" style={{ animationDelay: '4s' }}></div>

      {/* Card centralizado */}
      <div className="glass-effect rounded-3xl shadow-franca-lg p-10 md:p-14 max-w-md w-full relative z-10 animate-fade-in">
        {/* Logo minimalista */}
        <div className="flex justify-center mb-10">
          <div className="text-center">
            <div className="mb-4 relative">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-franca-green to-franca-green-dark rounded-2xl flex items-center justify-center shadow-franca transform hover:scale-105 transition-transform duration-300">
                <span className="text-4xl font-bold text-franca-blue">F</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-franca-blue mb-1">
              FRANCA<span className="text-franca-green">.</span>
            </h1>
            <p className="text-franca-blue text-sm font-medium tracking-wider uppercase">
              Daily Reports
            </p>
          </div>
        </div>

        {/* Título */}
        <div className="text-center mb-10 animate-slide-in">
          <h2 className="text-2xl font-bold text-franca-blue mb-2">
            Bem-vindo de volta
          </h2>
          <p className="text-gray-600 text-sm">
            Acesse sua conta para registrar o daily de hoje
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Seletor de Nome */}
          <div className="animate-slide-in" style={{ animationDelay: '0.1s' }}>
            <label
              htmlFor="user"
              className="block text-franca-blue font-semibold mb-3 text-sm uppercase tracking-wide"
            >
              Selecione seu nome
            </label>
            <div className="relative">
              <select
                id="user"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                required
                className="w-full px-5 py-4 bg-white border-2 border-gray-100 rounded-xl focus:border-franca-green focus:ring-4 focus:ring-franca-green focus:ring-opacity-10 outline-none transition-all text-franca-blue font-medium appearance-none cursor-pointer hover:border-franca-green"
                style={{ backgroundImage: 'none' }}
              >
                <option value="">Escolha seu nome...</option>
                {USERS.map((user) => (
                  <option key={user} value={user}>
                    {user}
                  </option>
                ))}
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-franca-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Campo de Senha */}
          <div className="animate-slide-in" style={{ animationDelay: '0.2s' }}>
            <label
              htmlFor="password"
              className="block text-franca-blue font-semibold mb-3 text-sm uppercase tracking-wide"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-5 py-4 bg-white border-2 border-gray-100 rounded-xl focus:border-franca-green focus:ring-4 focus:ring-franca-green focus:ring-opacity-10 outline-none transition-all hover:border-franca-green text-franca-blue"
            />
          </div>

          {/* Mensagem de erro */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg animate-slide-in">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-red-700 font-semibold text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Botão de Login */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-franca-green to-franca-green-dark hover:from-franca-green-dark hover:to-franca-green text-franca-blue font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-franca hover:shadow-franca-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] animate-slide-in"
            style={{ animationDelay: '0.3s' }}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-franca-blue" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Entrando...
              </span>
            ) : (
              "Entrar"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center animate-slide-in" style={{ animationDelay: '0.4s' }}>
          <p className="text-gray-500 text-xs">
            Sistema exclusivo para membros da Franca
          </p>
        </div>
      </div>
    </div>
  );
}