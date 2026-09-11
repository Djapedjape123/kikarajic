"use client";

import Link from "next/link";
import { Luxurious_Script } from "next/font/google";
import { useLanguage } from "@/context/LanguageContext";
import { FaInstagram, FaMapMarkerAlt, FaEnvelope, FaChevronUp, FaTiktok } from "react-icons/fa";
import { usePathname } from "next/navigation";

const luxurious = Luxurious_Script({
    weight: "400",
    subsets: ["latin"],
});

export default function Footer() {
    const { activeLang, t } = useLanguage();
    const pathname = usePathname();

    

    const eduLinks = t.eduLinks || [];
    const serviceLinks = t.serviceLinks || [];

    // Funkcija za glatko vraćanje na vrh stranice
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    if (pathname.startsWith("/admin")) return null;

    return (
        <footer className="bg-stone-900 text-stone-300 relative overflow-hidden pt-20 pb-12 border-t border-stone-800">

            {/* Dekorativni svetlosni preliv u pozadini footera */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-48 bg-gradient-to-tr from-[#f09433]/10 via-[#dc2743]/10 to-[#bc1888]/10 blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">

                {/* GLAVNA MREŽA (4 Kolone) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-stone-800">

                    {/* 1. KOLONA: Brending & Logo (Zauzima 4 kolone na desktopu) */}
                    <div className="lg:col-span-4 flex flex-col items-start space-y-6">
                        <Link href="/" className="group">
                            <span className={`${luxurious.className} text-4xl tracking-wider text-white group-hover:text-[#bc1888] transition-colors`}>
                                Kika Rajić
                            </span>
                        </Link>

                        <p className="text-stone-400 font-light text-sm sm:text-base leading-relaxed max-w-sm">
                            {activeLang === "SR"
                                ? "Mesto gde se vrhunski profesionalizam, elegancija i umetnost šminkanja spajaju u jedinstveno iskustvo."
                                : "A place where top professionalism, elegance, and makeup artistry blend into a unique experience."}
                        </p>

                        {/* Društvene mreže / Instagram */}
                        <div className="flex items-center space-x-4 pt-2">
                            <a
                                href="https://ig.me/m/kikarajic"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center text-white hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] transition-all hover:scale-110 shadow-md"
                                aria-label="Instagram"
                            >
                                <FaInstagram size={18} />
                            </a>
                            <a
                                href="https://www.tiktok.com/@kikarajic24"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center text-white hover:bg-black transition-all hover:scale-110 shadow-md"
                                aria-label="TikTok"
                            >
                                <FaTiktok size={16} />
                            </a>
                        </div>
                    </div>

                    {/* 2. KOLONA: Brzi linkovi / Istražite (Zauzima 2 kolone) */}
                    <div className="lg:col-span-2 flex flex-col space-y-4">
                        <h4 className="text-white font-serif text-lg tracking-wide mb-2">
                            {activeLang === "SR" ? "Istražite" : "Explore"}
                        </h4>
                        <Link href="/o-meni" className="text-stone-400 hover:text-white transition-colors text-sm font-light">
                            {t.nav.about}
                        </Link>
                        <Link href="/galerija" className="text-stone-400 hover:text-white transition-colors text-sm font-light">
                            {t.nav.gallery}
                        </Link>
                        <Link href="/studio" className="text-stone-400 hover:text-white transition-colors text-sm font-light">
                            {t.nav.studio}
                        </Link>
                        {/* Dinamički linkovi usluga iz prevoda */}
                        {serviceLinks.map((link, idx) => (
                            <Link key={idx} href={link.href} className="text-stone-400 hover:text-white transition-colors text-sm font-light">
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* 3. KOLONA: Edukacije (Zauzima 3 kolone) */}
                    <div className="lg:col-span-3 flex flex-col space-y-4">
                        <h4 className="text-white font-serif text-lg tracking-wide mb-2">
                            {activeLang === "SR" ? "Edukacije" : "Educations"}
                        </h4>
                        {eduLinks.map((link, idx) => (
                            <Link key={idx} href={link.href} className="text-stone-400 hover:text-white transition-colors text-sm font-light">
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* 4. KOLONA: Kontakt & Lokacija (Zauzima 3 kolone) */}
                    <div className="lg:col-span-3 flex flex-col space-y-4">
                        <h4 className="text-white font-serif text-lg tracking-wide mb-2">
                            {activeLang === "SR" ? "Kontakt" : "Contact"}
                        </h4>

                        <div className="flex items-start gap-3 text-stone-400 text-sm font-light">
                            <FaMapMarkerAlt className="text-[#bc1888] mt-1 shrink-0" size={16} />
                            <span>Novi Sad, Srbija</span>
                        </div>

                        <div className="flex items-center gap-3 text-stone-400 text-sm font-light">
                            <FaEnvelope className="text-[#bc1888] shrink-0" size={16} />
                            <a href="mailto:rajickristina.ns@gmail.com" className="hover:text-white transition-colors">
                                rajickristina.ns@gmail.com
                            </a>
                        </div>

                        <div className="pt-2">
                            <a
                                href="https://ig.me/m/kikarajic"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-stone-800 hover:bg-stone-700 transition-all border border-stone-700"
                            >
                                {activeLang === "SR" ? "Zakaži termin" : "Book appointment"}
                            </a>
                        </div>
                    </div>

                </div>

                {/* DONJI DEO FOOTERA (Copyright + Developer Tag + Povratak na vrh) */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-light">

                    <p>© {new Date().getFullYear()} Kika Rajić Studio. {activeLang === "SR" ? "Sva prava zadržana." : "All rights reserved."}</p>

                    <p className="flex items-center gap-1">
                        <span>Web dev by</span>
                        <span className="text-stone-400 font-medium"><a href="https://www.pedjadev.com/">prWeb</a></span>
                    </p>

                    {/* Dugme za povratak na vrh */}
                    <button
                        onClick={scrollToTop}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-800 text-stone-400 hover:text-white hover:bg-stone-700 transition-all cursor-pointer"
                        aria-label="Povratak na vrh"
                    >
                        <span>{activeLang === "SR" ? "Na vrh" : "Top"}</span>
                        <FaChevronUp size={10} />
                    </button>

                </div>

            </div>
        </footer>
    );
}