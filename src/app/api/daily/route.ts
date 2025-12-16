import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth-simple";
import { saveDailyReport } from "@/lib/google-sheets";
import { format } from "date-fns";

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser();

    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { question1, question2, question3 } = body;

    if (!question1 || !question2 || !question3) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }

    const now = new Date();

    const report = {
      user: user.name, // ✅ agora é string
      date: format(now, "dd/MM/yyyy"),
      time: format(now, "HH:mm"),
      question1,
      question2,
      question3,
    };

    await saveDailyReport(report);

    return NextResponse.json({
      success: true,
      message: "Daily report salvo com sucesso!",
    });
  } catch (error) {
    console.error("Erro ao salvar daily:", error);
    return NextResponse.json(
      { error: "Erro ao salvar daily report" },
      { status: 500 }
    );
  }
}
