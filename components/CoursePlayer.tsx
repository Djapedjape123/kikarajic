"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Info, PlayCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { drivePreviewUrl, driveViewUrl, type Course } from "@/lib/courses";

export default function CoursePlayer({ course }: { course: Course }) {
  const { activeLang } = useLanguage();
  const [activeIdx, setActiveIdx] = useState(0);

  const lesson = course.lessons[activeIdx];
  const hasMultipleLessons = course.lessons.length > 1;

  return (
    <main className="min-h-screen bg-stone-950 pt-28 pb-20 px-4 sm:px-6 lg:px-8 text-stone-200">
      <div className="max-w-6xl mx-auto">

        {/* NASLOV */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="text-xs font-bold tracking-widest text-[#bc1888] mb-3 uppercase">
            {activeLang === "SR" ? "Tvoj kurs" : "Your course"}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white">
            {course.title[activeLang]}
          </h1>
          {hasMultipleLessons && (
            <p className="text-stone-400 font-light mt-3">{lesson.title[activeLang]}</p>
          )}
        </motion.div>

        <div className={hasMultipleLessons ? "grid lg:grid-cols-[1fr_280px] gap-8" : ""}>

          {/* VIDEO */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="p-[1px] rounded-[1.5rem] bg-gradient-to-tr from-[#f09433]/40 via-white/10 to-[#bc1888]/40 shadow-[0_0_60px_rgba(188,24,136,0.15)]">
              <div className="relative aspect-video rounded-[1.5rem] overflow-hidden bg-black">
                <iframe
                  key={lesson.driveFileId}
                  src={drivePreviewUrl(lesson.driveFileId)}
                  title={lesson.title[activeLang]}
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>
            </div>

            {/* PLAN B: Safari/iOS blokira Google kolačiće u iframe-u */}
            <div className="mt-6 flex justify-center">
              <a
                href={driveViewUrl(lesson.driveFileId)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 text-white text-sm sm:text-base font-medium hover:bg-white/20 transition-colors text-center"
              >
                <ExternalLink size={18} className="shrink-0" />
                {activeLang === "SR"
                  ? "Video se ne učitava? Klikni ovde da otvoriš direktno u Google Drive-u"
                  : "Video not loading? Click here to open it directly in Google Drive"}
              </a>
            </div>

            {/* UPUTSTVO */}
            <div className="mt-6 max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-3">
              <Info size={18} className="text-[#f09433] shrink-0 mt-0.5" />
              <p className="text-sm text-stone-400 font-light leading-relaxed">
                {activeLang === "SR"
                  ? "Video je dostupan samo za Google nalog koji ste uneli u prijavi. Ako vidite poruku „Potreban je pristup“, prijavite se tim nalogom u Google-u i osvežite stranicu."
                  : "The video is available only to the Google account you entered when enrolling. If you see “You need access”, sign in to Google with that account and refresh the page."}
              </p>
            </div>
          </motion.div>

          {/* LISTA LEKCIJA (samo ako ih ima više) */}
          {hasMultipleLessons && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/5 border border-white/10 rounded-[1.5rem] p-4 h-fit"
            >
              <h2 className="text-white font-medium px-2 mb-3">
                {activeLang === "SR" ? "Lekcije" : "Lessons"}
              </h2>
              <div className="flex flex-col gap-1">
                {course.lessons.map((item, idx) => (
                  <button
                    key={item.driveFileId}
                    onClick={() => setActiveIdx(idx)}
                    className={`flex items-center gap-3 text-left px-3 py-3 rounded-xl text-sm transition-colors ${
                      idx === activeIdx
                        ? "bg-gradient-to-tr from-[#f09433] to-[#bc1888] text-white"
                        : "text-stone-400 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <PlayCircle size={16} className="shrink-0" />
                    <span>{idx + 1}. {item.title[activeLang]}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}
