import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authUser = request.cookies.get("auth-user")?.value;

  // Se está tentando acessar dashboard sem estar logado
  if (request.nextUrl.pathname.startsWith("/dashboard") && !authUser) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Se está logado e tenta acessar login, redireciona pro dashboard
  if (request.nextUrl.pathname === "/login" && authUser) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};