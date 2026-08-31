"use client";

import { useEffect, useState } from 'react';
import { FaInstagram } from 'react-icons/fa';

export default function InstagramFloatButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Dugme se pojavljuje nakon 4 sekunde (2 sec loader + 2 sec gledanja sajta)
    const timer = setTimeout(() => setIsVisible(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <a
      // Magični link za direktan chat:
      href="https://ig.me/m/kikarajic"
      target="_blank"
      rel="noopener noreferrer"
      // Fiksirano dole desno, iznad svega (z-[60])
      className="fixed bottom-6 right-6 z-[60] bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white p-4 rounded-full shadow-2xl transition-all duration-500 animate-in fade-in zoom-in-50 hover:scale-110 hover:shadow-[#bc1888]/50 flex items-center justify-center group"
      aria-label="Zakaži termin preko Instagrama"
    >
      {/* Tooltip (oblačić) koji se pojavljuje na hover */}
      <span className="absolute right-16 bg-white text-stone-800 text-sm font-medium px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl whitespace-nowrap pointer-events-none transform translate-x-4 group-hover:translate-x-0 border border-stone-100 hidden sm:block">
        Zakaži svoj termin ovde
        {/* Mali trougao (strelica) na oblačiću */}
        <span className="absolute top-1/2 -right-2 -translate-y-1/2 border-[6px] border-transparent border-l-white"></span>
      </span>
      
      {/* Instagram Ikonica */}
      <FaInstagram size={30} />
      
      {/* Efekt pulsiranja iza dugmeta (da privuče pažnju) */}
      <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] animate-ping opacity-30 pointer-events-none"></span>
    </a>
  );
}