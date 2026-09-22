"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { FaInstagram, FaCheck, FaCamera, FaBrush, FaCertificate, FaStar, FaUserCheck } from "react-icons/fa";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary";

const t = {
  SR: {
    heroTag: "Premium Individualni Program",
    title: "Perfect Yourself",
    subtitle: "Podignite kvalitet svog rada na viši nivo uz napredne salonske tehnike.",
    cta: "Zakaži svoje mesto",
    intro: "Perfect Yourself je premium individualna edukacija, namenjena makeup artistima, ali i svima koji imaju osnovno iskustvo u šminkanju, a žele da usavrše svoje znanje i podignu kvalitet svog rada na viši nivo.\n\nEdukacija je potpuno individualnog karaktera, što omogućava da se pažnja u potpunosti posveti polazniku, njegovom načinu rada i konkretnim izazovima. Fokus je na najtraženijim salonskim tehnikama i detaljima koji prave razliku u profesionalnom šminkanju.",
    whatYouLearn: "Šta ćete usavršiti?",
    techniques: "Napredne Tehnike",
    techniquesList: [
      "Detaljna analiza look-a (od tena do očiju)",
      "Soft Glam & Bridal Makeup",
      "Classic & Blended Eyeliner",
      "Soft Smokey tehnika",
      "Brazilian & Russian Glam",
      "Završni detalji koji prave razliku"
    ],
    business: "Rad i Prezentacija",
    businessList: [
      "Pravilan izbor proizvoda i četkica",
      "Optimizacija načina i brzine rada",
      "Fotografisanje i prezentacija makeup-a",
      "Individualni saveti i korekcije",
      "Rešavanje konkretnih izazova u radu"
    ],
    logisticsTitle: "Benefiti edukacije",
    logistics: [
      {
        icon: <FaUserCheck size={20} />,
        title: "1 na 1 Pristup",
        desc: "Potpuna posvećenost vama, vašem tempu i rešavanju konkretnih izazova u radu."
      },
      {
        icon: <FaBrush size={20} />,
        title: "Sve je obezbeđeno",
        desc: "Modeli i kompletan vrhunski pribor za rad uključeni su u cenu edukacije."
      },
      {
        icon: <FaStar size={20} />,
        title: "Premium Tehnike",
        desc: "Fokus na najtraženije salonske tehnike (Brazilian, Russian Glam, Bridal)."
      },
      {
        icon: <FaCertificate size={20} />,
        title: "Sertifikat i Popusti",
        desc: "Po završetku dobijate sertifikat i posebne popuste kod odabranih beauty brendova."
      }
    ],
    galleryTitle: "Deo atmosfere sa usavršavanja",
    finalCtaTitle: "Spremna da podigneš rad na viši nivo?",
    finalCtaDesc: "Broj mesta je ograničen zbog potpuno individualnog pristupa. Piši nam i rezerviši svoj termin na vreme.",
    finalCtaBtn: "Pošalji poruku na Instagramu"
  },
  EN: {
    heroTag: "Premium Individual Program",
    title: "Perfect Yourself",
    subtitle: "Elevate the quality of your work to the next level with advanced salon techniques.",
    cta: "Book your spot",
    intro: "Perfect Yourself is a premium individual training designed for makeup artists and those with basic makeup experience who want to perfect their skills and elevate their work to the next level.\n\nThe training is strictly one-on-one, allowing complete focus on the student, their workflow, and specific challenges. The focus is on the most requested salon techniques and the details that make a difference in professional makeup.",
    whatYouLearn: "What will you perfect?",
    techniques: "Advanced Techniques",
    techniquesList: [
      "Detailed look analysis (complexion to eyes)",
      "Soft Glam & Bridal Makeup",
      "Classic & Blended Eyeliner",
      "Soft Smokey technique",
      "Brazilian & Russian Glam",
      "Finishing details that make a difference"
    ],
    business: "Workflow & Presentation",
    businessList: [
      "Choosing the right products and brushes",
      "Optimizing workflow and speed",
      "Makeup photography and presentation",
      "Personalized advice and corrections",
      "Overcoming specific challenges in your work"
    ],
    logisticsTitle: "Training Benefits",
    logistics: [
      {
        icon: <FaUserCheck size={20} />,
        title: "One-on-One Approach",
        desc: "Complete dedication to you, your pace, and solving your specific workflow challenges."
      },
      {
        icon: <FaBrush size={20} />,
        title: "Everything Provided",
        desc: "Models and all necessary premium makeup tools are included in the price."
      },
      {
        icon: <FaStar size={20} />,
        title: "Premium Techniques",
        desc: "Focus on the most requested salon techniques (Brazilian, Russian Glam, Bridal)."
      },
      {
        icon: <FaCertificate size={20} />,
        title: "Certificate & Discounts",
        desc: "Upon completion, you receive a certificate and exclusive discounts with beauty brands."
      }
    ],
    galleryTitle: "Atmosphere from our masterclasses",
    finalCtaTitle: "Ready to elevate your work?",
    finalCtaDesc: "Spots are limited due to our strictly one-on-one approach. Message us and book your dates on time.",
    finalCtaBtn: "Message us on Instagram"
  }
};

export default function PerfectYourselfPage() {
  const { activeLang } = useLanguage();
  const content = activeLang === "SR" ? t.SR : t.EN;

  return (
    <main className="min-h-screen bg-[#FAF7F2]">
      
      {/* 1. HERO SEKCIJA */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        
        <div className="absolute inset-0 w-full h-full">
          {/* TODO: Ubaci sliku za Perfect Yourself edukaciju */}
          <img 
            src={optimizeCloudinaryUrl("https://res.cloudinary.com/duomot4hp/image/upload/v1788807802/IMG_0606.JPG_jvxare.jpg", 1600)}
            alt="Perfect Yourself edukacija šminkanja" 
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/80 via-stone-900/50 to-[#FAF7F2]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center mt-16">
          
          
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

      {/* 3. ŠTA ĆETE USAVRŠITI? */}
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

          {/* Kartica 2: Biznis i Prezentacija */}
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

      {/* 4. BENEFITI EDUKACIJE */}
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
        {/* TODO: Zameni src atribute sa svojim Cloudinary linkovima za Perfect Yourself */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="aspect-[4/5] rounded-3xl overflow-hidden shadow-md">
            <img src={optimizeCloudinaryUrl("https://res.cloudinary.com/duomot4hp/image/upload/v1790101159/225FFE36-1C38-4826-8C9F-DDD9E3D02AB7.JPG_nwbs3x.jpg", 700)} alt="Atmosfera 1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="aspect-[4/5] rounded-3xl overflow-hidden shadow-md sm:mt-8">
            <img src={optimizeCloudinaryUrl("https://res.cloudinary.com/duomot4hp/image/upload/v1790101149/IMG_2369.JPG_iuvksi.jpg", 700)} alt="Atmosfera 2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="aspect-[4/5] rounded-3xl overflow-hidden shadow-md">
            <img src={optimizeCloudinaryUrl("https://res.cloudinary.com/duomot4hp/image/upload/v1790101132/IMG_2367.JPG_cqg2r7.jpg", 700)} alt="Atmosfera 3" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </motion.div>
        </div>
      </section>

      {/* 6. FINALNI CTA */}
      <section className="py-24 px-4 sm:px-6 relative overflow-hidden">
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