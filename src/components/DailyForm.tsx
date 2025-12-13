"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "./LoadingSpinner";

export default function DailyForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    question1: "",
    question2: "",
    question3: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/daily", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao salvar");
      }

      setSuccess(true);
      setFormData({
        question1: "",
        question2: "",
        question3: "",
      });

      setTimeout(() => {
        router.refresh();
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Erro ao enviar daily report");
    } finally {
      setLoading(false);
    }
  };

  const questions = [
    {
      id: "question1",
      label: "O que você fez hoje?",
      placeholder: "Descreva suas principais atividades, tarefas concluídas e projetos em andamento...",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
    },
    {
      id: "question2",
      label: "Houve alguma dificuldade?",
      placeholder: "Relate bloqueios, desafios encontrados ou situações que precisaram de mais atenção...",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
    },
    {
      id: "question3",
      label: "Planos para amanhã",
      placeholder: "Quais são suas prioridades e objetivos para o próximo dia de trabalho...",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {questions.map((question, index) => (
        <div 
          key={question.id} 
          className="animate-slide-in"
          style={{ animationDelay: `${0.1 * (index + 1)}s` }}
        >
          <label
            htmlFor={question.id}
            className="flex items-center gap-3 text-franca-blue font-bold mb-4 text-lg"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-franca-green to-franca-green-dark rounded-xl flex items-center justify-center text-franca-blue shadow-md">
              {question.icon}
            </div>
            <span>{index + 1}. {question.label}</span>
          </label>
          <textarea
            id={question.id}
            name={question.id}
            value={formData[question.id as keyof typeof formData]}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-6 py-4 bg-white border-2 border-gray-100 rounded-2xl focus:border-franca-green focus:ring-4 focus:ring-franca-green focus:ring-opacity-10 outline-none transition-all resize-none hover:border-franca-green text-gray-700 leading-relaxed"
            placeholder={question.placeholder}
          />
        </div>
      ))}

      {/* Mensagens */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-xl animate-slide-in flex items-start gap-3">
          <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="text-red-700 font-bold text-sm">Erro ao enviar</p>
            <p className="text-red-600 text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      {success && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-franca-green p-5 rounded-xl animate-slide-in flex items-start gap-3">
          <svg className="w-6 h-6 text-franca-green flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="text-franca-green-dark font-bold text-sm">Daily report enviado com sucesso!</p>
            <p className="text-gray-600 text-sm mt-1">Seu relatório foi salvo no Google Sheets.</p>
          </div>
        </div>
      )}

      {/* Botão Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-franca-green to-franca-green-dark hover:from-franca-green-dark hover:to-franca-green text-franca-blue font-bold py-5 px-6 rounded-2xl transition-all duration-300 shadow-franca hover:shadow-franca-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 transform hover:scale-[1.02] active:scale-[0.98] text-lg animate-slide-in"
        style={{ animationDelay: '0.4s' }}
      >
        {loading ? (
          <>
            <LoadingSpinner />
            Enviando...
          </>
        ) : (
          <>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Enviar Daily Report
          </>
        )}
      </button>
    </form>
  );
}