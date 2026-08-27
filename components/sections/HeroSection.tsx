"use client";

import Link from "next/link";
import { Luxurious_Script } from "next/font/google";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

const luxurious = Luxurious_Script({
    weight: "400",
    subsets: ["latin"],
});

export default function HeroSection() {
    const { t } = useLanguage();

    return (
        <section className="relative w-full min-h-[85svh] md:h-screen flex items-center justify-center overflow-hidden bg-stone-900">

            {/* 1. VIDEO POZADINA */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover object-center z-0"
            >
                <source src="https://res.cloudinary.com/duomot4hp/video/upload/v1787777905/WhatsApp_Video_2026-08-26_at_22.17.02_ku4hkc.mp4" type="video/mp4" />
                Vaš pretraživač ne podržava video format.
            </video>

            {/* 2. OVERLAY (Zatamnjenje) */}
            <div className="absolute inset-0 bg-black/45 z-10" />

            {/* Pulsirajući svetlosni efekat iza naslova */}
            <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-gradient-to-tr from-[#bc1888]/20 to-[#f09433]/20 rounded-full blur-3xl z-10 pointer-events-none"
            />

            {/* 3. SADRŽAJ (Tekst i dugmići sa Framer Motion animacijama) */}
            <div className="relative z-20 flex flex-col items-center text-center px-4 mt-16 md:mt-20 max-w-4xl">

                {/* Naslov */}
                <h1 className="text-white flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 mb-4">
                    <motion.span
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 1, delay: 2.1, ease: [0.16, 1, 0.3, 1] }}
                        className={`${luxurious.className} text-6xl md:text-8xl lg:text-9xl drop-shadow-lg`}
                    >
                        Kika Rajić
                    </motion.span>

                    <motion.span
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 2.3, ease: [0.16, 1, 0.3, 1] }}
                        className="text-2xl md:text-4xl font-light tracking-[0.35em] uppercase mt-2 md:mt-6 text-stone-200 drop-shadow-md"
                    >
                        Studio
                    </motion.span>
                </h1>

                {/* Tekst ispod naslova */}
                <motion.p
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 2.5, ease: "easeOut" }}
                    className="text-stone-200 text-sm md:text-lg max-w-xl mb-10 font-light drop-shadow-sm px-2 leading-relaxed"
                >
                    {t.hero.subtitle}
                </motion.p>

                {/* Dugmići */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 2.7, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center"
                >
                    {/* Instagram Dugme */}
                    <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        href="https://instagram.com/tvoj_link"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-[240px] sm:w-auto flex items-center justify-center px-6 py-2.5 sm:px-8 sm:py-3 rounded-full text-white text-sm sm:text-base font-medium shadow-xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] transition-shadow hover:shadow-[#bc1888]/30"
                    >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                        </svg>
                        {t.hero.bookBtn}
                    </motion.a>

                    {/* WorkShop Dugme */}
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                        <Link
                            href="/workshop"
                            className="w-[240px] sm:w-auto flex items-center justify-center px-6 py-2.5 sm:px-8 sm:py-3 rounded-full text-white text-sm sm:text-base font-medium border border-white/40 bg-black/30 backdrop-blur-md transition-all hover:bg-white hover:text-stone-900 shadow-xl"
                        >
                            {t.hero.workshopBtn}
                        </Link>
                    </motion.div>
                </motion.div>

            </div>

            {/* 4. ANIMIRANI SCROLL DOWN INDIKATOR */}
            {/* 4. ANIMIRANI SCROLL DOWN INDIKATOR (Klikabilna strelica) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.2, duration: 1 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
            >
                <a
                    href="#statistike"
                    onClick={(e) => {
                        e.preventDefault();
                        // Ova funkcija pravi onaj glatki scroll efekat
                        document.getElementById("statistike")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="flex flex-col items-center justify-center p-2 group cursor-pointer"
                    aria-label="Skroluj na dole"
                >
                    <motion.svg
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-8 h-8 text-white/60 group-hover:text-white transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        {/* Elegantna dupla strelica */}
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
                    </motion.svg>
                </a>

            </motion.div>

        </section >
    );
}