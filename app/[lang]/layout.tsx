import type { Metadata } from "next";
import "../globals.css";
import IntroScript from "@/components/IntroScript";

// promena jezika 
import { LanguageProvider } from "@/context/LanguageContext";

//komponente
import LoadingScreen from "@/components/LoadingScreen"; 
import Navbar from "@/components/Navbar";
import InstagramFloatButton from "@/components/InstagramFloatButton"; // dugem za insta
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Kika Rajić | Studio",
  description: "Profesionalno šminkanje, frizure i sprej ten",
  
};

// pravi obe verzije svake stranice unapred: /sr/... i /en/...
export function generateStaticParams() {
  return [{ lang: "sr" }, { lang: "en" }];
}

// svaki drugi jezik u adresi (npr. /de) vraca 404
export const dynamicParams = false;

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;

  return (
    <html
      lang={lang}
      className="h-full antialiased"
      // skripta u <head>-u menja data-intro-seen pre hidratacije
      suppressHydrationWarning
    >
      <head>
        {/* loader samo jednom po poseti - vidi lib/intro.ts */}
        <IntroScript />
      </head>
      <body className="min-h-full flex flex-col">
        
        {/* Loader ide na sam vrh! On je z-50 i prekriće ceo ekran prve 2 sekunde koje moramo da popravimo */}
        <LanguageProvider lang={lang}>
          <LoadingScreen />
          <Navbar />
          <InstagramFloatButton />

          {children}
          
          <Footer/>
        </LanguageProvider>
        
      </body>
    </html>
  );
}