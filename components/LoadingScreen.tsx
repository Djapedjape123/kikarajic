"use client";

/* eslint-disable @next/next/no-img-element -- slike optimizuje Cloudinary (lib/cloudinary.ts), isto kao na ostatku sajta */

import { useEffect, useState } from "react";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary";
import { introRemaining, isIntroSeen, markIntroSeen } from "@/lib/intro";

// Animacije loadera su CSS (app/globals.css), pa se prstenovi vrte i logo se pojavljuje
// od prvog iscrtavanja, ne tek kad se učita JS.
export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Loader je već viđen u ovoj poseti - CSS ga je sakrio, pa ga odmah uklanjamo
    const seen = isIntroSeen();

    // Fade počinje 1,6 s od otvaranja stranice, pa se loader uklanja kad se fade (500ms) završi
    const fadeDelay = introRemaining(1600);
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, fadeDelay);
    const removeTimer = setTimeout(() => {
      setIsVisible(false);
      markIntroSeen();
    }, seen ? 0 : fadeDelay + 500);

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
        <div
          className="animate-loader-ring absolute w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] opacity-30 blur-xl"
        />

        {/* 2. Suptilna tanka kružna linija sa eliptičnim prelivom koja rotira oko logoa */}
        <div
          className="animate-loader-ring-reverse absolute w-[260px] h-[260px] sm:w-[380px] sm:h-[380px] rounded-full p-[2px] bg-gradient-to-r from-[#f09433] via-transparent to-[#bc1888] opacity-80"
        >
          {/* Unutrašnji prazan krug koji drži liniju tankom */}
          <div className="w-full h-full bg-black rounded-full" />
        </div>

        {/* 3. Logotip koji izranja iz pozadine sa finim skaliranjem */}
        <img
          src={optimizeCloudinaryUrl("https://res.cloudinary.com/duomot4hp/image/upload/v1787775920/Kika_Rajic_logo-03_a0c7ef.png", 700)}
          alt="Kika Rajic Studio Logo"
          className="animate-loader-logo relative z-10 w-auto h-auto max-w-[75%] sm:max-w-[340px] object-contain drop-shadow-2xl"
        />

      </div>
    </div>
  );
}
