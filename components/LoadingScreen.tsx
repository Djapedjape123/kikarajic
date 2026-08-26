"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Pokrećemo fade-out efekat (nestajanje) nakon 1.5 sekundi
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 1600);

    // Potpuno uklanjamo komponentu iz DOM-a nakon 2 sekunde da bi sajt bio klikabilan
    const removeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    // Cleanup funkcija
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  // Ako je vreme isteklo, ne renderujemo ništa
  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-500 ease-in-out ${
        isFading ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Ubaci svoj Cloud link u src atribut */}
      <img
        src="https://res.cloudinary.com/duomot4hp/image/upload/v1787775920/Kika_Rajic_logo-03_a0c7ef.png"
        alt="Kika Rajic Studio Logo"
        className="w-auto h-auto max-w-[85%] md:max-w-[400px] object-contain"
      />
    </div>
  );
}