"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { FaInstagram, FaCheck, FaCamera, FaBrush, FaCertificate, FaClock, FaCreditCard } from "react-icons/fa";
import Image from "next/image";


const t = {
  SR: {
    heroTag: "Individualni Program",
    title: "Bazna edukacija šminkanja",
    subtitle: "Steknite kvalitetnu osnovu i sigurnost u profesionalnom radu.",
    cta: "Zakaži svoje mesto",
    intro: "Bazna edukacija šminkanja je individualni program namenjen početnicima koji žele da steknu kvalitetnu osnovu i sigurnost u profesionalnom radu. Kroz 15 časova (1 teorijski i 14 praktičnih) prolazimo kompletan proces rada makeup artista, od osnova šminkanja i pripreme kože, preko izbora materijala i pribora, do najtraženijih salonskih tehnika. Individualni pristup omogućava da se program prilagodi vašem predznanju, tempu i konkretnim potrebama.",
    whatYouLearn: "Šta ćete naučiti?",
    techniques: "Tehnike šminkanja",
    techniquesList: [
      "Priprema kože, izbor materijala i pribora",
      "Soft Glam & Bridal Makeup",
      "Smokey Eyes tehnika",
      "Različite tehnike blendanog ajlajnera",
      "Rad na zreloj koži",
      "Kompleksnije salonske tehnike"
    ],
    business: "Biznis & Marketing",
    businessList: [
      "Rad sa klijentima i konsultacije",
      "Marketing i vođenje društvenih mreža",
      "Fotografisanje makeup-a i osvetljenje",
      "Korišćenje telefona za najbolji ugao",
      "Profesionalna prezentacija rada"
    ],
    logisticsTitle: "Sve što vam je potrebno za uspeh",
    logistics: [
      {
        icon: <FaClock size={20} />,
        title: "Dinamika rada",
        desc: "Časovi se održavaju 2 puta nedeljno, prema dogovoru i u terminima koji vam odgovaraju."
      },
      {
        icon: <FaBrush size={20} />,
        title: "Sve je obezbeđeno",
        desc: "Modeli i sav potreban pribor za rad uključeni su u cenu edukacije."
      },
      {
        icon: <FaCreditCard size={20} />,
        title: "Fleksibilno plaćanje",
        desc: "Moguće je plaćanje na rate u toku trajanja same edukacije."
      },
      {
        icon: <FaCertificate size={20} />,
        title: "Sertifikat i Popusti",
        desc: "Dobijate sertifikat i posebne popuste kod odabranih brendova za kupovinu opreme."
      }
    ],
    galleryTitle: "Deo atmosfere sa edukacija",
    finalCtaTitle: "Spremna da unaprediš svoje veštine?",
    finalCtaDesc: "Broj mesta je ograničen zbog individualnog pristupa. Piši nam i rezerviši svoj termin na vreme.",
    finalCtaBtn: "Pošalji poruku na Instagramu"
  },
  EN: {
    heroTag: "Individual Program",
    title: "Basic Makeup Training",
    subtitle: "Build a high-quality foundation and confidence in your professional work.",
    cta: "Book your spot",
    intro: "The basic makeup training is an individual program designed for beginners who want to build a high-quality foundation and confidence in professional work. Through 15 classes (1 theoretical and 14 practical), we cover the complete workflow of a makeup artist, from makeup basics and skin preparation to choosing materials, tools, and mastering the most requested salon techniques. The one-on-one approach allows the program to be tailored to your prior knowledge, pace, and specific needs.",
    whatYouLearn: "What will you learn?",
    techniques: "Makeup Techniques",
    techniquesList: [
      "Skin prep, choosing materials & tools",
      "Soft Glam & Bridal Makeup",
      "Smokey Eyes technique",
      "Various blended eyeliner techniques",
      "Mature skin makeup",
      "Complex salon techniques"
    ],
    business: "Business & Marketing",
    businessList: [
      "Client relations and consultations",
      "Marketing & social media management",
      "Makeup photography and lighting",
      "Using a smartphone for the best angles",
      "Professional portfolio presentation"
    ],
    logisticsTitle: "Everything you need to succeed",
    logistics: [
      {
        icon: <FaClock size={20} />,
        title: "Schedule",
        desc: "Classes are held twice a week, at times convenient for the student."
      },
      {
        icon: <FaBrush size={20} />,
        title: "Everything provided",
        desc: "Models and all necessary makeup tools are included in the price."
      },
      {
        icon: <FaCreditCard size={20} />,
        title: "Flexible Payment",
        desc: "Installment payment is available during the course of the training."
      },
      {
        icon: <FaCertificate size={20} />,
        title: "Certificate & Discounts",
        desc: "You receive a certificate and special discounts with selected brands for makeup purchases."
      }
    ],
    galleryTitle: "Atmosphere from our classes",
    finalCtaTitle: "Ready to upgrade your skills?",
    finalCtaDesc: "Spots are limited due to our one-on-one approach. Message us and book your dates on time.",
    finalCtaBtn: "Message us on Instagram"
  }
};

export default function BaznaEdukacijaPage() {
  const { activeLang } = useLanguage();
  const content = activeLang === "SR" ? t.SR : t.EN;

  return (
    <main className="min-h-screen bg-[#FAF7F2]">
      
      {/* 1. HERO SEKCIJA */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* TODO: Ovde ubaci svoj Cloudinary link za HERO sliku (npr. slika Kike kako šminka polaznicu) */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://res.cloudinary.com/duomot4hp/image/upload/v1788807802/IMG_0606.JPG_jvxare.jpg" 
            alt="Bazna edukacija šminkanja" 
            className="w-full h-full object-cover object-top"
          />
          {/* Tamni overlay koji omogućava da se navbar i tekst vide savršeno */}
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

      {/* 3. ŠTA ĆETE NAUČITI? (Kartice: Tehnike i Biznis) */}
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
              <FaBrush size={24} />
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

          {/* Kartica 2: Biznis i Marketing */}
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

      {/* 4. LOGISTIKA & BENEFITI (Mreža 4 mala bloka) */}
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
        {/* TODO: Zameni src atribute sa svojim Cloudinary linkovima */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="aspect-[4/5] rounded-3xl overflow-hidden shadow-md">
            <img src="https://res.cloudinary.com/duomot4hp/image/upload/v1788807736/IMG_5148.JPG_beawel.jpg" alt="Atmosfera 1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="aspect-[4/5] rounded-3xl overflow-hidden shadow-md sm:mt-8">
            <img src="https://res.cloudinary.com/duomot4hp/image/upload/v1788807709/IMG_5293.JPG_edc1nn.jpg" alt="Atmosfera 2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="aspect-[4/5] rounded-3xl overflow-hidden shadow-md">
            <img src="https://res.cloudinary.com/duomot4hp/image/upload/v1788807781/IMG_1327.JPG_oqizoy.jpg" alt="Atmosfera 3" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
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