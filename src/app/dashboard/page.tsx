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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="geometric-circle w-96 h-96 top-0 -right-48 animate-float"></div>
      <div className="geometric-circle w-80 h-80 bottom-20 -left-40 animate-float" style={{ animationDelay: '3s' }}></div>
      
      <Header userName={userName} />
      
      <main className="container mx-auto px-4 py-12 max-w-4xl relative z-10">
        <div className="glass-effect rounded-3xl shadow-franca-lg p-8 md:p-12 animate-fade-in">
          {/* Cabeçalho do formulário */}
          <div className="mb-10 animate-slide-in">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-franca-green to-franca-green-dark rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-franca-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-franca-blue">
                  Daily Report
                </h1>
                <p className="text-gray-600 mt-1">
                  {new Date().toLocaleDateString('pt-BR', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-franca-green to-franca-green-dark h-1 w-24 rounded-full mb-4"></div>
            
            <p className="text-gray-600 text-lg">
              Olá, <span className="font-bold text-franca-green">{userName}</span>! 
              Como foi seu dia de trabalho?
            </p>
          </div>

          <DailyForm />
        </div>
      </main>
    </div>
  );
}