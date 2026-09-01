"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { FaStar, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence, useMotionValue, useAnimationFrame } from "framer-motion";

type Review = {
  id: number;
  name: string;
  role: string;
  shortSR: string;
  shortEN: string;
  fullSR: string;
  fullEN: string;
};

const reviews: Review[] = [
  {
    id: 1,
    name: "Mima Milićević",
    role: "Brand Manager & Šminker",
    shortSR: "Moja saradnja sa Kikom prerasla je u divno prijateljstvo. Kroz zajedničke projekte upoznala sam je kao izuzetnog profesionalca...",
    shortEN: "My collaboration with Kika quickly grew into a wonderful friendship. Through joint projects, I got to know her as an exceptional professional...",
    fullSR: "Moja saradnja sa Kikom počela je kroz posao, kao saradnja između šminkerke i brend menadžera, a vrlo brzo je prerasla u jedno divno prijateljstvo. Kroz zajedničke projekte, imala sam priliku da upoznam Kiku i kao izuzetno talentovanu šminkerku, ali i kao ozbiljnog profesionalca i sjajnog edukatora.\n\nKika je neko ko svoj posao shvata na pravi način. Konstantno ulaže u sebe, svoje znanje i svoj rad, beskrajno se trudi i uvek teži tome da bude još bolja. Upravo zbog toga smatram da svojim radom postavlja standarde u svetu šminkera.\n\nNa kraju sam i sama postala njena polaznica i tada sam još više shvatila koliko znanja, iskustva i ljubavi ulaže u ono što radi. Kod Kike ne učite samo kako da šminkate već učite kako da razumete posao, klijenta i celu industriju. Ne pokušava da od svakog napravi „šminkera po svom kalupu“, već podstiče svakog da razvija svoj stil, prepozna svoje kvalitete i izgradi sopstveni put. Upravo to je ono što njene edukacije čini toliko vrednim i drugačijim.\n\nDanas je Kika za mene istovremeno divna prijateljica, sjajna saradnica i edukator kome potpuno verujem. Ponosna sam što je naša poslovna saradnja prerasla u prijateljstvo, ali i što sam imala priliku da od nje učim.",
    fullEN: "My collaboration with Kika started through work, as a collaboration between a makeup artist and a brand manager, and quickly grew into a wonderful friendship. Through our joint projects, I had the opportunity to know Kika as an exceptionally talented makeup artist, but also as a serious professional and great educator.\n\nKika is someone who takes her work seriously. She constantly invests in herself, her knowledge, and her work, striving to always be better. Because of this, I believe she sets the standards in the makeup world.\n\nEventually, I became her student myself, and that's when I truly understood how much knowledge, experience, and love she puts into her work. With Kika, you don't just learn how to do makeup; you learn how to understand the business, the client, and the entire industry. She doesn't try to make everyone fit her mold, but encourages everyone to develop their own style. That is what makes her classes so valuable and different.",
  },
  {
    id: 2,
    name: "Ana Jovanović",
    role: "Klijent",
    shortSR: "Šminka je izdržala ceo dan, od jutarnjeg venčanja do poslednjeg plesa uveče. Nisam morala ništa da doteram.",
    shortEN: "The makeup lasted the entire day, from the morning wedding to the last dance at night. I didn't have to touch up a thing.",
    fullSR: "Šminka je izdržala ceo dan, od jutarnjeg venčanja do poslednjeg plesa uveče. Nisam morala ništa da doteram. Atmosfera je bila predivna, a Kika je u potpunosti pogodila ono što sam želela.",
    fullEN: "The makeup lasted the entire day, from the morning wedding to the last dance at night. I didn't have to touch up a thing. The atmosphere was wonderful, and Kika completely nailed what I wanted.",
  },
  {
    id: 3,
    name: "Milica Petrović",
    role: "Klijent",
    shortSR: "Prvi put sam probala sprej ten kod Kike i rezultat je prirodniji nego što sam očekivala. Vraćam se redovno.",
    shortEN: "I tried spray tan with Kika for the first time and the result was more natural than I expected. I keep coming back.",
    fullSR: "Prvi put sam probala sprej ten kod Kike i rezultat je prirodniji nego što sam očekivala. Nema narandžastih tonova, boja je savršeno ravnomerna i izgledam kao da sam se tek vratila sa mora. Vraćam se redovno.",
    fullEN: "I tried spray tan with Kika for the first time and the result was more natural than I expected. No orange tones, perfectly even color, and I look like I just came back from vacation. I keep coming back.",
  },
  {
    id: 4,
    name: "Jovana Nikolić",
    role: "Klijent",
    shortSR: "Atmosfera u studiju je opuštajuća, a rezultat uvek profesionalan. Osećam se prelepo posle svake posete.",
    shortEN: "The atmosphere in the studio is relaxing, and the result is always professional. I feel beautiful after every visit.",
    fullSR: "Atmosfera u studiju je opuštajuća, a rezultat uvek profesionalan. Kika ima neverovatnu energiju i tačno zna šta vam treba da zablistate. Osećam se prelepo posle svake posete.",
    fullEN: "The atmosphere in the studio is relaxing, and the result is always professional. Kika has amazing energy and knows exactly what you need to shine. I feel beautiful after every visit.",
  },
  {
    id: 5,
    name: "Teodora Ilić",
    role: "Polaznica edukacije",
    shortSR: "Pohađala sam jednu od edukacija i naučila više nego što sam očekivala. Predavanje je bilo jasno i praktično.",
    shortEN: "I attended one of the courses and learned more than I expected. The class was clear and hands-on.",
    fullSR: "Pohađala sam jednu od edukacija i naučila više nego što sam očekivala. Predavanje je bilo jasno, detaljno i neverovatno praktično. Kika svoje znanje deli bez ikakve zadrške.",
    fullEN: "I attended one of the courses and learned more than I expected. The class was clear, detailed, and incredibly hands-on. Kika shares her knowledge without holding anything back.",
  },
];

export default function Reviews() {
  const { activeLang } = useLanguage();
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  const heading = activeLang === "SR" ? "Šta kažu klijentkinje i saradnici" : "What clients & partners say";
  const subHeading = activeLang === "SR" ? "Iskustva iz prve ruke sa naših tretmana i edukacija" : "Firsthand experiences from our treatments and classes";
  
  // Rendamo 4 puna niza da bismo imali dovoljno kartica za široke ekrane i nesmetan "teleport"
  const loopReviews = [...reviews, ...reviews, ...reviews, ...reviews];

  // --- LOGIKA ZA MAGIČNI TELEPORT I DRAG (Framer Motion) ---
  const x = useMotionValue(0);
  const [teleportWidth, setTeleportWidth] = useState(0);
  
  const itemRef = useRef<HTMLElement>(null);
  const isHovered = useRef(false);
  const isDragging = useRef(false);

  // 1. Merimo širinu tačno JEDNOG niza (5 kartica + razmaci)
  useEffect(() => {
    const calculateWidth = () => {
      if (itemRef.current) {
        const cardWidth = itemRef.current.offsetWidth;
        const gap = 32; // gap-8 je 32px u Tailwindu
        // Širina jednog unikatnog seta (5 kartica)
        setTeleportWidth((cardWidth + gap) * reviews.length);
      }
    };

    calculateWidth();
    window.addEventListener("resize", calculateWidth);
    return () => window.removeEventListener("resize", calculateWidth);
  }, []);

  // 2. Osmatrač - "Teleportacija"
  // Kad god se `x` pomeri, proveravamo da li je prešlo širinu niza i vraćamo na početak
  useEffect(() => {
    const unsubscribe = x.on("change", (latest) => {
      if (!teleportWidth) return;

      if (latest <= -teleportWidth) {
        x.set(latest + teleportWidth);
      } else if (latest >= 0) {
        x.set(latest - teleportWidth);
      }
    });
    return unsubscribe;
  }, [teleportWidth, x]);

  // 3. Automatsko pomeranje animacije (svaki frejm pomeri malo ulevo)
  useAnimationFrame((time, delta) => {
    // Pauzira ako merimo širinu, ako je miš preko, ili ako klijent prevlači prstom
    if (!teleportWidth || isHovered.current || isDragging.current) return;
    
    // Brzina kretanja. Povećaj 0.7 za brže, smanji za sporije.
    x.set(x.get() - 0.7 * (delta / 16)); 
  });

  return (
    <section className="py-24 bg-[#FAF7F2] relative overflow-hidden border-t border-stone-200/40 select-none">
      
      {/* Naslov sekcije */}
      <div className="max-w-7xl mx-auto px-4 text-center mb-16">
        <span className="text-[#bc1888] font-bold uppercase tracking-[0.25em] text-xs sm:text-sm mb-3 block">
          {activeLang === "SR" ? "Iskustva i utisci" : "Testimonials"}
        </span>
        <h2 className="text-4xl md:text-5xl font-serif text-stone-800 mb-4">
          {heading}
        </h2>
        <p className="text-stone-500 font-light text-base md:text-lg">
          {subHeading}
        </p>
      </div>

      {/* Traka za prevlačenje (zamenili smo običan scroll sa Framer motion drag-om) */}
      <div
        className="relative overflow-hidden py-4"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <motion.div 
          className="flex w-max gap-8 px-4 cursor-grab active:cursor-grabbing"
          style={{ x }}
          drag="x" // Omogućava prevlačenje levo-desno
          dragConstraints={{ left: -10000, right: 10000 }} // Oslobađa traku za beskonačan drag (naš teleport je hvata)
          dragElastic={0}
          onDragStart={() => (isDragging.current = true)}
          onDragEnd={() => (isDragging.current = false)}
          onMouseEnter={() => (isHovered.current = true)}
          onMouseLeave={() => (isHovered.current = false)}
          onTouchStart={() => (isHovered.current = true)}
          onTouchEnd={() => (isHovered.current = false)}
        >
          {loopReviews.map((review, index) => (
            <article
              key={`${review.id}-${index}`}
              // Postavljamo ref na prvu karticu samo da bismo izmerili širinu celog seta
              ref={index === 0 ? itemRef : null}
              className="shrink-0 w-[360px] sm:w-[400px] rounded-3xl bg-white/95 backdrop-blur-sm border border-[#E8DDD1]/60 shadow-lg p-8 transition-transform duration-300 hover:scale-[1.02] group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} size={14} />
                    ))}
                  </div>
                  <span className="text-3xl leading-none text-[#bc1888]/20 font-serif group-hover:text-[#bc1888]/40 transition-colors">
                    &ldquo;
                  </span>
                </div>

                <p className="text-stone-600 italic leading-relaxed font-light text-sm sm:text-base line-clamp-3">
                  {activeLang === "SR" ? review.shortSR : review.shortEN}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white font-serif text-sm shadow-sm">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800 text-sm sm:text-base">{review.name}</h4>
                    <span className="text-xs text-stone-400">{review.role}</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedReview(review)}
                  className="text-xs font-semibold text-[#bc1888] hover:underline uppercase tracking-wider"
                >
                  {activeLang === "SR" ? "Pročitaj sve" : "Read more"}
                </button>
              </div>
            </article>
          ))}
        </motion.div>
      </div>

      {/* ========================================================= */}
      {/* MODAL ZA PRIKAZ CELE RECENZIJE */}
      {/* ========================================================= */}
      <AnimatePresence>
        {selectedReview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedReview(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()} 
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-10 shadow-2xl relative border border-stone-100"
            >
              <button
                onClick={() => setSelectedReview(null)}
                className="absolute top-6 right-6 text-stone-400 hover:text-stone-800 p-2 rounded-full bg-stone-100 hover:bg-stone-200 transition-all"
                aria-label="Zatvori"
              >
                <FaTimes size={18} />
              </button>

              <div className="flex gap-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} size={16} />
                ))}
              </div>

              <div className="text-stone-700 italic font-light text-base sm:text-lg leading-relaxed space-y-4 mb-8 whitespace-pre-line">
                &ldquo;{activeLang === "SR" ? selectedReview.fullSR : selectedReview.fullEN}&rdquo;
              </div>

              <div className="pt-6 border-t border-stone-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white font-serif text-lg shadow-md">
                  {selectedReview.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-serif font-medium text-stone-900 text-lg">{selectedReview.name}</h3>
                  <p className="text-sm text-[#bc1888] font-medium">{selectedReview.role}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}