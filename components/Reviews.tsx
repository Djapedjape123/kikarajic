"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { FaStar, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

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
  
  const loopReviews = [...reviews, ...reviews, ...reviews];

  return (
    <section className="py-24 bg-[#FAF7F2] relative overflow-hidden border-t border-stone-200/40">
      
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

     {/* Marquee traka sa podrškom za prevlačenje prstom na mobilnim uređajima */}
      <div
        className="relative overflow-x-auto sm:overflow-hidden py-4 scrollbar-none"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          scrollbarWidth: 'none', // Skriva scrollbar na Firefox-u
          msOverflowStyle: 'none',  // Skriva scrollbar na IE/Edge
        }}
      >
        <div className="marquee-track flex w-max gap-8 px-4 touch-pan-x">
          {loopReviews.map((review, index) => (
            <article
              key={`${review.id}-${index}`}
              className="shrink-0 w-[360px] sm:w-[400px] rounded-3xl bg-white/95 backdrop-blur-sm border border-[#E8DDD1]/60 shadow-lg p-8 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:border-[#bc1888]/40 group flex flex-col justify-between"
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

                {/* Kratak tekst na kartici */}
                <p className="text-stone-600 italic leading-relaxed font-light text-sm sm:text-base line-clamp-3">
                  {activeLang === "SR" ? review.shortSR : review.shortEN}
                </p>
              </div>

              {/* Donji deo kartice sa dugmetom za čitanje celog teksta */}
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

                {/* Dugme za otvaranje cele recenzije */}
                <button
                  onClick={() => setSelectedReview(review)}
                  className="text-xs font-semibold text-[#bc1888] hover:underline uppercase tracking-wider"
                >
                  {activeLang === "SR" ? "Pročitaj sve" : "Read more"}
                </button>
              </div>
            </article>
          ))}
        </div>
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
              onClick={(e) => e.stopPropagation()} // Sprečava zatvaranje kad se klikne unutar prozora
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-10 shadow-2xl relative border border-stone-100"
            >
              {/* Dugme za zatvaranje (X) */}
              <button
                onClick={() => setSelectedReview(null)}
                className="absolute top-6 right-6 text-stone-400 hover:text-stone-800 p-2 rounded-full bg-stone-100 hover:bg-stone-200 transition-all"
                aria-label="Zatvori"
              >
                <FaTimes size={18} />
              </button>

              {/* Zvezdice u modalu */}
              <div className="flex gap-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} size={16} />
                ))}
              </div>

              {/* Puni tekst recenzije (sa prelomima redova) */}
              <div className="text-stone-700 italic font-light text-base sm:text-lg leading-relaxed space-y-4 mb-8 whitespace-pre-line">
                &ldquo;{activeLang === "SR" ? selectedReview.fullSR : selectedReview.fullEN}&rdquo;
              </div>

              {/* Potpis u modalu */}
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

      {/* CSS za animaciju trake */}
      {/* CSS za savršeno glatki kružni tok bez zastoja */}
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}