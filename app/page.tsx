// Uvozimo našu Hero komponentu
// Napomena: Proveri da li se putanja poklapa sa tvojom strukturom foldera!
import HeroSection from "@/components/sections/HeroSection"; 
import StatsSection from "@/components/sections/StatsSection";

export default function Home() {
  return (
    // Glavni omotač stranice, stavio sam našu krem boju pozadine
    <main className="flex flex-col min-h-screen bg-[#FAF7F2]">
      
      {/* 1. Hero sekcija sa videom */}
      <HeroSection />
      <StatsSection />
      
      {/* Ovde ćemo kasnije redom dodavati ostale komponente: */}
      {/* <AboutSection /> */}
      {/* <GallerySection /> */}
      {/* <WorkshopSection /> */}
      
    </main>
  );
}