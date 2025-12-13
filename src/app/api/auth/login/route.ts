import { NextRequest, NextResponse } from "next/server";
import { validateCredentials, setAuthUser } from "@/lib/auth-simple";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, password } = body;

    if (!name || !password) {
      return NextResponse.json(
        { error: "Nome e senha são obrigatórios" },
        { status: 400 }
      );
    }

    if (!validateCredentials(name, password)) {
      return NextResponse.json(
        { error: "Nome ou senha inválidos" },
        { status: 401 }
      );
    }

    await setAuthUser(name);

    return NextResponse.json({ success: true, user: name });
  } catch (error) {
    console.error("Erro no login:", error);
    return NextResponse.json(
      { error: "Erro ao processar login" },
      { status: 500 }
    );
  }
}