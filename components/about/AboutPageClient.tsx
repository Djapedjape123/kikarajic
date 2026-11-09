"use client";

/* eslint-disable @next/next/no-img-element -- slike optimizuje Cloudinary (lib/cloudinary.ts), isto kao na ostatku sajta */

// Interaktivni deo stranice O meni: slajder, lightbox i anime.js pojavljivanje teksta.
// Sam tekst (children) renderuje server (app/[lang]/o-meni/page.tsx), pa nije u JS-u; raspored je isti kao ranije.
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import anime from "animejs";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary";

const defaultImages = [
    "https://res.cloudinary.com/duomot4hp/image/upload/v1788264843/54E45CA6-5F90-4244-97DA-5B1332C2C2CA.JPG_n3kffz.jpg",
    "https://res.cloudinary.com/duomot4hp/image/upload/v1788264907/IMG_1462.JPG_nsptku.jpg",
    "https://res.cloudinary.com/duomot4hp/image/upload/v1788264947/IMG_1468.JPG_llp04w.jpg",
    "https://res.cloudinary.com/duomot4hp/image/upload/v1788265014/IMG_1479.JPG_pkoauw.jpg",
];

// Manja verzija za slajder (prikazuje se u okviru ~420px)
const images = defaultImages.map((url) => optimizeCloudinaryUrl(url, 900));
// Veća verzija za lightbox (prikazuje se skoro preko celog ekrana)
const lightboxImages = defaultImages.map((url) => optimizeCloudinaryUrl(url, 1600));

export default function AboutPageClient({ clickLabel, children }: { clickLabel: string; children: ReactNode }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const sliderImageRef = useRef<HTMLImageElement>(null);

    // slike slajdera se učitavaju unapred, da prelaz bude bez čekanja
    useEffect(() => {
        images.forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }, []);
   // funkacija za automatsko menjanje slika u slajderu svakih 3 sekunde, osim kada je lightbox otvoren
    useEffect(() => {
        if (lightboxIndex !== null) return;

        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(timer);
    }, [lightboxIndex]);

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

    // prethodna/sledeća slika u lightbox-u (ništa ako je lightbox zatvoren)
    const handlePrev = useCallback(() => {
        setLightboxIndex((prev) => (prev === null ? prev : prev === 0 ? images.length - 1 : prev - 1));
    }, []);

    const handleNext = useCallback(() => {
        setLightboxIndex((prev) => (prev === null ? prev : prev === images.length - 1 ? 0 : prev + 1));
    }, []);

    useEffect(() => {
        if (lightboxIndex === null) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setLightboxIndex(null);
            if (event.key === "ArrowLeft") handlePrev();
            if (event.key === "ArrowRight") handleNext();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [lightboxIndex, handlePrev, handleNext]);

    return (
        <main className="min-h-screen relative bg-[#FAF7F2] pt-28 pb-16 md:pt-36 md:pb-24 px-4 sm:px-6 lg:px-12 overflow-hidden">

            <div className="absolute top-0 left-0 w-full h-[45vh] bg-gradient-to-b from-[#C28B5A]/90 via-[#D4A373]/40 to-transparent pointer-events-none z-0" />

            <div className="max-w-7xl mx-auto relative z-10">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    <div
                        ref={contentRef}
                        className="lg:col-span-7 flex flex-col justify-center"
                    >
                        {children}
                    </div>

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
                                {clickLabel}
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
                                src={lightboxImages[lightboxIndex]}
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
