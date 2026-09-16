"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Ticket, Calendar, MapPin, Sparkles, CheckCircle2 } from "lucide-react";
import { FaInstagram } from "react-icons/fa"; // Povlačimo Instagram odavde
import { useLanguage } from "@/context/LanguageContext";

interface WorkshopModalProps {
  isOpen: boolean;
  onClose: () => void;
  workshopName: string;
  workshopDate: string;
}

function useIsDesktop(breakpoint = 640) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isDesktop;
}

export default function WorkshopModal({ isOpen, onClose, workshopName, workshopDate }: WorkshopModalProps) {
  const { activeLang } = useLanguage();
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
    document.body.style.overflow = "unset";
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Zatamnjena pozadina */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm"
          />

          <div className="fixed inset-0 z-[100] flex items-center justify-center sm:justify-end pointer-events-none p-4 sm:p-0">
            {/* Modal kontejner */}
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={isDesktop ? { x: "100%", opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
              animate={isDesktop ? { x: 0, opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
              exit={isDesktop ? { x: "100%", opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="pointer-events-auto w-full max-w-[420px] sm:max-w-none sm:w-[500px] max-h-[90vh] sm:max-h-none sm:h-full bg-stone-950/95 backdrop-blur-2xl border border-white/10 sm:border-y-0 sm:border-r-0 shadow-2xl flex flex-col rounded-[2rem] sm:rounded-none relative overflow-hidden"
            >
              {/* Close dugme */}
              <div className="flex justify-end p-5 sm:p-6 relative z-50 shrink-0">
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-stone-300 transition-colors"
                  aria-label={activeLang === "SR" ? "Zatvori" : "Close"}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Sadržaj modala */}
              <div className="flex-1 overflow-y-auto px-6 sm:px-10 pb-8 sm:pb-12 flex flex-col">
                
                {/* Header (Naslov i ikonica) */}
                <div className="mb-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#bc1888]/20 text-[#bc1888] mb-4">
                    <Ticket size={24} />
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-serif text-white leading-tight mb-4">
                    {workshopName}
                  </h3>
                  
                  {/* Informacije o vremenu i lokaciji */}
                  <div className="flex flex-col gap-2 text-stone-400 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-[#f09433]" />
                      <span>{workshopDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-[#f09433]" />
                      <span>Novi Sad, Srbija (Tačna lokacija po prijavi)</span>
                    </div>
                  </div>
                </div>

                {/* Sekcija: Šta vas očekuje */}
                <div className="space-y-6 mb-10">
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                    <h4 className="flex items-center gap-2 text-white font-medium mb-3">
                      <Sparkles size={16} className="text-[#bc1888]" />
                      {activeLang === "SR" ? "Šta vas očekuje?" : "What to expect?"}
                    </h4>
                    <p className="text-stone-400 font-light text-sm leading-relaxed">
                      {activeLang === "SR" 
                        ? "Ova radionica je dizajnirana da vam pruži praktično znanje i trikove iz sveta profesionalnog šminkanja. Fokusiramo se na moderne tehnike koje možete odmah primeniti."
                        : "This workshop is designed to give you hands-on knowledge and industry tricks. We focus on modern techniques you can apply immediately."}
                    </p>
                  </div>

                  {/* Lista benefita */}
                  <div className="space-y-3">
                    <h4 className="text-xs uppercase tracking-widest text-stone-500 font-semibold mb-2 ml-1">
                      {activeLang === "SR" ? "Obezbeđeno na radionici:" : "Provided at the workshop:"}
                    </h4>
                    {[
                      activeLang === "SR" ? "Sav materijal i profesionalna šminka" : "All materials and pro makeup",
                      activeLang === "SR" ? "Rad na modelima uz Kikinu asistenciju" : "Working on models with Kika's help",
                      activeLang === "SR" ? "Sertifikat o završenoj edukaciji" : "Certificate of completion",
                      activeLang === "SR" ? "Osveženje i poklon iznenađenja" : "Refreshments & surprise gift",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3 text-stone-300 text-sm font-light">
                        <CheckCircle2 size={16} className="text-[#bc1888] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Instagram Dugme za prijavu */}
                <div className="mt-auto pt-6">
                  <p className="text-center text-xs text-stone-500 mb-3 uppercase tracking-wider">
                    {activeLang === "SR" ? "Broj mesta je ograničen" : "Spots are limited"}
                  </p>
                  <a
                    href="https://ig.me/m/kikarajic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-white text-base font-medium shadow-[0_0_20px_rgba(188,24,136,0.3)] bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(188,24,136,0.5)]"
                  >
                    <FaInstagram size={20} />
                    {activeLang === "SR" ? "Prijavi se putem Instagrama" : "Apply via Instagram"}
                  </a>
                </div>

              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}