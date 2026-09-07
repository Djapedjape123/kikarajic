"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { FaInstagram, FaCheck, FaBrush, FaCertificate, FaCamera, FaUserGraduate, FaBullseye } from "react-icons/fa";

// Rečnik za prevod - prilagođen tekstu za Individualno usavršavanje
const t = {
  SR: {
    heroTag: "Individualni Program",
    title: "Individualno usavršavanje",
    subtitle: "Unapredite svoje znanje i savladajte konkretnu tehniku do detalja.",
    cta: "Zakaži svoj termin",
    intro: "Individualno usavršavanje namenjeno je šminkerima i svima koji već imaju iskustvo u šminkanju, a žele da unaprede svoje znanje i savladaju konkretnu tehniku do detalja. Edukacija se održava individualno što omogućava potpunu posvećenost polazniku, prilagođavanje njegovom nivou znanja i detaljan rad na svim segmentima koji zahtevaju dodatnu pažnju.\n\nEdukacija se bazira na savladavanju jedne ili dve tehnike šminkanja po izboru. Tokom rada prolazimo kompletan look i filozofiju koja stoji iza njega, uz korak po korak objašnjenja i individualne savete prilagođene vašem načinu rada.",
    whatYouLearn: "Šta ćete naučiti?",
    techniques: "Fokus na tehniku",
    techniquesList: [
      "Savladavanje jedne ili dve tehnike po izboru",
      "Priprema i izrada besprekornog tena",
      "Detaljna izrada očiju i objašnjenje tehnike",
      "Pravilan izbor i kombinovanje proizvoda",
      "Korekcije prilagođene vašem načinu rada"
    ],
    business: "Kreativa i Biznis",
    businessList: [
      "Pravilan izbor alata i četkica",
      "Fotografisanje modela i pravo osvetljenje",
      "Snimanje sadržaja za društvene mreže",
      "Filozofija iza kreiranja kompletnog look-a",
      "Otvorena Q&A sesija za sve vaše nedoumice"
    ],
    logisticsTitle: "Detalji edukacije",
    logistics: [
      {
        icon: <FaUserGraduate size={20} />,
        title: "1-na-1 Pristup",
        desc: "Potpuna posvećenost vama i prilagođavanje vašem trenutnom nivou znanja."
      },
      {
        icon: <FaBullseye size={20} />,
        title: "Fokusirano učenje",
        desc: "Bazira se isključivo na usavršavanju jedne ili dve tehnike po vašem izboru."
      },
      {
        icon: <FaBrush size={20} />,
        title: "Sve je obezbeđeno",
        desc: "Odgovarajući model i kompletan pribor za rad uključeni su u cenu edukacije."
      },
      {
        icon: <FaCertificate size={20} />,
        title: "Sertifikat i popusti",
        desc: "Po završetku dobijate sertifikat i pravo na posebne popuste kod beauty brendova."
      }
    ],
    galleryTitle: "Deo atmosfere sa usavršavanja",
    finalCtaTitle: "Spremna da usavršiš svoju tehniku?",
    finalCtaDesc: "Individualni rad garantuje potpunu posvećenost tvojim potrebama. Zakaži svoj termin na vreme.",
    finalCtaBtn: "Pošalji poruku na Instagramu"
  },
  EN: {
    heroTag: "Advanced Program",
    title: "Advanced Individual Training",
    subtitle: "Upgrade your skills and master specific makeup techniques down to the smallest detail.",
    cta: "Book your session",
    intro: "Individual advanced training is intended for makeup artists and anyone with prior makeup experience who wants to upgrade their skills and master a specific technique in detail. The one-on-one setup ensures complete dedication, adapting to your knowledge level and focusing closely on segments that need extra attention.\n\nThe training focuses on mastering one or two makeup techniques of your choice. During the session, we cover the complete look and the philosophy behind it, with step-by-step explanations and individual advice tailored to your personal workflow.",
    whatYouLearn: "What will you learn?",
    techniques: "Technique Focus",
    techniquesList: [
      "Mastering one or two techniques of your choice",
      "Flawless complexion preparation and execution",
      "Detailed eye makeup and technique breakdown",
      "Choosing and combining the right products",
      "Corrections tailored to your personal workflow"
    ],
    business: "Creative & Business",
    businessList: [
      "Proper selection of tools and brushes",
      "Model photography and perfect lighting",
      "Filming engaging content for social media",
      "The philosophy behind creating a complete look",
      "Open Q&A session for all your doubts"
    ],
    logisticsTitle: "Training Details",
    logistics: [
      {
        icon: <FaUserGraduate size={20} />,
        title: "1-on-1 Approach",
        desc: "Complete dedication to you, fully adapted to your current skill level."
      },
      {
        icon: <FaBullseye size={20} />,
        title: "Targeted Learning",
        desc: "Based exclusively on perfecting one or two makeup techniques of your choice."
      },
      {
        icon: <FaBrush size={20} />,
        title: "Everything Provided",
        desc: "A suitable model and all necessary tools are included in the course price."
      },
      {
        icon: <FaCertificate size={20} />,
        title: "Certificate & Discounts",
        desc: "Upon completion, you receive a certificate and special brand discounts."
      }
    ],
    galleryTitle: "Atmosphere from our sessions",
    finalCtaTitle: "Ready to perfect your technique?",
    finalCtaDesc: "One-on-one sessions guarantee complete focus on your needs. Book your date now.",
    finalCtaBtn: "Message us on Instagram"
  }
};

export default function IndividualnoUsavrsavanjePage() {
  const { activeLang } = useLanguage();
  const content = activeLang === "SR" ? t.SR : t.EN;

  return (
    <main className="min-h-screen bg-[#FAF7F2]">
      
      {/* 1. HERO SEKCIJA SA DUPLIM SLIKAMA (Mobile vs Desktop) */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          {/* TODO: Ubaci sliku za MALE ekrane (mobilne) */}
          <img 
            src="https://res.cloudinary.com/duomot4hp/image/upload/v1788807720/IMG_1325.JPG_fdj7eh.jpg" 
            alt="Individualno usavršavanje" 
            className="w-full h-full object-cover object-top md:hidden"
          />
          
          {/* TODO: Ubaci sliku za VELIKE ekrane (desktop) */}
          <img 
            src="https://res.cloudinary.com/duomot4hp/image/upload/v1788807802/IMG_0606.JPG_jvxare.jpg" 
            alt="Individualno usavršavanje" 
            className="w-full h-full object-cover object-top hidden md:block"
          />
          
          {/* Tamni overlay za savršenu vidljivost navbara i belog teksta */}
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/80 via-stone-900/50 to-[#FAF7F2]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center mt-16">
          {/* <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block py-1.5 px-4 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-white text-xs sm:text-sm font-medium tracking-widest uppercase mb-6"
          >
            {content.heroTag}
          </motion.span> */}
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-7xl font-serif text-white mb-6 drop-shadow-lg"
          >
            {content.title}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl text-stone-200 font-light mb-10 max-w-2xl mx-auto drop-shadow-md"
          >
            {content.subtitle}
          </motion.p>
          
          <motion.a 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            href="https://ig.me/m/kikarajic" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-white font-medium shadow-2xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] transition-all hover:scale-105 hover:shadow-[#bc1888]/40"
          >
            <FaInstagram size={20} />
            {content.cta}
          </motion.a>
        </div>
      </section>

      {/* 2. UVODNI DEO (Tekst) */}
      <section className="py-20 px-4 sm:px-6 lg:px-12 max-w-4xl mx-auto text-center">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-lg sm:text-xl md:text-2xl text-stone-700 font-light leading-relaxed whitespace-pre-line"
        >
          {content.intro}
        </motion.p>
      </section>

      {/* 3. ŠTA ĆETE NAUČITI? (Kartice: Tehnike i Kreativa) */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-serif text-stone-800 text-center mb-16">
          {content.whatYouLearn}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Kartica 1: Tehnike */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 sm:p-10 shadow-lg border border-stone-100"
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#f09433]/20 to-[#bc1888]/20 flex items-center justify-center text-[#bc1888] mb-6">
              <FaBullseye size={24} />
            </div>
            <h3 className="text-2xl font-serif text-stone-800 mb-6">{content.techniques}</h3>
            <ul className="space-y-4">
              {content.techniquesList.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-stone-600 font-light text-base sm:text-lg">
                  <span className="text-[#bc1888] mt-1 shrink-0"><FaCheck size={14} /></span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Kartica 2: Kreativa i Biznis */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 sm:p-10 shadow-lg border border-stone-100"
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#f09433]/20 to-[#bc1888]/20 flex items-center justify-center text-[#bc1888] mb-6">
              <FaCamera size={24} />
            </div>
            <h3 className="text-2xl font-serif text-stone-800 mb-6">{content.business}</h3>
            <ul className="space-y-4">
              {content.businessList.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-stone-600 font-light text-base sm:text-lg">
                  <span className="text-[#bc1888] mt-1 shrink-0"><FaCheck size={14} /></span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* 4. LOGISTIKA & BENEFITI */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 bg-white border-y border-stone-200/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-serif text-stone-800 text-center mb-12">
            {content.logisticsTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.logistics.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 mx-auto rounded-full bg-stone-100 text-stone-600 flex items-center justify-center mb-4 transition-transform hover:scale-110 hover:text-[#bc1888]">
                  {item.icon}
                </div>
                <h4 className="text-lg font-medium text-stone-800 mb-2">{item.title}</h4>
                <p className="text-stone-500 font-light text-sm sm:text-base leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. GALERIJA ATMOSFERE (3 Slike) */}
      <section className="py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        <h2 className="text-3xl font-serif text-stone-800 text-center mb-12">
          {content.galleryTitle}
        </h2>
        {/* TODO: Zameni src atribute sa svojim Cloudinary linkovima za Usavršavanje */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="aspect-[4/5] rounded-3xl overflow-hidden shadow-md">
            <img src="https://res.cloudinary.com/duomot4hp/image/upload/v1788807736/IMG_5148.JPG_beawel.jpg" alt="Atmosfera 1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="aspect-[4/5] rounded-3xl overflow-hidden shadow-md sm:mt-8">
            <img src="https://res.cloudinary.com/duomot4hp/image/upload/v1788807781/IMG_1327.JPG_oqizoy.jpg" alt="Atmosfera 2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="aspect-[4/5] rounded-3xl overflow-hidden shadow-md">
            <img src="https://res.cloudinary.com/duomot4hp/image/upload/v1788807709/IMG_5293.JPG_edc1nn.jpg" alt="Atmosfera 3" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </motion.div>
        </div>
      </section>

      {/* 6. FINALNI CTA */}
      <section className="py-24 px-4 sm:px-6 relative overflow-hidden">
        {/* Pozadina sa prelivom za poslednji deo */}
        <div className="absolute inset-0 bg-stone-900" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#f09433]/20 via-[#dc2743]/20 to-[#bc1888]/20 blur-3xl" />
        
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-serif text-white mb-6">
            {content.finalCtaTitle}
          </h2>
          <p className="text-stone-300 font-light text-lg sm:text-xl mb-10">
            {content.finalCtaDesc}
          </p>
          <a
            href="https://ig.me/m/kikarajic"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 py-5 rounded-full text-white text-lg font-medium shadow-2xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] transition-transform hover:scale-105 hover:shadow-[#bc1888]/40"
          >
            <FaInstagram size={24} />
            {content.finalCtaBtn}
          </a>
        </div>
      </section>

    </main>
  );
}