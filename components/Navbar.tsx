"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Luxurious_Script } from "next/font/google";
import { useLanguage } from "@/context/LanguageContext";

const luxurious = Luxurious_Script({
  weight: "400",
  subsets: ["latin"],
});

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEduOpen, setIsEduOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false); // <--- NOVO ZA USLUGE (MOBILNI)
  const [isReady, setIsReady] = useState(false);

  const { activeLang, setActiveLang, t } = useLanguage();

  const eduLinks = t.eduLinks;
  const serviceLinks = t.serviceLinks; // <--- Usluge iz prevoda

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 2000);

    const handleScroll = () => {
      if (window.scrollY > 50) setIsScrolled(true);
      else setIsScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed left-1/2 transform -translate-x-1/2 z-40 transition-all duration-700 ease-in-out ${
        !isReady ? "opacity-0 pointer-events-none" : "opacity-100"
      } ${
        isScrolled && !isMobileMenuOpen
          ? "top-4 w-[95%] md:w-[85%] lg:w-[75%] rounded-3xl bg-[#FAF7F2]/95 backdrop-blur-md text-stone-800 shadow-xl"
          : isMobileMenuOpen
          ? "top-0 w-full bg-[#FAF7F2]/95 backdrop-blur-md text-stone-800 shadow-sm"
          : "top-0 w-full bg-transparent text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <Link href="/" className="flex-shrink-0 flex items-center z-50">
            <span className={`${luxurious.className} text-3xl tracking-wider`}>
              Kika Rajić
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/o-meni" className="hover:text-[#bc1888] transition-colors">{t.nav.about}</Link>
            <Link href="/galerija" className="hover:text-[#bc1888] transition-colors">{t.nav.gallery}</Link>
            
            {/* NOVI PADAJUĆI MENI: USLUGE (Desktop) */}
            <div className="relative group">
              <button className="hover:text-[#bc1888] transition-colors flex items-center gap-1 py-8">
                {t.nav.services}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-[#FAF7F2]/95 backdrop-blur-md text-stone-800 shadow-2xl rounded-2xl border border-white/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top translate-y-2 group-hover:translate-y-0">
                <div className="py-2 flex flex-col">
                  {serviceLinks.map((link, idx) => (
                    <Link key={idx} href={link.href} className="px-6 py-3 mx-2 rounded-xl hover:bg-[#E8DDD1]/50 hover:text-[#bc1888] transition-all text-sm font-medium">
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            {/* PADAJUĆI MENI: EDUKACIJE (Desktop) */}
            <div className="relative group">
              <button className="hover:text-[#bc1888] transition-colors flex items-center gap-1 py-8">
                {t.nav.educations}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-[#FAF7F2]/95 backdrop-blur-md text-stone-800 shadow-2xl rounded-2xl border border-white/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top translate-y-2 group-hover:translate-y-0">
                <div className="py-2 flex flex-col">
                  {eduLinks.map((link, idx) => (
                    <Link key={idx} href={link.href} className="px-6 py-3 mx-2 rounded-xl hover:bg-[#E8DDD1]/50 hover:text-[#bc1888] transition-all text-sm font-medium">
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/studio" className="hover:text-[#bc1888] transition-colors">{t.nav.studio}</Link>

            <div className="flex items-center space-x-2 pl-4 border-l border-current">
              <button 
                onClick={() => setActiveLang('SR')}
                className={`transition-colors ${activeLang === 'SR' ? 'font-bold text-[#bc1888]' : 'font-medium hover:text-[#bc1888]'}`}
              >
                SR
              </button>
              <span className="opacity-50">|</span>
              <button 
                onClick={() => setActiveLang('EN')}
                className={`transition-colors ${activeLang === 'EN' ? 'font-bold text-[#bc1888]' : 'font-medium hover:text-[#bc1888]'}`}
              >
                EN
              </button>
            </div>
          </div>

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

      {/* MOBILNI MENI */}
      <div 
        className={`md:hidden fixed top-20 left-0 w-full h-screen bg-[#FAF7F2]/95 backdrop-blur-xl text-stone-800 shadow-2xl transition-all duration-500 ease-in-out origin-top ${
          isMobileMenuOpen ? "scale-y-100 opacity-100 visible" : "scale-y-0 opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col px-6 pt-6 pb-20 space-y-3 h-full overflow-y-auto">
          
          <div className={`transition-all duration-500 delay-100 transform ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
            <Link href="/o-meni" className="flex items-center gap-3 text-lg font-medium px-4 py-3 hover:bg-[#E8DDD1]/40 hover:text-[#bc1888] rounded-xl transition-all" onClick={() => setIsMobileMenuOpen(false)}>
              <svg className="w-5 h-5 text-[#bc1888]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              {t.nav.about}
            </Link>
          </div>
          
          <div className={`transition-all duration-500 delay-150 transform ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
            <Link href="/galerija" className="flex items-center gap-3 text-lg font-medium px-4 py-3 hover:bg-[#E8DDD1]/40 hover:text-[#bc1888] rounded-xl transition-all" onClick={() => setIsMobileMenuOpen(false)}>
              <svg className="w-5 h-5 text-[#bc1888]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              {t.nav.gallery}
            </Link>
          </div>

          {/* NOVI MOBILNI AKORDIJON ZA USLUGE */}
          <div className={`transition-all duration-500 delay-200 transform ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
            <button 
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              className="flex justify-between items-center w-full text-lg font-medium px-4 py-3 hover:bg-[#E8DDD1]/40 hover:text-[#bc1888] rounded-xl transition-all"
            >
              <span className="flex items-center gap-3">
                <svg className="w-5 h-5 text-[#bc1888]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                {t.nav.services}
              </span>
              <svg className={`w-5 h-5 transform transition-transform duration-300 ${isServicesOpen ? "rotate-180 text-[#bc1888]" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 px-4 ${isServicesOpen ? "max-h-64 mt-2 opacity-100" : "max-h-0 opacity-0"}`}>
              <div className="flex flex-col space-y-2 border-l-2 border-[#bc1888]/30 pl-4 py-2">
                {serviceLinks.map((link, idx) => (
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
          
          {/* MOBILNI AKORDIJON ZA EDUKACIJE */}
          <div className={`transition-all duration-500 delay-250 transform ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
            <button 
              onClick={() => setIsEduOpen(!isEduOpen)}
              className="flex justify-between items-center w-full text-lg font-medium px-4 py-3 hover:bg-[#E8DDD1]/40 hover:text-[#bc1888] rounded-xl transition-all"
            >
              <span className="flex items-center gap-3">
                <svg className="w-5 h-5 text-[#bc1888]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>
                {t.nav.educations}
              </span>
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

          <div className={`transition-all duration-500 delay-300 transform ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
            <Link href="/studio" className="flex items-center gap-3 text-lg font-medium px-4 py-3 hover:bg-[#E8DDD1]/40 hover:text-[#bc1888] rounded-xl transition-all" onClick={() => setIsMobileMenuOpen(false)}>
              <svg className="w-5 h-5 text-[#bc1888]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V10a2 2 0 012-2h2a2 2 0 012 2v11" /></svg>
              {t.nav.studio}
            </Link>
          </div>

          <div className={`flex justify-center space-x-4 pt-6 border-t border-stone-200 mt-4 transition-all duration-500 delay-350 transform ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
            <button 
              onClick={() => setActiveLang('SR')}
              className={`font-bold px-6 py-2 rounded-full transition-all ${
                activeLang === 'SR' 
                ? 'bg-gradient-to-tr from-[#f09433] to-[#bc1888] text-white shadow-md' 
                : 'bg-white/50 border border-stone-200 hover:border-[#bc1888] text-stone-700'
              }`}
            >
              SR
            </button>
            <button 
              onClick={() => setActiveLang('EN')}
              className={`font-bold px-6 py-2 rounded-full transition-all ${
                activeLang === 'EN' 
                ? 'bg-gradient-to-tr from-[#f09433] to-[#bc1888] text-white shadow-md' 
                : 'bg-white/50 border border-stone-200 hover:border-[#bc1888] text-stone-700'
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}