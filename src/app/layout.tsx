import type { Metadata } from "next";
import "../styles/globals.css";;

export const metadata: Metadata = {
  title: "Franca Daily",
  description: "Sistema de Daily Reports da Franca",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="font-poppins">{children}</body>
    </html>
  );
}