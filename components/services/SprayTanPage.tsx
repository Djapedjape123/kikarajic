"use client";

/* eslint-disable @next/next/no-img-element -- slike optimizuje Cloudinary (lib/cloudinary.ts), isto kao na ostatku sajta */

import { motion, MotionConfig } from "framer-motion";
import { Baby, CalendarCheck, Check, Timer, Users, X, type LucideIcon } from "lucide-react";
import { FinalCta, NumberedSteps, PhotoFrame, SectionHeading, ServiceHero } from "@/components/services/ServiceBlocks";
import ServiceGallery from "@/components/services/ServiceGallery";
import { useLanguage } from "@/context/LanguageContext";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary";
import {
  SPRAY_TAN,
  SPRAY_TAN_BOOKING_URL,
  SPRAY_TAN_IMAGES,
  type FactIcon,
  type SprayTanContent,
} from "@/lib/services/sprayTan";

const FACT_ICONS: Record<FactIcon, LucideIcon> = {
  calendar: CalendarCheck,
  timer: Timer,
  users: Users,
  baby: Baby,
};

export default function SprayTanPage() {
  const { activeLang, t } = useLanguage();
  const c = SPRAY_TAN[activeLang];

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
          bookUrl={SPRAY_TAN_BOOKING_URL}
          bookLabel={c.bookBtn}
          scrollLabel={c.prepBtn}
          scrollTo="priprema"
        >
          <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-stone-800 shadow-2xl ring-1 ring-white/10">
            <img
              src={optimizeCloudinaryUrl(SPRAY_TAN_IMAGES.hero, 1000)}
              alt={c.alt.hero}
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
        </ServiceHero>
        <Facts c={c} />
        <Prep c={c} />
        <Care c={c} />

        <section className="bg-[#FAF7F2] px-4 py-20 sm:px-6 md:py-28 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <SectionHeading badge={t.nav.gallery} title={c.galleryTitle} align="center" />
            <div className="mt-12">
              <ServiceGallery images={SPRAY_TAN_IMAGES.gallery.map((src, i) => ({ src, alt: c.alt.gallery[i] }))} />
            </div>
          </div>
        </section>

        <FinalCta title={c.finalCta.title} desc={c.finalCta.desc} btn={c.finalCta.btn} href={SPRAY_TAN_BOOKING_URL} />
      </main>
    </MotionConfig>
  );
}

/* ---------- 2. DOBRO JE ZNATI (kada, koliko traje, za koga, trudnice) ---------- */

function Facts({ c }: { c: SprayTanContent }) {
  return (
    <section className="px-4 py-20 sm:px-6 md:py-28 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <SectionHeading badge={c.facts.badge} title={c.facts.title} align="center" />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          {c.facts.items.map((item, i) => {
            const Icon = FACT_ICONS[item.icon];
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
                <h3 className="mb-3 font-serif text-xl text-stone-800 sm:text-2xl">{item.question}</h3>
                <p className="font-light leading-relaxed text-stone-600">{item.answer}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- 3. PRE TRETMANA (#priprema): slika levo, numerisane stavke desno ---------- */

function Prep({ c }: { c: SprayTanContent }) {
  return (
    <section id="priprema" className="scroll-mt-28 bg-[#FAF7F2] px-4 py-20 sm:px-6 md:py-28 lg:px-12">
      {/* na telefonu: naslov, slika, pa stavke; na desktopu je slika levo i lepi se uz skrol */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-12">
        <div className="lg:col-span-7 lg:col-start-6 lg:row-start-1">
          <SectionHeading badge={c.prep.badge} title={c.prep.title} />
        </div>

        <div className="lg:col-span-5 lg:col-start-1 lg:row-span-2 lg:row-start-1">
          <PhotoFrame
            src={optimizeCloudinaryUrl(SPRAY_TAN_IMAGES.prep, 900)}
            alt={c.alt.prep}
            borderClass="border-white"
          />
        </div>

        <NumberedSteps steps={c.prep.steps} className="lg:col-span-7 lg:col-start-6 lg:row-start-2" />
      </div>
    </section>
  );
}

/* ---------- 4. POSLE TRETMANA (#nega): bela traka, stavke levo, slika desno ---------- */

function Care({ c }: { c: SprayTanContent }) {
  return (
    <section id="nega" className="scroll-mt-28 border-y border-stone-200/50 bg-white px-4 py-20 sm:px-6 md:py-28 lg:px-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-12">
        <div className="lg:col-span-7 lg:col-start-1 lg:row-start-1">
          <SectionHeading badge={c.care.badge} title={c.care.title} />
        </div>

        <div className="lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1">
          <PhotoFrame
            src={optimizeCloudinaryUrl(SPRAY_TAN_IMAGES.care, 900)}
            alt={c.alt.care}
            borderClass="border-[#FAF7F2]"
          />
        </div>

        <ul role="list" className="space-y-8 lg:col-span-7 lg:col-start-1 lg:row-start-2">
          {c.care.steps.map((step, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              className="flex gap-4 sm:gap-5"
            >
              {/* Check = uradite, X = izbegavajte */}
              <span
                aria-hidden="true"
                className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                  step.avoid ? "bg-rose-50 text-rose-500" : "bg-[#bc1888]/10 text-[#bc1888]"
                }`}
              >
                {step.avoid ? <X size={20} /> : <Check size={20} />}
              </span>
              <div className="flex-1 border-b border-stone-200 pb-8">
                <h3 className="mb-2 font-serif text-xl text-stone-800 sm:text-2xl">{step.title}</h3>
                <p className="font-light leading-relaxed text-stone-600">{step.desc}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
