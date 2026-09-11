"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import anime from "animejs";
import { Luxurious_Script } from "next/font/google";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";


const luxurious = Luxurious_Script({
    weight: "400",
    subsets: ["latin"],
});


const defaultImages = [
    "https://res.cloudinary.com/duomot4hp/image/upload/v1788264843/54E45CA6-5F90-4244-97DA-5B1332C2C2CA.JPG_n3kffz.jpg",
    "https://res.cloudinary.com/duomot4hp/image/upload/v1788264907/IMG_1462.JPG_nsptku.jpg",
    "https://res.cloudinary.com/duomot4hp/image/upload/v1788264947/IMG_1468.JPG_llp04w.jpg",
    "https://res.cloudinary.com/duomot4hp/image/upload/v1788265014/IMG_1479.JPG_pkoauw.jpg",
];

export default function AboutPage() {
    const { t } = useLanguage();
    const images = defaultImages;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const sliderImageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (lightboxIndex !== null) return;

        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(timer);
    }, [images.length, lightboxIndex]);

    useEffect(() => {
        const content = contentRef.current;
        if (!content || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const animation = anime({
            targets: content.querySelectorAll("[data-about-reveal]"),
            opacity: [0, 1],
            translateY: [24, 0],
            delay: anime.stagger(120),
            duration: 800,
            easing: "easeOutExpo",
        });

        return () => animation.pause();
    }, []);

    useEffect(() => {
        const image = sliderImageRef.current;
        if (!image || lightboxIndex !== null || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const animation = anime({
            targets: image,
            scale: [1, 1.045],
            duration: 3000,
            easing: "linear",
        });

        return () => animation.pause();
    }, [currentIndex, lightboxIndex]);

    useEffect(() => {
        if (lightboxIndex !== null || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const animation = anime({
            targets: ".about-progress",
            scaleX: [0, 1],
            duration: 3000,
            easing: "linear",
        });

        return () => animation.pause();
    }, [currentIndex, lightboxIndex]);

    useEffect(() => {
        if (lightboxIndex === null) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setLightboxIndex(null);
            if (event.key === "ArrowLeft") handlePrev();
            if (event.key === "ArrowRight") handleNext();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [lightboxIndex]);

    const handlePrev = () => {
        if (lightboxIndex === null) return;
        setLightboxIndex((prev) => (prev! === 0 ? images.length - 1 : prev! - 1));
    };

    const handleNext = () => {
        if (lightboxIndex === null) return;
        setLightboxIndex((prev) => (prev! === images.length - 1 ? 0 : prev! + 1));
    };

    return (
        // 1. Dodali smo 'relative' na main da bi gradijent mogao da se pozicionira
        <main className="min-h-screen relative bg-[#FAF7F2] pt-28 pb-16 md:pt-36 md:pb-24 px-4 sm:px-6 lg:px-12 overflow-hidden">

            {/* 2. GRANDIOZAN GRADIJENT ZA NAVBAR */}
            {/* Kreće od tamno sive/crne pri vrhu i bledi u providno prema dole */}
            <div className="absolute top-0 left-0 w-full h-[45vh] bg-gradient-to-b from-[#C28B5A]/90 via-[#D4A373]/40 to-transparent pointer-events-none z-0" />

            {/* 3. Dodali smo 'relative z-10' da bi ceo sadržaj bio iznad ovog gradijenta */}
            <div className="max-w-7xl mx-auto relative z-10">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    {/* LEVA STRANA: TEKST */}
                    <div
                        ref={contentRef}
                        className="lg:col-span-7 flex flex-col justify-center"
                    >
                        <span data-about-reveal className="text-[#bc1888] font-bold uppercase tracking-[0.25em] text-xs sm:text-sm mb-3 block">
                            {t.about.badge}
                        </span>

                        <h1 data-about-reveal className="text-4xl sm:text-5xl md:text-6xl font-serif text-stone-800 mb-8 leading-tight">
                            {t.about.title} <span className={`${luxurious.className} text-5xl sm:text-6xl md:text-7xl text-[#bc1888] inline-block`}>Kika Rajić</span>
                        </h1>

                        <div className="space-y-5 text-stone-700 text-base sm:text-lg leading-relaxed font-light">
                            <p data-about-reveal>{t.about.p1}</p>
                            <p data-about-reveal>{t.about.p2}</p>
                            <p data-about-reveal>{t.about.p3}</p>
                            <p data-about-reveal>{t.about.p4}</p>
                        </div>

                        {/* Citat */}
                        <div data-about-reveal className="mt-8 p-6 rounded-2xl bg-white/70 border-l-4 border-[#bc1888] shadow-sm backdrop-blur-sm">
                            <p className="italic text-stone-800 font-serif text-xl">
                                &ldquo;{t.about.quote}&rdquo;
                            </p>
                        </div>

                        <Link
                            data-about-reveal
                            href="/edukacije/skola-sminkanja"
                            className="mt-7 self-start rounded-full bg-[#bc1888] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#bc1888]/20 transition-transform hover:-translate-y-1 hover:bg-[#a91579]"
                        >
                            {t.nav.educations}
                        </Link>
                    </div>

                    {/* DESNA STRANA: SLAJDER */}
                    <motion.div
                        initial={{ opacity: 0, x: 70 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
                        className="lg:col-span-5 flex flex-col items-center"
                    >
                        <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-[8px] border-white bg-stone-200 group">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    ref={sliderImageRef}
                                    key={currentIndex}
                                    src={images[currentIndex]}
                                    alt={`Kika Rajić Slika ${currentIndex + 1}`}
                                    initial={{ opacity: 0, scale: 1.05 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.6 }}
                                    onClick={() => setLightboxIndex(currentIndex)}
                                    className="w-full h-full object-cover cursor-pointer"
                                />
                            </AnimatePresence>

                            <button
                                type="button"
                                onClick={() => setLightboxIndex(currentIndex)}
                                className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full opacity-90 group-hover:opacity-100 transition-opacity cursor-pointer pointer-events-auto"
                            >
                                Klikni za ceo ekran
                            </button>

                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10 pointer-events-none">
                                {images.map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={`h-2 rounded-full overflow-hidden transition-all duration-300 ${idx === currentIndex ? "w-8 bg-white/40" : "w-2 bg-white/50"
                                            }`}
                                    >
                                        {idx === currentIndex && (
                                            <span className="about-progress block h-full origin-left bg-white" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* LIGHTBOX */}
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 select-none"
                    >
                        <button
                            onClick={() => setLightboxIndex(null)}
                            className="absolute top-6 right-6 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all z-20"
                            aria-label="Zatvori"
                        >
                            <FaTimes size={24} />
                        </button>

                        <button
                            onClick={handlePrev}
                            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 sm:p-4 rounded-full bg-white/10 hover:bg-white/20 transition-all z-20"
                            aria-label="Prethodna slika"
                        >
                            <FaChevronLeft size={22} />
                        </button>

                        <button
                            onClick={handleNext}
                            className="absolute right-4 sm:left-auto sm:right-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 sm:p-4 rounded-full bg-white/10 hover:bg-white/20 transition-all z-20"
                            aria-label="Sledeća slika"
                        >
                            <FaChevronRight size={22} />
                        </button>

                        <motion.div
                            key={lightboxIndex}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.2}
                            onDragEnd={(_, info) => {
                                if (info.offset.x > 100) handlePrev();
                                else if (info.offset.x < -100) handleNext();
                            }}
                            className="max-w-4xl max-h-[85vh] w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
                        >
                            <img
                                src={images[lightboxIndex]}
                                alt="Enlarged view"
                                className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl pointer-events-none"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}