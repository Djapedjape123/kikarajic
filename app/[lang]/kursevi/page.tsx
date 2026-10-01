"use client";

import React, { useState } from 'react';
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaPlayCircle, FaInfoCircle, FaCheck } from "react-icons/fa";
// Ako imaš svoju formu negde sačuvanu, importuj je ovde:
import CourseSignupForm from "@/components/CourseSignupForm";

// 1. Baza kurseva (Katalog)
// Ovde dodaješ nove kurseve kada ih Kika snimi. 
// "courseLang" nam služi za onaj tvoj padajući meni (filter).
const COURSES = [
  {
    id: 1,
    courseLang: "SR",
    image: "https://res.cloudinary.com/duomot4hp/image/upload/f_auto,q_auto,w_800/v1788807802/IMG_0606.JPG_jvxare.jpg",
    price: "9.900 RSD",
    title: {
      SR: "Masterclass Šminkanja (Srpski jezik)",
      EN: "Makeup Masterclass (Serbian Voiceover)"
    },
    shortDesc: {
      SR: "Naučite najtraženije salonske tehnike šminkanja kroz 5 sati video materijala.",
      EN: "Learn the most requested salon makeup techniques through 5 hours of video content."
    },
    fullDesc: {
      SR: "Ovaj kurs pokriva sve od pripreme kože do naprednih tehnika poput Soft Glam i Bridal makeup-a. Naučićete kako da prilagodite šminku različitim tipovima kože i oblicima lica.",
      EN: "This course covers everything from skin prep to advanced techniques like Soft Glam and Bridal makeup. Learn how to adapt makeup to different skin types and face shapes."
    },
    includes: [
      "5+ sati video materijala",
      "Doživotni pristup preko Google Drive-a",
      "Lista preporučenih proizvoda",
      "Sertifikat o završenom kursu"
    ]
  },
  {
    id: 2,
    courseLang: "EN",
    image: "https://res.cloudinary.com/duomot4hp/image/upload/f_auto,q_auto,w_800/v1788807736/IMG_5148.JPG_beawel.jpg",
    price: "€85",
    title: {
      SR: "Masterclass Šminkanja (Engleski jezik)",
      EN: "Makeup Masterclass (English Voiceover)"
    },
    shortDesc: {
      SR: "Isti vrhunski materijal, prilagođen za strano tržište sa engleskim glasom (Voiceover).",
      EN: "The same premium content, adapted for the international market with English voiceover."
    },
    fullDesc: {
      SR: "Edukacija na engleskom jeziku idealna za klijente iz inostranstva. Prolazimo sve korake od pripreme lica do završnih detalja.",
      EN: "Training in English, ideal for international clients. We cover all steps from face preparation to finishing details."
    },
    includes: [
      "5+ hours of video content",
      "Lifetime access via Google Drive",
      "Recommended product list",
      "Certificate of completion"
    ]
  }
];

export default function KurseviPage() {
  const { activeLang } = useLanguage();
  
  // State za Filter (Padajući meni / Tabovi)
  const [filterLang, setFilterLang] = useState<"ALL" | "SR" | "EN">("ALL");
  
  // State za Modale
  // Čuvamo ceo objekat kursa na koji je kliknuto kako bismo znali šta da prikažemo
  const [infoModalCourse, setInfoModalCourse] = useState<any | null>(null);
  const [signupModalCourse, setSignupModalCourse] = useState<any | null>(null);

  // Filtriramo kurseve na osnovu izbora
  const filteredCourses = COURSES.filter(course => 
    filterLang === "ALL" ? true : course.courseLang === filterLang
  );

  return (
    <div className="min-h-screen bg-stone-900 pt-28 pb-20 px-4 sm:px-6 lg:px-8 text-stone-200">
      
      {/* HEADER I FILTER */}
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white mb-8"
        >
          {activeLang === "SR" ? "Online Edukacije" : "Online Courses"}
        </motion.h1>

        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex bg-white/5 border border-white/10 p-1.5 rounded-full"
        >
          {["ALL", "SR", "EN"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterLang(tab as any)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                filterLang === tab 
                  ? "bg-gradient-to-tr from-[#f09433] to-[#bc1888] text-white shadow-lg" 
                  : "text-stone-400 hover:text-white"
              }`}
            >
              {tab === "ALL" && (activeLang === "SR" ? "Svi Kursevi" : "All Courses")}
              {tab === "SR" && (activeLang === "SR" ? "Srpski Glas" : "Serbian Voice")}
              {tab === "EN" && (activeLang === "SR" ? "Engleski Glas" : "English Voice")}
            </button>
          ))}
        </motion.div>
      </div>

      {/* GRID (KARTICE) */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredCourses.map((course, idx) => (
            <motion.div
              key={course.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="group bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden flex flex-col hover:border-white/20 transition-colors"
            >
              {/* Slika Kartice */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title[activeLang]} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-medium border border-white/20">
                  {course.price}
                </div>
              </div>

              {/* Tekst Kartice */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="text-xs font-bold tracking-widest text-[#bc1888] mb-2 uppercase">
                  {course.courseLang === "SR" ? "Srpski jezik" : "English Voiceover"}
                </div>
                <h3 className="text-2xl font-serif text-white mb-3">
                  {course.title[activeLang]}
                </h3>
                <p className="text-stone-400 font-light text-sm mb-8 flex-grow">
                  {course.shortDesc[activeLang]}
                </p>

                {/* Dugmići */}
                <div className="flex gap-3 mt-auto">
                  <button 
                    onClick={() => setInfoModalCourse(course)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-colors"
                  >
                    <FaInfoCircle />
                    {activeLang === "SR" ? "Detaljnije" : "Details"}
                  </button>
                  <button 
                    onClick={() => setSignupModalCourse(course)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-tr from-[#f09433] to-[#bc1888] text-white font-medium hover:shadow-[0_0_20px_rgba(188,24,136,0.4)] transition-all"
                  >
                    <FaPlayCircle />
                    {activeLang === "SR" ? "Prijavi se" : "Enroll"}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ========================================= */}
      {/* MODAL 1: INFO O KURSU */}
      {/* ========================================= */}
      <AnimatePresence>
        {infoModalCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
            {/* Zatamnjena pozadina klikom na koju se modal zatvara */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setInfoModalCourse(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            {/* Sadržaj modala */}
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-stone-900 border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Dugme za zatvaranje */}
              <button 
                onClick={() => setInfoModalCourse(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/40 rounded-full flex items-center justify-center text-white hover:bg-[#bc1888] transition-colors"
              >
                <FaTimes />
              </button>

              <div className="overflow-y-auto p-8 custom-scrollbar">
                <h2 className="text-3xl font-serif text-white mb-2 pr-10">
                  {infoModalCourse.title[activeLang]}
                </h2>
                <div className="text-[#bc1888] font-medium mb-6">
                  {activeLang === "SR" ? "Cena:" : "Price:"} {infoModalCourse.price}
                </div>
                
                <p className="text-stone-300 font-light leading-relaxed mb-8">
                  {infoModalCourse.fullDesc[activeLang]}
                </p>

                <h4 className="text-lg font-medium text-white mb-4">
                  {activeLang === "SR" ? "Šta je uključeno:" : "What's included:"}
                </h4>
                <ul className="space-y-3 mb-8">
                  {infoModalCourse.includes.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-3 text-stone-400 font-light">
                      <FaCheck className="text-[#f09433]" size={14} />
                      {item}
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => {
                    setSignupModalCourse(infoModalCourse); // Otvara formu
                    setInfoModalCourse(null); // Zatvara info modal
                  }}
                  className="w-full py-4 rounded-xl bg-gradient-to-tr from-[#f09433] to-[#bc1888] text-white font-medium text-lg hover:shadow-lg transition-all"
                >
                  {activeLang === "SR" ? "Zakaži i plati odmah" : "Enroll and pay now"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================= */}
      {/* MODAL 2: PRIJAVA (FORMA) */}
      {/* ========================================= */}
      <AnimatePresence>
        {signupModalCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSignupModalCourse(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="relative w-full max-w-xl bg-stone-900 border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden max-h-[95vh] flex flex-col"
            >
              <button 
                onClick={() => setSignupModalCourse(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-[#bc1888] transition-colors"
              >
                <FaTimes />
              </button>

              <div className="overflow-y-auto p-8">
                <div className="mb-6 border-b border-white/10 pb-6">
                  <h2 className="text-2xl font-serif text-white mb-2">
                    {activeLang === "SR" ? "Prijava za kurs" : "Course Enrollment"}
                  </h2>
                  <p className="text-[#f09433] font-medium">
                    {signupModalCourse.title[activeLang]}
                  </p>
                </div>

                 <CourseSignupForm courseName={signupModalCourse.title[activeLang]} />
                
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}