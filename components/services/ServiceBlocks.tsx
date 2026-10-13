"use client";

/* eslint-disable @next/next/no-img-element -- slike optimizuje Cloudinary (lib/cloudinary.ts), isto kao na ostatku sajta */

// Delovi koje dele stranice usluga (Sprej ten, Svečane frizure, Šminka), da dizajn ostane isti na svima.

import type { MouseEvent, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { luxurious } from "@/lib/fonts";
import { isIntroSeen } from "@/lib/intro";

export const INSTAGRAM_BUTTON =
  "inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] px-8 py-4 font-medium text-white shadow-2xl transition-all hover:scale-105 hover:shadow-[#bc1888]/40";

export function SectionHeading({ badge, title, align = "left" }: { badge: string; title: string; align?: "left" | "center" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={align === "center" ? "text-center" : ""}
    >
      <span className="mb-3 block text-xs font-bold uppercase tracking-[0.25em] text-[#bc1888] sm:text-sm">{badge}</span>
      <h2 className="font-serif text-3xl leading-tight text-stone-800 sm:text-4xl md:text-5xl">{title}</h2>
    </motion.div>
  );
}

// slika u ramu kao na O meni stranici; "sticky" ide na omotač, da se ne meša sa animacijom slike
export function PhotoFrame({ src, alt, borderClass }: { src: string; alt: string; borderClass: string }) {
  return (
    <div className="lg:sticky lg:top-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`relative mx-auto aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-3xl border-[8px] bg-stone-200 shadow-2xl lg:max-w-none ${borderClass}`}
      >
        <img src={src} alt={alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
      </motion.div>
    </div>
  );
}

/* ---------- HERO (tamni): tekst levo, slika ili kolaž desno (children) ---------- */

export function ServiceHero({
  badge,
  title,
  accent,
  subtitle,
  bookUrl,
  bookLabel,
  scrollLabel,
  scrollTo,
  mediaClassName = "max-w-[420px]",
  children,
}: {
  badge: string;
  title: string;
  accent: string; // reč u skriptnom fontu, ispod naslova
  subtitle: string;
  bookUrl: string;
  bookLabel: string;
  scrollLabel: string;
  scrollTo: string; // id sekcije do koje vodi drugo dugme
  mediaClassName?: string; // širina desne strane
  children: ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  // animacije čekaju loader (~1.5s); ako je loader već viđen u ovoj poseti, kreću odmah (isto kao HeroSection)
  const introDelay = isIntroSeen() ? 0 : 1.5;

  const reveal = (order: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay: introDelay + order * 0.12, ease: "easeOut" as const },
  });

  // glatko skrolovanje do sekcije (scroll-mt-28 na sekciji ostavlja mesto za navbar)
  const scrollToSection = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    document.getElementById(scrollTo)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  };

  return (
    <section className="relative overflow-hidden rounded-b-[2.5rem] bg-stone-900 pb-16 pt-28 md:rounded-b-[4rem] md:pb-24 md:pt-36">
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-10 h-[420px] w-[420px] rounded-full bg-[#C28B5A]/15 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 right-0 h-[480px] w-[480px] rounded-full bg-[#bc1888]/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-12">
        <div className="lg:col-span-7">
          <motion.span
            {...reveal(0)}
            className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#D4A373] sm:text-sm"
          >
            <Sparkles size={14} aria-hidden="true" />
            {badge}
          </motion.span>

          <motion.h1 {...reveal(1)} className="font-serif text-5xl leading-[1.05] text-white sm:text-6xl md:text-7xl">
            {title}{" "}
            <span className={`${luxurious.className} -mt-1 block text-6xl font-normal text-[#D4A373] sm:text-7xl md:text-8xl`}>
              {accent}
            </span>
          </motion.h1>

          <motion.p {...reveal(2)} className="mt-6 max-w-xl text-pretty text-base font-light leading-relaxed text-stone-300 sm:text-lg">
            {subtitle}
          </motion.p>

          <motion.div {...reveal(3)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <a href={bookUrl} target="_blank" rel="noopener noreferrer" className={INSTAGRAM_BUTTON}>
              <FaInstagram size={20} />
              {bookLabel}
            </a>
            <a
              href={`#${scrollTo}`}
              onClick={scrollToSection}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-4 font-medium text-white backdrop-blur-md transition-all hover:bg-white hover:text-stone-900"
            >
              {scrollLabel}
              <ChevronDown size={18} aria-hidden="true" />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: introDelay + 0.2, ease: "easeOut" }}
          className={`relative mx-auto w-full lg:col-span-5 lg:ml-auto lg:mr-0 ${mediaClassName}`}
        >
          {/* bronzani sjaj iza slike, polako "diše" (kao svetlo u HeroSection) */}
          <motion.div
            aria-hidden="true"
            animate={reduceMotion ? { opacity: 0.4 } : { opacity: [0.3, 0.55, 0.3], scale: [1, 1.06, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -inset-5 rounded-[3rem] bg-gradient-to-tr from-[#C28B5A] to-[#bc1888] blur-3xl"
          />
          {children}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- NUMERISANE STAVKE (01, 02…) ---------- */

export function NumberedSteps({ steps, className = "" }: { steps: { title: string; desc: string }[]; className?: string }) {
  return (
    <ol role="list" className={`space-y-8 ${className}`}>
      {steps.map((step, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="flex gap-5 sm:gap-6"
        >
          {/* fiksna širina da tekst svih stavki počinje na istom mestu; sans jer serif cifre (old-style) liče na "o1" */}
          <span
            aria-hidden="true"
            className="w-10 shrink-0 bg-gradient-to-tr from-[#f09433] to-[#bc1888] bg-clip-text font-sans text-3xl leading-none text-transparent sm:w-16 sm:text-5xl"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="flex-1 border-b border-stone-200 pb-8">
            <h3 className="mb-2 font-serif text-xl text-stone-800 sm:text-2xl">{step.title}</h3>
            <p className="font-light leading-relaxed text-stone-600">{step.desc}</p>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}

/* ---------- ZAVRŠNI CTA (isti blok kao na edukacijama) ---------- */

export function FinalCta({ title, desc, btn, href }: { title: string; desc: string; btn: string; href: string }) {
  return (
    <section className="relative overflow-hidden px-4 py-24 sm:px-6">
      <div className="absolute inset-0 bg-stone-900" />
      <div className="absolute inset-0 bg-gradient-to-tr from-[#f09433]/20 via-[#dc2743]/20 to-[#bc1888]/20 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative z-10 mx-auto max-w-3xl text-center"
      >
        <Sparkles size={28} aria-hidden="true" className="mx-auto mb-6 text-[#D4A373]" />
        <h2 className="mb-6 font-serif text-3xl text-white sm:text-5xl">{title}</h2>
        <p className="mb-10 text-pretty text-lg font-light leading-relaxed text-stone-300 sm:text-xl">{desc}</p>
        <a href={href} target="_blank" rel="noopener noreferrer" className={`${INSTAGRAM_BUTTON} text-lg`}>
          <FaInstagram size={24} />
          {btn}
        </a>
      </motion.div>
    </section>
  );
}
