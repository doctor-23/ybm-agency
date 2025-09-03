/**
 * Глобальный лейаут приложения Next.js (App Router).
 *
 * Содержит:
 * - Подключение глобальных стилей и шрифта Inter (через Next Fonts).
 * - Экспорт метаданных страницы (title/description).
 * - Обертку <html> и <body> с языком и CSS-переменной для шрифта.
 */
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.scss";
import "modern-normalize/modern-normalize.css";

const lang:string = "en";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "YBM-Agency Test",
  description: "Test task for YBM-Agency",
};

/**
 * Корневой лейаут приложения.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={lang} style={{[lang]: lang}}>
      <body className={inter.variable}>
        {children}
      </body>
    </html>
  );
}
