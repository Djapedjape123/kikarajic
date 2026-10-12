"use client";

/* eslint-disable @next/next/no-img-element -- slike optimizuje Cloudinary (lib/cloudinary.ts), isto kao na ostatku sajta */

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary";
import type { Language } from "@/lib/translations";

type GalleryImage = { src: string; alt: string };

const TILE_WIDTH = 700;
const LIGHTBOX_WIDTH = 1600;

// oznake samo za galeriju (ne idu u translations.ts, to bi bilo u JS-u svake stranice)
const LABELS: Record<Language, { dialog: string; close: string; prev: string; next: string }> = {
  SR: { dialog: "Galerija slika", close: "Zatvori", prev: "Prethodna slika", next: "Sledeća slika" },
  EN: { dialog: "Image gallery", close: "Close", prev: "Previous image", next: "Next image" },
};

// Mreža pločica + lightbox preko celog ekrana. Za ponovno korišćenje na stranicama usluga (Sprej ten, Šminka, Frizure).
export default function ServiceGallery({ images }: { images: GalleryImage[] }) {
  const { activeLang } = useLanguage();
  const labels = LABELS[activeLang];
  const count = images.length;

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isOpen = openIndex !== null;
  // pločica koja je otvorila lightbox - na nju se vraća fokus kad se zatvori
  const triggerRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const showPrev = useCallback(() => setOpenIndex((i) => (i === null ? i : (i - 1 + count) % count)), [count]);
  const showNext = useCallback(() => setOpenIndex((i) => (i === null ? i : (i + 1) % count)), [count]);

  const openAt = (index: number, event: MouseEvent<HTMLElement>) => {
    triggerRef.current = event.currentTarget;
    setOpenIndex(index);
  };

  // tastatura (Esc, strelice), zaključan skrol stranice i fokus dok je lightbox otvoren
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      else if (event.key === "ArrowLeft") showPrev();
      else if (event.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", handleKeyDown);

    // padding nadoknađuje nestali scrollbar, da se stranica ne pomeri
    const bodyStyle = document.body.style;
    const previousOverflow = bodyStyle.getPropertyValue("overflow");
    const previousPaddingRight = bodyStyle.getPropertyValue("padding-right");
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    bodyStyle.setProperty("overflow", "hidden");
    if (scrollbarWidth > 0) bodyStyle.setProperty("padding-right", `${scrollbarWidth}px`);

    closeButtonRef.current?.focus();
    const trigger = triggerRef.current;

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      bodyStyle.setProperty("overflow", previousOverflow);
      bodyStyle.setProperty("padding-right", previousPaddingRight);
      trigger?.focus({ preventScroll: true });
    };
  }, [isOpen, close, showPrev, showNext]);

  // susedne velike slike se učitavaju unapred, da listanje bude bez čekanja
  useEffect(() => {
    if (openIndex === null) return;
    [(openIndex + 1) % count, (openIndex - 1 + count) % count].forEach((i) => {
      const img = new Image();
      img.src = optimizeCloudinaryUrl(images[i].src, LIGHTBOX_WIDTH);
    });
  }, [openIndex, count, images]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {images.map((image, i) => (
          <motion.button
            key={i}
            type="button"
            onClick={(event) => openAt(i, event)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: (i % 4) * 0.1 }}
            // svaka druga pločica je pomerena naniže
            className={`group relative aspect-[3/4] w-full cursor-zoom-in overflow-hidden rounded-3xl bg-stone-200 shadow-md ${
              i % 2 === 1 ? "mt-6 sm:mt-10" : ""
            }`}
          >
            <img
              src={optimizeCloudinaryUrl(image.src, TILE_WIDTH)}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-colors group-hover:bg-[#bc1888]"
            >
              <Maximize2 size={16} />
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={labels.dialog}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            // z-[100]: iznad navbara (z-40), loadera (z-50) i Instagram dugmeta (z-[60])
            className="fixed inset-0 z-[100] select-none bg-black"
          >
            {/* klik na prazno mesto zatvara; slika i dugmad su iznad ovog sloja, pa prevlačenje slike ne može da zatvori lightbox */}
            <button
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              onClick={close}
              className="absolute inset-0 h-full w-full cursor-default"
            />

            <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-4 py-20 sm:px-24">
              <motion.div
                key={openIndex}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={(_, info) => {
                  if (info.offset.x > 80 || info.velocity.x > 500) showPrev();
                  else if (info.offset.x < -80 || info.velocity.x < -500) showNext();
                }}
                // sloj za prevlačenje prati samo sliku, pa je tamna površina oko nje slobodna za klik koji zatvara
                className="pointer-events-auto cursor-grab active:cursor-grabbing"
              >
                <img
                  src={optimizeCloudinaryUrl(images[openIndex].src, LIGHTBOX_WIDTH)}
                  alt={images[openIndex].alt}
                  draggable={false}
                  // underscore = razmak u calc(); bez razmaka oko "-" Tailwind tiho odbaci klasu
                  className="pointer-events-none block max-h-[calc(100svh_-_10rem)] max-w-[calc(100vw_-_2rem)] rounded-2xl object-contain shadow-2xl sm:max-w-[calc(100vw_-_12rem)]"
                />
              </motion.div>
            </div>

            <span className="absolute left-1/2 top-5 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium tabular-nums text-white/80">
              {openIndex + 1} / {count}
            </span>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={close}
              aria-label={labels.close}
              className="absolute right-4 top-4 rounded-full bg-white/10 p-3 text-white/80 transition-colors hover:bg-white/20 hover:text-white sm:right-6 sm:top-6"
            >
              <X size={22} />
            </button>

            <button
              type="button"
              onClick={showPrev}
              aria-label={labels.prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white/80 transition-colors hover:bg-white/20 hover:text-white sm:left-6 sm:p-4"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              type="button"
              onClick={showNext}
              aria-label={labels.next}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white/80 transition-colors hover:bg-white/20 hover:text-white sm:right-6 sm:p-4"
            >
              <ChevronRight size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
