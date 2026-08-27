"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

// Naš custom hook za glatko brojanje
function useCounter(target: number, isActive: boolean, duration = 2000) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isActive) return;
        let start = 0;
        // Malo finije stepovanje za velike brojeve
        const step = target > 1000 ? target / (duration / 30) : target / (duration / 16);

        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [isActive, target, duration]);

    return count;
}

// Podaci bez teksta (tekst povlačimo iz i18n)
const statData = [
    { broj: 10, suffix: "+", key: "yearsWork" },
    { broj: 5, suffix: "", key: "yearsEdu" },
    { broj: 5000, suffix: "+", key: "clients" },
    { broj: 200, suffix: "", key: "students" },
    { broj: 10, suffix: "", key: "masterclasses" },
];

export default function StatsSection() {
    const { t } = useLanguage();
    const ref = useRef(null);
    // once: true znači da se animacija desi samo prvi put kad korisnik skroluje do nje
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    // Varijante za stagger efekat (da ulaze jedan za drugim)
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40, scale: 0.8 },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            // Manji stiffness i veći damping daju sporiji, mekši "spring" efekat
            transition: { type: "spring", stiffness: 60, damping: 18 }
        },
    }as const;;

    return (
        <section className="py-24 bg-[#FAF7F2] relative overflow-hidden">

            {/* Dekorativni pozadinski element za sekciju */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#f09433]/10 to-[#bc1888]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#bc1888]/10 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-7xl mx-auto px-4 relative z-10" ref={ref}>

                {/* Naslov sekcije */}
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: -20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="inline-flex items-center gap-4 text-sm font-semibold text-[#bc1888] uppercase tracking-[0.25em]"
                    >
                        <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#bc1888]" />
                        {t.stats.badge}
                        <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#bc1888]" />
                    </motion.span>
                </div>

                {/* Grid (Mobilni: 3 gore, 2 dole centrirano. Desktop: 5 u nizu) */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                    className="grid grid-cols-6 lg:grid-cols-5 gap-y-12 lg:gap-8"
                >
                    {statData.map((stat, index) => {
                        // Animacija broja (okida se kad je sekcija u view-u)
                        const count = useCounter(stat.broj, isInView, 3500);

                        // Formatiranje za 5000 (da ubaci tačku 5.000)
                        const formattedCount = count >= 1000 ? count.toLocaleString('sr-RS') : count;

                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                // Na mobilnom (grid-cols-6): prva 3 zauzimaju po 2 (2+2+2=6), zadnja 2 zauzimaju po 3 (3+3=6)
                                // Na desktopu (lg:grid-cols-5): svi zauzimaju po 1 (1x5=5)
                                className={`relative flex flex-col items-center text-center ${index < 3 ? "col-span-2 lg:col-span-1" : "col-span-3 lg:col-span-1"
                                    }`}
                            >
                                {/* Apstraktna rotirajuća pozadina (Krem/Roze) */}
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                    className="absolute top-2 w-20 h-20 bg-gradient-to-tr from-[#E8DDD1] to-[#bc1888]/10 rounded-full blur-xl opacity-60 -z-10"
                                />

                                {/* Broj i Suffix */}
                                <div className="flex items-start justify-center gap-0.5 mb-4 text-[#1a1a1a]">
                                    <span className="text-4xl md:text-5xl lg:text-6xl font-bold tabular-nums tracking-tighter drop-shadow-sm">
                                        {formattedCount}
                                    </span>
                                    <span className="text-2xl md:text-3xl font-bold text-[#bc1888] mt-1">
                                        {stat.suffix}
                                    </span>
                                </div>

                                {/* Labela (Prevod) */}
                                <h3 className="text-xs md:text-sm font-semibold text-stone-600 uppercase tracking-wider max-w-[120px] lg:max-w-full">
                                    {/* @ts-ignore - koristimo ključeve iz objekta */}
                                    {t.stats.items[stat.key]}
                                </h3>

                                {/* Kratka ukrasna linija na hover (framer motion) */}
                                <motion.div
                                    whileHover={{ width: 40 }}
                                    className="w-4 h-[2px] bg-gradient-to-r from-[#f09433] to-[#bc1888] mt-4 rounded-full transition-all duration-300"
                                />

                            </motion.div>
                        );
                    })}
                </motion.div>

            </div>
        </section>
    );
}