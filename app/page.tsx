
import Reviews from "@/components/Reviews";
import BrandsSection from "@/components/sections/BrandsSection";
import HeroSection from "@/components/sections/HeroSection"; 
import LocationSection from "@/components/sections/LocationSection";
import StatsSection from "@/components/sections/StatsSection";

export default function Home() {
  return (
    // Glavni omotač stranice, stavio sam našu krem boju pozadine
    <main className="flex flex-col min-h-screen bg-[#FAF7F2]">
      
      {/* 1. Hero sekcija sa videom */}
      <HeroSection />
      <StatsSection />
      <BrandsSection />
      
      <LocationSection/>
      <Reviews />
      {/* jos jedna komop */}
      
      
    </main>
  );
}