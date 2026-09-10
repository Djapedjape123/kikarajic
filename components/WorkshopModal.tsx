"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, CheckCircle2, Ticket } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface WorkshopModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Prati širinu ekrana da bismo znali da li je desktop (slide-in sa strane, pun visina)
// ili mobilni (centriran modal na sredini ekrana).
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

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export default function WorkshopModal({ isOpen, onClose }: WorkshopModalProps) {
  const { activeLang } = useLanguage();
  const isDesktop = useIsDesktop();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";

      const focusTimer = setTimeout(() => nameInputRef.current?.focus(), 400);
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        clearTimeout(focusTimer);
        window.removeEventListener("keydown", handleKeyDown);
      };
    }

    document.body.style.overflow = "unset";
    const resetTimer = setTimeout(() => {
      setName("");
      setEmail("");
      setEmailError("");
      setStatus("idle");
    }, 500);
    return () => clearTimeout(resetTimer);
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    if (!isValidEmail(email)) {
      setEmailError(
        activeLang === "SR" ? "Unesi ispravnu email adresu." : "Enter a valid email address."
      );
      return;
    }

    setEmailError("");
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

          {/* KONTEJNER: centrirano na malom ekranu, desno (pun visina) na desktopu */}
          <div className="fixed inset-0 z-[100] flex items-center justify-center sm:justify-end pointer-events-none p-4 sm:p-0">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="workshop-modal-title"
              initial={isDesktop ? { x: "100%", opacity: 0 } : { opacity: 0, scale: 0.95 }}
              animate={isDesktop ? { x: 0, opacity: 1 } : { opacity: 1, scale: 1 }}
              exit={isDesktop ? { x: "100%", opacity: 0 } : { opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="pointer-events-auto w-full max-w-[400px] sm:max-w-none sm:w-[480px] max-h-[90vh] sm:max-h-none sm:h-full bg-stone-950/95 backdrop-blur-2xl border border-white/10 sm:border-y-0 sm:border-r-0 shadow-2xl flex flex-col rounded-[2rem] sm:rounded-none relative overflow-hidden"
            >
              {/* Zaglavlje (Zatvaranje) */}
              <div className="flex justify-end p-5 sm:p-6 relative z-50 shrink-0">
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-stone-300 transition-colors"
                  aria-label={activeLang === "SR" ? "Zatvori" : "Close"}
                >
                  <X size={18} />
                </button>
              </div>

              {/* SADRŽAJ - skroluje se ako ne stane na mali ekran */}
              <div className="flex-1 overflow-y-auto px-5 sm:px-10 pb-8 sm:pb-10 flex flex-col justify-center relative" style={{ perspective: 1200 }}>
                <motion.div
                  animate={{ rotateY: status === "success" ? 180 : 0 }}
                  transition={{ duration: 0.8, type: "spring", stiffness: 60 }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="relative w-full min-h-[440px] sm:min-h-[500px]"
                >
                  {/* PREDNJA STRANA: FORMA */}
                  <div
                    className="absolute inset-0 flex flex-col justify-center"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div className="mb-8 sm:mb-10 text-center">
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <Ticket className="text-[#bc1888]" size={22} />
                        <h3 id="workshop-modal-title" className="text-3xl sm:text-4xl font-serif text-white">
                          {activeLang === "SR" ? "Prijava za Workshop" : "Workshop Registration"}
                        </h3>
                      </div>
                      <p className="text-stone-400 font-light text-xs sm:text-sm leading-relaxed px-2">
                        {activeLang === "SR"
                          ? "Ostavi svoje podatke kako bi rezervisala mesto. Broj mesta je strogo ograničen."
                          : "Leave your details to reserve your spot. Spots are strictly limited."}
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" noValidate>
                      <div>
                        <label htmlFor="name" className="block text-[10px] sm:text-xs uppercase tracking-widest text-stone-400 mb-2 ml-1">
                          {activeLang === "SR" ? "Ime i Prezime" : "Full Name"}
                        </label>
                        <input
                          ref={nameInputRef}
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
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (emailError) setEmailError("");
                          }}
                          required
                          placeholder={activeLang === "SR" ? "tvoj@email.com" : "your@email.com"}
                          aria-invalid={Boolean(emailError)}
                          className={`w-full bg-white/5 border rounded-2xl px-4 py-3 sm:px-5 sm:py-4 text-sm sm:text-base text-white placeholder-stone-500 focus:outline-none focus:bg-white/10 transition-all shadow-inner ${
                            emailError
                              ? "border-red-400/70 focus:border-red-400"
                              : "border-white/10 focus:border-[#bc1888]"
                          }`}
                        />
                        {emailError && (
                          <p className="mt-2 ml-1 text-xs text-red-400">{emailError}</p>
                        )}
                      </div>

                      <p className="text-[11px] text-stone-500 leading-relaxed px-1">
                        {activeLang === "SR"
                          ? "Prijavom pristaješ da te obavestimo o budućim radionicama."
                          : "By registering, you agree to be notified about future workshops."}
                      </p>

                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full mt-2 sm:mt-4 flex items-center justify-center gap-3 px-8 py-3.5 sm:py-4 rounded-2xl text-white text-sm sm:text-base font-medium shadow-[0_0_20px_rgba(188,24,136,0.35)] bg-gradient-to-tr from-[#e35bb0] via-[#bc1888] to-[#7a0f5e] transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(188,24,136,0.55)] disabled:opacity-70 disabled:hover:scale-100"
                      >
                        {status === "loading" ? (
                          <Loader2 className="animate-spin" size={18} />
                        ) : (
                          activeLang === "SR" ? "Prijavi me" : "Register Now"
                        )}
                      </button>
                    </form>
                  </div>

                  {/* ZADNJA STRANA: VIP KARTA */}
                  <div
                    className="absolute inset-0 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#e35bb0] via-[#bc1888] to-[#7a0f5e] border border-white/30"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    <div className="absolute top-0 right-0 w-[200%] h-[200%] bg-gradient-to-bl from-white/20 to-transparent -translate-y-1/2 translate-x-1/3 rotate-12 pointer-events-none" />

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6 sm:mb-8">
                        <Ticket className="text-white drop-shadow-md" size={26} />
                        <span className="text-white font-bold uppercase tracking-[0.3em] text-[10px] sm:text-xs border border-white/50 bg-white/10 backdrop-blur-sm px-3 py-1 sm:px-4 sm:py-1.5 rounded-full shadow-sm">
                          VIP PASS
                        </span>
                      </div>

                      <h4 className="text-white/80 text-xs sm:text-sm font-light mb-1">
                        {activeLang === "SR" ? "Mesto rezervisano za:" : "Spot reserved for:"}
                      </h4>
                      <h2 className="text-2xl sm:text-4xl font-serif text-white mb-6 leading-tight drop-shadow-md">
                        {name || (activeLang === "SR" ? "Gost" : "Guest")}
                      </h2>

                      <div className="space-y-2 sm:space-y-3 border-l-2 border-white/40 pl-3 sm:pl-4">
                        <div>
                          <p className="text-white/70 text-[10px] sm:text-xs uppercase tracking-wider">
                            {activeLang === "SR" ? "Događaj" : "Event"}
                          </p>
                          <p className="text-white text-sm sm:text-base font-medium drop-shadow-sm">Kika Rajić Masterclass</p>
                        </div>
                        <div>
                          <p className="text-white/70 text-[10px] sm:text-xs uppercase tracking-wider">
                            {activeLang === "SR" ? "Lokacija" : "Location"}
                          </p>
                          <p className="text-white text-sm sm:text-base font-medium drop-shadow-sm">Novi Sad, Srbija</p>
                        </div>
                      </div>
                    </div>

                    <div className="relative z-10 pt-4 sm:pt-6 border-t border-white/20 mt-4 sm:mt-6 flex items-center gap-3 sm:gap-4 bg-black/10 p-3 sm:p-4 rounded-2xl backdrop-blur-sm">
                      <CheckCircle2 className="text-white shrink-0 drop-shadow-sm" size={22} />
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