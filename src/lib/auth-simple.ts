// src/lib/auth-simple.ts

import { cookies } from "next/headers";

// ESTRUTURA DE USUÁRIOS ATUALIZADA COM OS CARGOS ESPECÍFICOS
export const USERS = [
  { name: "Gabriel", role: "CEO" },
  { name: "Davidson", role: "Tech Lead" },
  { name: "Bruna", role: "Social Media Manager" },
  { name: "Guilherme", role: "Design Lead" },
  { name: "Leonardo", role: "Gestor de Tráfego" },
];

export const PASSWORD = process.env.AUTH_PASSWORD || "franca@2025";

export function validateCredentials(name: string, password: string): boolean {
  // Encontra o usuário pelo nome
  const user = USERS.find(u => u.name === name);
  // Valida a existência do usuário e a senha
  return !!user && password === PASSWORD;
}

export async function getAuthUser(): Promise<{ name: string, role: string } | null> {
  const cookieStore = await cookies();
  const userName = cookieStore.get("auth-user")?.value;

  if (!userName) {
    return null;
  }
  
  // Retorna o objeto completo do usuário, incluindo o cargo
  return USERS.find(u => u.name === userName) || null;
}

export async function setAuthUser(name: string) {
  const cookieStore = await cookies();
  cookieStore.set("auth-user", name, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 dias
  });
}

export async function clearAuthUser() {
  const cookieStore = await cookies();
  cookieStore.delete("auth-user");
}