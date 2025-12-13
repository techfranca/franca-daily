import { NextResponse } from "next/server";
import { clearAuthUser } from "@/lib/auth-simple";

export async function POST() {
  try {
    await clearAuthUser();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao fazer logout" },
      { status: 500 }
    );
  }
}