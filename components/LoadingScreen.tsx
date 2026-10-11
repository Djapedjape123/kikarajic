"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary";
import { isIntroSeen, markIntroSeen } from "@/lib/intro";

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Loader je već viđen u ovoj poseti - CSS ga je sakrio, pa ga odmah uklanjamo
    const seen = isIntroSeen();

    // Fade počinje malo pre kraja, pa se loader uklanja kad se fade (500ms) završi
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, seen ? 0 : 1600);
    const removeTimer = setTimeout(() => {
      setIsVisible(false);
      markIntroSeen();
    }, seen ? 0 : 2100);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      data-loader
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-500 ease-in-out ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="relative flex items-center justify-center">
        
        {/* 1. Spoljni svetlosni gradijent prsten koji se neprekidno rotira */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] opacity-30 blur-xl"
        />

        {/* 2. Suptilna tanka kružna linija sa eliptičnim prelivom koja rotira oko logoa */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          className="absolute w-[260px] h-[260px] sm:w-[380px] sm:h-[380px] rounded-full p-[2px] bg-gradient-to-r from-[#f09433] via-transparent to-[#bc1888] opacity-80"
        >
          {/* Unutrašnji prazan krug koji drži liniju tankom */}
          <div className="w-full h-full bg-black rounded-full" />
        </motion.div>

        {/* 3. Logotip koji izranja iz pozadine sa finim skaliranjem */}
        <motion.img
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          src={optimizeCloudinaryUrl("https://res.cloudinary.com/duomot4hp/image/upload/v1787775920/Kika_Rajic_logo-03_a0c7ef.png", 700)}
          alt="Kika Rajic Studio Logo"
          className="relative z-10 w-auto h-auto max-w-[75%] sm:max-w-[340px] object-contain drop-shadow-2xl"
        />

      </div>
    </div>
  );
}