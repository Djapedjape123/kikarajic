"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Luxurious_Script } from "next/font/google";

// Uvozimo Luxurious Script font
const luxurious = Luxurious_Script({
  weight: "400",
  subsets: ["latin"],
});

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEduOpen, setIsEduOpen] = useState(false);

  // Praćenje skrola za promenu pozadine
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const eduLinks = [
    { name: "1:1 bazna", href: "/edukacije/1-1-bazna" },
    { name: "Škola šminke", href: "/edukacije/skola-sminke" },
    { name: "Perfekto", href: "/edukacije/perfekto" },
    { name: "Usavršavanje", href: "/edukacije/usavrsavanje" },
    { name: "N.sam by Tamara", href: "/edukacije/n-sam-by-tamara" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-40 transition-all duration-300 ease-in-out ${
        isScrolled || isMobileMenuOpen // Ako je meni otvoren, uvek primeni punu boju
          ? "bg-[#FAF7F2]/95 backdrop-blur-md text-stone-800 shadow-sm"
          : "bg-transparent text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* LOGO TEKST (Leva strana) */}
          <Link href="/" className="flex-shrink-0 flex items-center z-50">
            <span className={`${luxurious.className} text-3xl tracking-wider`}>
              Kika Rajić
            </span>
          </Link>

          {/* DESKTOP NAVIGACIJA (Sredina i Desno) */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/o-meni" className="hover:text-[#bc1888] transition-colors">O meni</Link>
            <Link href="/galerija" className="hover:text-[#bc1888] transition-colors">Galerija</Link>
            <Link href="/sminka" className="hover:text-[#bc1888] transition-colors">Šminka</Link>
            <Link href="/sprej-ten" className="hover:text-[#bc1888] transition-colors">Sprej ten</Link>
            
            {/* Edukacije Dropdown (Hover) */}
            <div className="relative group">
              <button className="hover:text-[#bc1888] transition-colors flex items-center gap-1 py-8">
                Edukacije
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              
              {/* Padajući meni (Desktop) */}
              <div className="absolute top-full left-0 mt-0 w-56 bg-[#FAF7F2]/95 backdrop-blur-md text-stone-800 shadow-xl rounded-b-xl border border-white/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top translate-y-2 group-hover:translate-y-0">
                <div className="py-2 flex flex-col">
                  {eduLinks.map((link, idx) => (
                    <Link key={idx} href={link.href} className="px-6 py-3 hover:bg-[#E8DDD1]/50 hover:text-[#bc1888] transition-all text-sm font-medium">
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/studio" className="hover:text-[#bc1888] transition-colors">Studio</Link>

            {/* Jezički prekidač SR | EN */}
            <div className="flex items-center space-x-2 pl-4 border-l border-current">
              <button className="font-bold text-[#bc1888] transition-colors">SR</button>
              <span className="opacity-50">|</span>
              <button className="hover:text-[#bc1888] transition-colors font-medium">EN</button>
            </div>
          </div>

          {/* HAMBURGER DUGME (Mobilni) */}
          <div className="md:hidden flex items-center z-50">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="focus:outline-none p-2 rounded-full hover:bg-black/5 transition-colors"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILNI MENI (Animiran, Frosted Glass) */}
      <div 
        className={`md:hidden fixed top-20 left-0 w-full h-screen bg-[#FAF7F2]/95 backdrop-blur-xl text-stone-800 shadow-2xl transition-all duration-500 ease-in-out origin-top ${
          isMobileMenuOpen ? "scale-y-100 opacity-100 visible" : "scale-y-0 opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col px-6 pt-6 pb-20 space-y-4 h-full overflow-y-auto">
          
          {/* Linkovi sa tranzicijom ukllizavanja */}
          <div className={`transition-all duration-500 delay-100 transform ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
            <Link href="/o-meni" className="block text-xl font-medium px-4 py-3 hover:bg-[#E8DDD1]/40 hover:text-[#bc1888] rounded-xl transition-all" onClick={() => setIsMobileMenuOpen(false)}>O meni</Link>
          </div>
          
          <div className={`transition-all duration-500 delay-150 transform ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
            <Link href="/galerija" className="block text-xl font-medium px-4 py-3 hover:bg-[#E8DDD1]/40 hover:text-[#bc1888] rounded-xl transition-all" onClick={() => setIsMobileMenuOpen(false)}>Galerija</Link>
          </div>
          
          <div className={`transition-all duration-500 delay-200 transform ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
            <Link href="/sminka" className="block text-xl font-medium px-4 py-3 hover:bg-[#E8DDD1]/40 hover:text-[#bc1888] rounded-xl transition-all" onClick={() => setIsMobileMenuOpen(false)}>Šminka</Link>
          </div>
          
          <div className={`transition-all duration-500 delay-250 transform ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
            <Link href="/sprej-ten" className="block text-xl font-medium px-4 py-3 hover:bg-[#E8DDD1]/40 hover:text-[#bc1888] rounded-xl transition-all" onClick={() => setIsMobileMenuOpen(false)}>Sprej ten</Link>
          </div>
          
          {/* Edukacije Accordion (Mobilni) */}
          <div className={`transition-all duration-500 delay-300 transform ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
            <button 
              onClick={() => setIsEduOpen(!isEduOpen)}
              className="flex justify-between items-center w-full text-xl font-medium px-4 py-3 hover:bg-[#E8DDD1]/40 hover:text-[#bc1888] rounded-xl transition-all"
            >
              Edukacije
              <svg className={`w-5 h-5 transform transition-transform duration-300 ${isEduOpen ? "rotate-180 text-[#bc1888]" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 px-4 ${isEduOpen ? "max-h-64 mt-2 opacity-100" : "max-h-0 opacity-0"}`}>
              <div className="flex flex-col space-y-2 border-l-2 border-[#bc1888]/30 pl-4 py-2">
                {eduLinks.map((link, idx) => (
                  <Link 
                    key={idx} 
                    href={link.href} 
                    className="block py-2 text-base text-stone-600 hover:text-[#bc1888] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className={`transition-all duration-500 delay-400 transform ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
            <Link href="/studio" className="block text-xl font-medium px-4 py-3 hover:bg-[#E8DDD1]/40 hover:text-[#bc1888] rounded-xl transition-all" onClick={() => setIsMobileMenuOpen(false)}>Studio</Link>
          </div>

          {/* Jezički prekidač (Mobilni) */}
          <div className={`flex justify-center space-x-4 pt-8 border-t border-stone-200 mt-6 transition-all duration-500 delay-500 transform ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
            <button className="font-bold px-6 py-2 bg-gradient-to-tr from-[#f09433] to-[#bc1888] text-white rounded-full shadow-md">SR</button>
            <button className="px-6 py-2 bg-white/50 border border-stone-200 hover:border-[#bc1888] text-stone-700 rounded-full transition-all">EN</button>
          </div>
        </div>
      </div>
    </nav>
  );
}