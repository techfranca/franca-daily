import { redirect } from "next/navigation";
import { getAuthUser } from "@/lib/auth-simple";
import Header from "@/components/Header";
import DailyForm from "@/components/DailyForm";

export default async function DashboardPage() {
  const user = await getAuthUser(); // { name, role }

  if (!user) {
    redirect("/login");
  }

  const todayFormatted = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "America/Sao_Paulo", // ✅ fuso correto
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userName={user.name} userRole={user.role} />

      <main className="max-w-7xl mx-auto px-4 py-4 md:grid md:grid-cols-12 md:gap-6">
        {/* COLUNA LATERAL */}
        <div className="hidden md:block md:col-span-3 space-y-4 mt-4">
          <div className="bg-white rounded-2xl shadow-sm p-4 border-l-4 border-gray-300">
            <div className="flex items-center gap-2 mb-2">
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 11l3-5m0 0l3 5m-3-5v13"
                />
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
        </div>

        {/* COLUNA CENTRAL */}
        <div className="md:col-span-9 space-y-4 mt-4">
          <div className="bg-white rounded-2xl shadow-sm p-5 mb-0">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Daily Report
                </h2>

                <p className="text-green-600 font-medium text-sm mt-0.5">
                  Olá, <span className="font-bold">{user.name}</span>! Como foi seu dia?
                </p>

                <p className="text-gray-500 text-xs mt-0.5">
                  {todayFormatted}
                </p>
              </div>
            </div>
          </div>

          <DailyForm />
        </div>
      </main>
    </div>
  );
}
