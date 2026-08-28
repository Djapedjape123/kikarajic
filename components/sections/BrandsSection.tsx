"use client";

import { useLanguage } from "@/context/LanguageContext";
import LogoLoop from "@/components/ui/LogoLoop"; // Tvoja super glatka komponenta!

// 1. Ovde ćeš sutra ubaciti Cloudinary linkove.
// Za sada koristimo placeholdere SA BELOM POZADINOM da testiraš CSS trik.
const brands = [
  { name: "YSl", href: "https://www.yslbeauty.com/", src: "https://res.cloudinary.com/duomot4hp/image/upload/v1787910461/logo6-removebg-preview_bi02ya.png" },
  { name: "Astarta Parfums", href: "https://astartaparfums.rs/", src: "https://res.cloudinary.com/duomot4hp/image/upload/v1787910509/logo5-removebg-preview_1_milurr.png" },
  
  { name: "Golden Rose", href: "https://gbs.rs/", src: "https://res.cloudinary.com/duomot4hp/image/upload/v1787910394/logo4-removebg-preview_qro1sw.png" },
  { name: "Tangle Teezer ", href: "https://tangleteezer.com/", src: "https://res.cloudinary.com/duomot4hp/image/upload/v1787910315/logo3-removebg-preview_mp4uhh.png" },
  { name: "Milani", href: "https://www.milanicosmetics.com/?srsltid=AfmBOopiXc54gWqYTdhnJC610LtWapy2RFPDiHRXlTBQMypLQ430hVXi", src: "https://res.cloudinary.com/duomot4hp/image/upload/v1787910250/logo2-removebg-preview_znvdjl.png" },
  { name: "Estee Lauder", href: "", src: "https://res.cloudinary.com/duomot4hp/image/upload/v1787910186/Estee-Lauder-Logo-1-removebg-preview_e5xuhz.png" }
];

export default function BrandsSection() {
  const { t } = useLanguage();

  return (
    // Mala visina (py-12), savršeno se naslanja na krem pozadinu
    <section className="py-12 md:py-16 bg-[#FAF7F2] border-t border-stone-200/50">
      
      {/* Naslov sekcije */}
      <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
        <h3 className="text-sm md:text-base font-semibold text-stone-500 uppercase tracking-[0.2em]">
          {t.brands.title}
        </h3>
      </div>

      {/* Traka sa brendovima */}
      <div className="w-full">
        <LogoLoop
          logos={brands}
          speed={30} // Brzina rotacije (smanji/povećaj po želji)
          gap={80}   // Razmak između logotipa
          logoHeight={48} // Visina slike (48px = Tailwind h-12)
          fadeOut={true}
          fadeOutColor="#FAF7F2" // Isti fadeOut kao naša pozadina!
          pauseOnHover={true}
          renderItem={(item: any) => (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block py-2 transition-transform duration-300 hover:scale-110"
              aria-label={`Visit ${item.name}`}
            >
              <img
                src={item.src}
                alt={item.name}
                // OVO JE MAGIJA:
                // mix-blend-multiply
                // grayscale / opacity-50: pravi ih sivim
                // group-hover: vraća im originalnu boju!
                className="h-19 md:h-24 w-auto object-contain mix-blend-multiply grayscale opacity-50 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100"
              />
            </a>
          )}
        />
      </div>

    </section>
  );
}