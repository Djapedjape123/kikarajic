import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "404 | Kika Rajić",
};

// stranica za adrese koje ne postoje (npr. /de/...)
export default function GlobalNotFound() {
  return (
    <html lang="sr" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col items-center justify-center bg-[#FAF7F2] text-stone-800 px-4 text-center">
        <p className="text-6xl font-light text-[#bc1888]">404</p>
        <p className="mt-4 text-stone-500">Stranica nije pronađena · Page not found</p>
        <a href="/sr" className="mt-8 px-6 py-2 rounded-full bg-gradient-to-tr from-[#f09433] to-[#bc1888] text-white shadow-md">
          Početna · Home
        </a>
      </body>
    </html>
  );
}
