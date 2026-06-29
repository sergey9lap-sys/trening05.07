import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Игровые воронки",
  description:
    "Однодневный практический тренинг по геймификации и геймдизайну в запусках.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
