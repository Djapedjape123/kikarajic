"use client";

/* eslint-disable @next/next/no-img-element -- slike optimizuje Cloudinary (lib/cloudinary.ts), isto kao na ostatku sajta */

import type { MouseEvent } from "react";
import { motion, MotionConfig } from "framer-motion";
import {
  CalendarX,
  Camera,
  Clock,
  Crown,
  Gem,
  Maximize2,
  RefreshCw,
  Sparkles,
  Timer,
  Undo2,
  type LucideIcon,
} from "lucide-react";
import { FinalCta, NumberedSteps, SectionHeading, ServiceHero } from "@/components/services/ServiceBlocks";
import ServiceLightbox, { useLightbox, type LightboxImage } from "@/components/services/ServiceLightbox";
import { useLanguage } from "@/context/LanguageContext";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary";
import {
  HAIRSTYLES,
  HAIRSTYLES_BOOKING_URL,
  HAIRSTYLE_IMAGES,
  type HairstylesContent,
  type InfoIcon,
} from "@/lib/services/hairstyles";

const INFO_ICONS: Record<InfoIcon, LucideIcon> = {
  gem: Gem,
  camera: Camera,
  timer: Timer,
  crown: Crown,
  clock: Clock,
  calendarX: CalendarX,
  refresh: RefreshCw,
  undo: Undo2,
};

export default function HairstylesPage() {
  const { activeLang, t } = useLanguage();
  const c = HAIRSTYLES[activeLang];
  const lightbox = useLightbox();
  const styles: LightboxImage[] = HAIRSTYLE_IMAGES.map((src, i) => ({
    src,
    alt: c.styles[i].alt,
    caption: c.styles[i].name,
  }));

  return (
    // reducedMotion="user": animacije se gase korisnicima koji su ih isključili u telefonu/računaru
    <MotionConfig reducedMotion="user">
      {/* bela pozadina: ista boja kao sekcija ispod hero-a, da zaobljeni uglovi hero-a ostanu čisti */}
      <main className="bg-white">
        <ServiceHero
          badge={t.nav.services}
          title={c.title}
          accent={c.accent}
          subtitle={c.subtitle}
          bookUrl={HAIRSTYLES_BOOKING_URL}
          bookLabel={c.bookBtn}
          scrollLabel={c.prepBtn}
          scrollTo="priprema"
          mediaClassName="max-w-[480px]"
        >
          <Collage styles={styles} onOpen={lightbox.openAt} />
        </ServiceHero>
        <Info c={c} />
        <Prep c={c} />
        <Rules c={c} />
        <FinalCta title={c.finalCta.title} desc={c.finalCta.desc} btn={c.finalCta.btn} href={HAIRSTYLES_BOOKING_URL} />

        {/* van hero-a: hero ima animirani transform, a on bi "fixed" sloj lightbox-a zatvorio u sebe */}
        <ServiceLightbox images={styles} lightbox={lightbox} />
      </main>
    </MotionConfig>
  );
}

/* ---------- 1. KOLAŽ U HERO-U: 4 vrste frizura, klik otvara lightbox ---------- */

function Collage({
  styles,
  onOpen,
}: {
  styles: LightboxImage[];
  onOpen: (index: number, event: MouseEvent<HTMLElement>) => void;
}) {
  return (
    // desna kolona je spuštena preko translate (ne menja visinu redova), a pb ostavlja mesto za nju
    <ul role="list" className="relative grid grid-cols-2 gap-3 pb-8 sm:gap-4 sm:pb-12">
      {styles.map((style, i) => (
        <li key={i} className={i % 2 === 1 ? "translate-y-8 sm:translate-y-12" : ""}>
          <button
            type="button"
            onClick={(event) => onOpen(i, event)}
            // na desktopu su pločice blago nakrivljene i ispravljaju se na hover
            className={`group relative block aspect-[3/4] w-full cursor-zoom-in overflow-hidden rounded-[1.5rem] bg-stone-800 shadow-2xl ring-1 ring-white/10 transition-transform duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A373] lg:hover:rotate-0 ${
              i % 2 === 1 ? "lg:rotate-2" : "lg:-rotate-2"
            }`}
          >
            <img
              src={optimizeCloudinaryUrl(style.src, 600)}
              alt={style.alt}
              fetchPriority={i < 2 ? "high" : undefined}
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* ime frizure; aria-hidden jer ime slike za čitače ekrana već daje alt */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent px-3 pb-3 pt-12 text-left font-serif text-sm leading-snug text-white sm:px-4 sm:pb-4 sm:text-base"
            >
              {style.caption}
            </span>
            <span
              aria-hidden="true"
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-colors group-hover:bg-[#bc1888]"
            >
              <Maximize2 size={14} />
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}

// Kikine rečenice iz jedne tačke teksta, sa gradijent tačkicom
function PointList({ points }: { points: string[] }) {
  return (
    <ul role="list" className="space-y-3">
      {points.map((point, i) => (
        <li key={i} className="flex gap-3 font-light leading-relaxed text-stone-600">
          {/* mt-2.5: tačkica u visini prvog reda */}
          <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-tr from-[#f09433] to-[#bc1888]" />
          <span>{point}</span>
        </li>
      ))}
    </ul>
  );
}

/* ---------- 2. PRE ZAKAZIVANJA (usluge, odabir, trajanje, zahtevne frizure) ---------- */

function Info({ c }: { c: HairstylesContent }) {
  return (
    <section className="px-4 py-20 sm:px-6 md:py-28 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <SectionHeading badge={c.info.badge} title={c.info.title} align="center" />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto mt-5 max-w-2xl text-pretty text-center text-base font-light leading-relaxed text-stone-600 sm:text-lg"
        >
          {c.info.intro}
        </motion.p>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          {c.info.items.map((item, i) => {
            const Icon = INFO_ICONS[item.icon];
            return (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: (i % 2) * 0.12 }}
                className="rounded-3xl border border-stone-200/70 bg-[#FAF7F2] p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-[#f09433]/20 to-[#bc1888]/20 text-[#bc1888]">
                  <Icon size={22} aria-hidden="true" />
                </div>
                <h3 className="mb-4 font-serif text-xl text-stone-800 sm:text-2xl">{item.title}</h3>
                <PointList points={item.points} />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- 3. PRIPREMA KOSE (#priprema): naslov levo, numerisane stavke desno ---------- */

function Prep({ c }: { c: HairstylesContent }) {
  return (
    <section id="priprema" className="scroll-mt-28 bg-[#FAF7F2] px-4 py-20 sm:px-6 md:py-28 lg:px-12">
      {/* nema slike u ramu kao na Sprej tenu, pa se na desktopu uz skrol lepi naslov */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading badge={c.prep.badge} title={c.prep.title} />
          </div>
        </div>

        <NumberedSteps steps={c.prep.steps} className="lg:col-span-7" />
      </div>
    </section>
  );
}

/* ---------- 4. PRAVILA TERMINA: bela traka, stavke levo, kartica "Ukratko" desno ---------- */

function Rules({ c }: { c: HairstylesContent }) {
  return (
    <section className="border-y border-stone-200/50 bg-white px-4 py-20 sm:px-6 md:py-28 lg:px-12">
      {/* na telefonu: naslov, "Ukratko", pa stavke; na desktopu se "Ukratko" lepi uz skrol desno */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-12">
        <div className="lg:col-span-7 lg:col-start-1 lg:row-start-1">
          <SectionHeading badge={c.rules.badge} title={c.rules.title} />
        </div>

        <div className="lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1">
          <Summary summary={c.rules.summary} />
        </div>

        <ul role="list" className="space-y-8 lg:col-span-7 lg:col-start-1 lg:row-start-2">
          {c.rules.items.map((item, i) => {
            const Icon = INFO_ICONS[item.icon];
            return (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6 }}
                className="flex gap-4 sm:gap-5"
              >
                <span
                  aria-hidden="true"
                  className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#bc1888]/10 text-[#bc1888]"
                >
                  <Icon size={20} />
                </span>
                <div className="flex-1 border-b border-stone-200 pb-8">
                  <h3 className="mb-3 font-serif text-xl text-stone-800 sm:text-2xl">{item.title}</h3>
                  <PointList points={item.points} />
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

// tamna kartica sa ključnim brojevima iz pravila (umesto slike u ramu)
function Summary({ summary }: { summary: HairstylesContent["rules"]["summary"] }) {
  return (
    <div className="lg:sticky lg:top-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative overflow-hidden rounded-3xl bg-stone-900 p-7 shadow-2xl sm:p-10"
      >
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#bc1888]/25 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-[#C28B5A]/25 blur-3xl" />

        <h3 className="relative mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#D4A373] sm:text-sm">
          <Sparkles size={14} aria-hidden="true" />
          {summary.title}
        </h3>

        <ul role="list" className="relative grid grid-cols-2 gap-x-5 gap-y-8 sm:gap-x-8">
          {summary.items.map((item, i) => (
            <li key={i} className="border-t border-white/10 pt-5">
              {/* sans jer serif cifre (old-style) liče na "o1", isto kao numerisane stavke */}
              <span className="block bg-gradient-to-tr from-[#f09433] to-[#bc1888] bg-clip-text font-sans text-4xl leading-none text-transparent sm:text-5xl">
                {item.value}
              </span>
              <span className="mt-3 block text-sm font-light leading-snug text-stone-300 sm:text-base">{item.label}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
