import { redirect } from "next/navigation";
import { getAuthUser } from "@/lib/auth-simple";
import Header from "@/components/Header";
import DailyForm from "@/components/DailyForm";

export default async function DashboardPage() {
  const userName = await getAuthUser();

  if (!userName) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userName={userName} />
      
      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Card de Saudação */}
        <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4 mb-6">
          <p className="text-green-800 font-medium">
            Olá, <span className="font-bold text-green-600">{userName}</span>! Como foi seu dia de trabalho?
          </p>
        </div>

        {/* Título */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Daily Report</h2>
              <p className="text-gray-500 text-sm">
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

        {/* Formulário */}
        <DailyForm />
      </main>
    </div>
  );
}