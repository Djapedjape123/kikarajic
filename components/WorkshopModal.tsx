"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaSpinner, FaCheckCircle, FaTicketAlt } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";

interface WorkshopModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WorkshopModal({ isOpen, onClose }: WorkshopModalProps) {
  const { activeLang } = useLanguage();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setTimeout(() => {
        setName("");
        setEmail("");
        setStatus("idle");
      }, 500);
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ZAMUĆENA POZADINA (Backdrop) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-md"
          />

          {/* KONTEJNER KOJI KONTROLIŠE POZICIJU (Sredina na mob, Desno na desktopu) */}
          <div className="fixed inset-0 z-[100] flex items-center justify-center sm:justify-end pointer-events-none p-4 sm:p-0">
            
            {/* SAM MODAL / PANEL */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="pointer-events-auto w-full max-w-[400px] sm:max-w-none sm:w-[480px] h-auto sm:h-full bg-stone-950/95 backdrop-blur-2xl border border-white/10 sm:border-y-0 sm:border-r-0 shadow-2xl flex flex-col rounded-[2rem] sm:rounded-none relative overflow-hidden"
            >
              {/* Zaglavlje (Zatvaranje) */}
              <div className="flex justify-end p-5 sm:p-6 relative z-50">
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-stone-300 transition-colors"
                  aria-label="Zatvori"
                >
                  <FaTimes size={16} />
                </button>
              </div>

              {/* 3D KONTEJNER ZA FLIP EFEKAT */}
              <div className="flex-1 px-5 sm:px-10 pb-8 sm:pb-10 flex flex-col justify-center relative" style={{ perspective: 1200 }}>
                
                <motion.div
                  animate={{ rotateY: status === "success" ? 180 : 0 }}
                  transition={{ duration: 0.8, type: "spring", stiffness: 60 }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="relative w-full min-h-[460px] sm:min-h-[500px]"
                >
                  
                  {/* PREDNJA STRANA: FORMA */}
                  <div 
                    className="absolute inset-0 flex flex-col justify-center"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div className="mb-8 sm:mb-10 text-center">
                      <span className="text-[#f09433] font-bold uppercase tracking-[0.2em] text-[10px] sm:text-xs mb-2 sm:mb-3 block">
                        {activeLang === "SR" ? "Ekskluzivni Događaj" : "Exclusive Event"}
                      </span>
                      <h3 className="text-3xl sm:text-4xl font-serif text-white mb-3">
                        {activeLang === "SR" ? "Prijava za Workshop" : "Workshop Registration"}
                      </h3>
                      <p className="text-stone-400 font-light text-xs sm:text-sm leading-relaxed px-2">
                        {activeLang === "SR" 
                          ? "Ostavi svoje podatke kako bi rezervisala mesto. Broj mesta je strogo ograničen." 
                          : "Leave your details to reserve your spot. Spots are strictly limited."}
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                      <div>
                        <label htmlFor="name" className="block text-[10px] sm:text-xs uppercase tracking-widest text-stone-400 mb-2 ml-1">
                          {activeLang === "SR" ? "Ime i Prezime" : "Full Name"}
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          placeholder={activeLang === "SR" ? "npr. Ana Jovanović" : "e.g. Jane Doe"}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 sm:px-5 sm:py-4 text-sm sm:text-base text-white placeholder-stone-500 focus:outline-none focus:border-[#bc1888] focus:bg-white/10 transition-all shadow-inner"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-[10px] sm:text-xs uppercase tracking-widest text-stone-400 mb-2 ml-1">
                          {activeLang === "SR" ? "Email Adresa" : "Email Address"}
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          placeholder={activeLang === "SR" ? "tvoj@email.com" : "your@email.com"}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 sm:px-5 sm:py-4 text-sm sm:text-base text-white placeholder-stone-500 focus:outline-none focus:border-[#bc1888] focus:bg-white/10 transition-all shadow-inner"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full mt-2 sm:mt-4 flex items-center justify-center gap-3 px-8 py-3.5 sm:py-4 rounded-2xl text-white text-sm sm:text-base font-medium shadow-[0_0_20px_rgba(188,24,136,0.3)] bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(188,24,136,0.5)] disabled:opacity-70 disabled:hover:scale-100"
                      >
                        {status === "loading" ? (
                          <FaSpinner className="animate-spin" size={18} />
                        ) : (
                          activeLang === "SR" ? "Prijavi me" : "Register Now"
                        )}
                      </button>
                    </form>
                  </div>

                  {/* ZADNJA STRANA: VIP KARTA */}
                  <div 
                    className="absolute inset-0 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#bc1888] via-[#dc2743] to-[#f09433] border border-white/30"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    <div className="absolute top-0 right-0 w-[200%] h-[200%] bg-gradient-to-bl from-white/20 to-transparent -translate-y-1/2 translate-x-1/3 rotate-12 pointer-events-none" />
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6 sm:mb-8">
                        <FaTicketAlt className="text-white text-2xl sm:text-3xl drop-shadow-md" />
                        <span className="text-white font-bold uppercase tracking-[0.3em] text-[10px] sm:text-xs border border-white/50 bg-white/10 backdrop-blur-sm px-3 py-1 sm:px-4 sm:py-1.5 rounded-full shadow-sm">
                          VIP PASS
                        </span>
                      </div>

                      <h4 className="text-white/80 text-xs sm:text-sm font-light mb-1">
                        {activeLang === "SR" ? "Mesto rezervisano za:" : "Spot reserved for:"}
                      </h4>
                      <h2 className="text-2xl sm:text-4xl font-serif text-white mb-6 leading-tight drop-shadow-md">
                        {name || "Gost"}
                      </h2>

                      <div className="space-y-2 sm:space-y-3 border-l-2 border-white/40 pl-3 sm:pl-4">
                        <div>
                          <p className="text-white/70 text-[10px] sm:text-xs uppercase tracking-wider">{activeLang === "SR" ? "Događaj" : "Event"}</p>
                          <p className="text-white text-sm sm:text-base font-medium drop-shadow-sm">Kika Rajić Masterclass</p>
                        </div>
                        <div>
                          <p className="text-white/70 text-[10px] sm:text-xs uppercase tracking-wider">{activeLang === "SR" ? "Lokacija" : "Location"}</p>
                          <p className="text-white text-sm sm:text-base font-medium drop-shadow-sm">Novi Sad, Srbija</p>
                        </div>
                      </div>
                    </div>

                    <div className="relative z-10 pt-4 sm:pt-6 border-t border-white/20 mt-4 sm:mt-6 flex items-center gap-3 sm:gap-4 bg-black/10 p-3 sm:p-4 rounded-2xl backdrop-blur-sm">
                      <FaCheckCircle className="text-white text-xl sm:text-2xl shrink-0 drop-shadow-sm" />
                      <p className="text-white/90 text-[11px] sm:text-sm font-light leading-relaxed">
                        {activeLang === "SR" 
                          ? "Proveri svoj email! Poslali smo ti detalje." 
                          : "Check your email! We've sent you the details."}
                      </p>
                    </div>
                  </div>

                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}