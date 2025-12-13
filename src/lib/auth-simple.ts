import { cookies } from "next/headers";

export const USERS: string[] = [
  "Gabriel",
  "Bruna",
  "Guilherme",
  "Leonardo",
  "Davidson",
];

export const PASSWORD = process.env.AUTH_PASSWORD || "franca@2025";

export function validateCredentials(name: string, password: string): boolean {
  return USERS.includes(name) && password === PASSWORD;
}

export async function getAuthUser(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("auth-user")?.value || null;
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