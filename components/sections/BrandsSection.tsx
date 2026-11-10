"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import LogoLoop from "@/components/ui/LogoLoop";
import { optimizeCloudinaryHeight } from "@/lib/cloudinary";

// Logo je visok najviše 96px (h-24), pa je 240px dovoljno i za ekrane sa 3x gušćim pikselima
const LOGO_HEIGHT = 240;

// w/h = veličina slike koju Cloudinary vraća (posle smanjenja na LOGO_HEIGHT); idu u width/height,
// da pregledač zna proporciju logoa pre nego što se slika skine
const brands = [
  { name: "YSl", href: "https://www.yslbeauty.com/", src: "https://res.cloudinary.com/duomot4hp/image/upload/v1787910461/logo6-removebg-preview_bi02ya.png", w: 240, h: 240 },
  { name: "Astarta Parfums", href: "https://astartaparfums.rs/", src: "https://res.cloudinary.com/duomot4hp/image/upload/v1787910509/logo5-removebg-preview_1_milurr.png", w: 457, h: 240 },
  { name: "Golden Rose", href: "https://gbs.rs/", src: "https://res.cloudinary.com/duomot4hp/image/upload/v1787910394/logo4-removebg-preview_qro1sw.png", w: 300, h: 187 },
  { name: "Tangle Teezer ", href: "https://tangleteezer.com/", src: "https://res.cloudinary.com/duomot4hp/image/upload/v1787910315/logo3-removebg-preview_mp4uhh.png", w: 855, h: 233 },
  { name: "Milani", href: "https://www.milanicosmetics.com/?srsltid=AfmBOopiXc54gWqYTdhnJC610LtWapy2RFPDiHRXlTBQMypLQ430hVXi", src: "https://res.cloudinary.com/duomot4hp/image/upload/v1787910250/logo2-removebg-preview_znvdjl.png", w: 268, h: 148 },
  { name: "Estee Lauder", href: "https://www.esteelauder.com/?srsltid=AU7gw4VkSJHn_jn9imDrAabDiygriIpnFCCZneRfL6-Ype2XY6AiHpwz",src: "https://res.cloudinary.com/duomot4hp/image/upload/v1787910186/Estee-Lauder-Logo-1-removebg-preview_e5xuhz.png", w: 384, h: 240 },
  { name: "My Gaisha",href: "https://www.mygeisha.rs/", src: "https://res.cloudinary.com/duomot4hp/image/upload/v1788296099/MY-GEISHA_crni_ujkb63.webp", w: 240, h: 240 },

];

export default function BrandsSection() {
  const { t } = useLanguage();
  // Traka je daleko ispod prvog ekrana, a njeni logoi (~80 KB) su se skidali dok se učitava JS i otimali mu mrežu,
  // što kasni hidrataciju (a od nje zavisi pojava loga u hero-u). Zato se traka ubacuje tek posle `load`-a;
  // do tada se drži prazno mesto iste visine, da se ništa ne pomera.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const show = () => setReady(true);
    // povratak na početnu u istoj poseti: stranica je već učitana (rAF zbog react-hooks/set-state-in-effect)
    if (document.readyState === "complete") {
      const raf = requestAnimationFrame(show);
      return () => cancelAnimationFrame(raf);
    }
    window.addEventListener("load", show, { once: true });
    return () => window.removeEventListener("load", show);
  }, []);

  return (
    // Mala visina (py-12), savršeno se naslanja na krem pozadinu
    <section className="py-12 md:py-16 bg-[#FAF7F2] border-t border-stone-200/50">
      
      {/* Naslov sekcije */}
      <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
        <h3 className="text-sm md:text-base font-semibold text-[#736b65] uppercase tracking-[0.2em]">
          {t.brands.title}
        </h3>
      </div>

      {/* Traka sa brendovima */}
      {/* 92px / 112px = logo (h-19 / md:h-24) + py-2 oko njega */}
      <div className="w-full min-h-23 md:min-h-28">
        {ready && <LogoLoop
          logos={brands}
          speed={40} // Brzina rotacije (smanji/povećaj po želji)
          gap={80}   // Razmak između logotipa
          logoHeight={48} // Visina slike (48px = Tailwind h-12)
          fadeOut={true} // Omogućava fade out efekat na ivicama
          fadeOutColor="#FAF7F2" // Isti fadeOut kao naša pozadina!
          pauseOnHover={true} 
          renderItem={(item) => (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block py-2 transition-transform duration-300 hover:scale-110"
              aria-label={`Visit ${item.name}`}
            >
              <img
                src={optimizeCloudinaryHeight(item.src, LOGO_HEIGHT)}
                alt={item.name}
                width={item.w}
                height={item.h}
                loading="lazy"
                decoding="async"
                className="h-19 md:h-24 w-auto object-contain mix-blend-multiply grayscale opacity-50 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100"
              />
            </a>
          )}
        />}
      </div>

    </section>
  );
}