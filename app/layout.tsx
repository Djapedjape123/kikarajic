import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

//promena jezika 
import { LanguageProvider } from "@/context/LanguageContext";

// 1. Uvozimo našu komponentu (pazi da putanja odgovara tvom folderu)
import LoadingScreen from "@/components/LoadingScreen"; 
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 2. Prepravljen SEO i naslov sajta da bude profi od starta
export const metadata: Metadata = {
  title: "Kika Rajić | Studio",
  description: "Profesionalno šminkanje, frizure i sprej ten",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sr" // Postavljeno na srpski
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        
        {/* 3. Loader ide na sam vrh! On je z-50 i prekriće ceo ekran prve 2 sekunde */}
        <LanguageProvider>
          <LoadingScreen />
          <Navbar />
          {children}
        </LanguageProvider>
        
        {/* 4. Ostatak sajta se učitava ispod, ali je skriven dok loader ne nestane */}
        
        
      </body>
    </html>
  );
}