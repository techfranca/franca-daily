// src/app/dashboard/page.tsx (Layout Grid com espaçamento correto)

import { redirect } from "next/navigation";
import { getAuthUser } from "@/lib/auth-simple";
import Header from "@/components/Header";
import DailyForm from "@/components/DailyForm";

export default async function DashboardPage() {
  const user = await getAuthUser(); // Pega o objeto { name, role }

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userName={user.name} userRole={user.role} />
      
      {/* Container principal: 
        - max-w-7xl para mais largura (como você usou)
        - md:grid md:grid-cols-12 para definir o layout de 12 colunas
        - md:gap-6 para espaçar as colunas lateralmente (evitando a colisão)
      */}
      <main className="max-w-7xl mx-auto px-4 py-4 md:grid md:grid-cols-12 md:gap-6">

        {/* COLUNA LATERAL (3/12 colunas): Mural de Avisos */}
        <div className="hidden md:block md:col-span-3 space-y-4 mt-4"> {/* Adicionado mt-4 para alinhar com o conteúdo principal */}
          
          {/* Mural de Avisos (Dicas e Regras Rápidas) */}
          <div className="bg-white rounded-2xl shadow-sm p-4 border-l-4 border-gray-300">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 11l3-5m0 0l3 5m-3-5v13" />
              </svg>
              <h3 className="text-md font-bold text-gray-900">
                  Lembretes
              </h3>
            </div>
            <ul className="text-gray-600 space-y-1 text-xs list-disc list-inside ml-1">
              <li>Seja objetivo.</li>
              <li>Priorize as tarefas de amanhã.</li>
              <li>Relate o bloqueio e quem pode ajudar.</li>
            </ul>
          </div>

          {/* Você pode adicionar outros cards úteis aqui (Ex: Calendário, Status do Sistema, etc.) */}

        </div>
        
        {/* COLUNA CENTRAL (9/12 colunas): Título + Formulário */}
        <div className="md:col-span-9 space-y-4 mt-4"> {/* Adicionado mt-4 para alinhar com o conteúdo lateral */}
          
          {/* Título do Daily Report (Card principal, ajustado para ser mais compacto) */}
          <div className="bg-white rounded-2xl shadow-sm p-5 mb-0"> 
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Daily Report</h2>
                <p className="text-green-600 font-medium text-sm mt-0.5">
                  Olá, <span className="font-bold">{user.name}</span>! Como foi seu dia?
                </p>
                <p className="text-gray-500 text-xs mt-0.5">
                  {new Date().toLocaleDateString('pt-BR', { 
                    weekday: 'long', 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </p>
              </div>
            </div>
          </div>
          
          {/* Formulário (Note que o DailyForm já está ajustado para ser compacto) */}
          <DailyForm />
        </div>
      </main>
    </div>
  );
}