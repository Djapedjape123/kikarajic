"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { FaInstagram, FaCheck, FaUsers, FaGlobe, FaCertificate, FaGift, FaEye, FaBrush } from "react-icons/fa";

// Rečnik za prevod - prilagođen tekstu za Makeup Workshops
const t = {
  SR: {
    heroTag: "Grupni Beauty Događaji",
    title: "Makeup Workshops",
    subtitle: "Učite od najboljih, razmenite iskustva i proširite svoju beauty mrežu kontakata.",
    cta: "Prijavi se za sledeći događaj",
    intro: "Makeup Workshops su povremene grupne radionice namenjene šminkerima i svima koji već imaju iskustvo u šminkanju, sa ciljem usavršavanja tehnika, razmene znanja i upoznavanja sa različitim pristupima profesionalnom radu.\n\nRadionice se održavaju u manjim grupama od 10 do 20 polaznika, a tehnike predstavljaju gostujući šminkeri iz zemlje i inostranstva, koji kroz svoje demonstracije dele znanje, iskustvo i prepoznatljiv stil rada. Svaki Workshop predstavlja jedinstveno iskustvo, a teme, tehnike i gosti najavljuju se posebno za svaki događaj.",
    whatYouLearn: "Kako izgledaju radionice?",
    techniques: "Masterclass & Demonstracija",
    techniquesList: [
      "Uživo praćenje kompletne izrade look-a",
      "Upoznavanje sa filozofijom i načinom rada",
      "Učenje od domaćih i internacionalnih šminkera",
      "Razumevanje prepoznatljivog stila edukatora",
      "Otvorena pitanja vezana za samu tehniku"
    ],
    business: "Praksa & Networking",
    businessList: [
      "Mogućnost praktičnog rada na modelu",
      "Stručna asistencija šminkera koji demonstrira",
      "Direktne smernice i korekcije tokom rada",
      "Stvaranje novih kontakata u beauty industriji",
      "Ekskluzivni goodie bag-ovi za polaznike"
    ],
    logisticsTitle: "Detalji događaja",
    logistics: [
      {
        icon: <FaGlobe size={20} />,
        title: "Gostujući edukatori",
        desc: "Učite direktno od priznatih šminkera iz zemlje i inostranstva."
      },
      {
        icon: <FaUsers size={20} />,
        title: "Ekskluzivne grupe",
        desc: "Održavaju se u pažljivo formiranim grupama od 10 do 20 polaznika."
      },
      {
        icon: <FaGift size={20} />,
        title: "Pokloni i Sertifikati",
        desc: "Očekuju vas sertifikati, pažljivo odabrani goodie bag-ovi i pogodnosti."
      },
      {
        icon: <FaEye size={20} />,
        title: "Demo ili Praksa",
        desc: "Odaberite praćenje demonstracije ili obezbedite mesto za praktičan rad."
      }
    ],
    galleryTitle: "Deo atmosfere sa radionica",
    finalCtaTitle: "Spremna za sledeći Workshop?",
    finalCtaDesc: "Broj mesta je uvek strogo ograničen. Informacije o narednim radionicama biće blagovremeno objavljene na našem Instagram profilu.",
    finalCtaBtn: "Zaprati nas i budi u toku"
  },
  EN: {
    heroTag: "Group Beauty Events",
    title: "Makeup Workshops",
    subtitle: "Learn from the best, exchange experiences, and expand your beauty network.",
    cta: "Apply for the next event",
    intro: "Makeup Workshops are occasional group sessions designed for makeup artists and those with prior makeup experience, aiming to perfect techniques, exchange knowledge, and explore different approaches to professional work.\n\nThe workshops are held in small groups of 10 to 20 attendees. Techniques are presented by guest makeup artists from the country and abroad, who share their knowledge, experience, and signature styles through live demonstrations. Each workshop is a unique experience, with themes, techniques, and guests announced specifically for each event.",
    whatYouLearn: "What to expect?",
    techniques: "Masterclass & Demonstration",
    techniquesList: [
      "Watching the complete creation of a look live",
      "Understanding the philosophy and workflow",
      "Learning from local and international makeup artists",
      "Mastering the educator's signature style",
      "Live Q&A regarding the demonstrated technique"
    ],
    business: "Practice & Networking",
    businessList: [
      "Option for hands-on practice on a model",
      "Expert assistance from the guest makeup artist",
      "Direct guidance and corrections during work",
      "Building new connections in the beauty industry",
      "Exclusive goodie bags for all attendees"
    ],
    logisticsTitle: "Event Details",
    logistics: [
      {
        icon: <FaGlobe size={20} />,
        title: "Guest Educators",
        desc: "Learn directly from renowned local and international makeup artists."
      },
      {
        icon: <FaUsers size={20} />,
        title: "Exclusive Groups",
        desc: "Held in carefully curated groups of 10 to 20 attendees."
      },
      {
        icon: <FaGift size={20} />,
        title: "Gifts & Certificates",
        desc: "Expect certificates, carefully selected goodie bags, and special perks."
      },
      {
        icon: <FaEye size={20} />,
        title: "Demo or Practice",
        desc: "Choose to watch the demonstration or secure a spot for hands-on practice."
      }
    ],
    galleryTitle: "Atmosphere from our workshops",
    finalCtaTitle: "Ready for the next Workshop?",
    finalCtaDesc: "Spots are always strictly limited. Information about upcoming workshops will be announced in advance on our Instagram profile.",
    finalCtaBtn: "Follow us to stay updated"
  }
};

export default function WorkshopsPage() {
  const { activeLang } = useLanguage();
  const content = activeLang === "SR" ? t.SR : t.EN;

  return (
    <main className="min-h-screen bg-[#FAF7F2]">
      
      {/* 1. HERO SEKCIJA SA DUPLIM SLIKAMA (Mobile vs Desktop) */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          {/* TODO: Ubaci sliku za MALE ekrane (mobilne) */}
          <img 
            src="https://res.cloudinary.com/duomot4hp/image/upload/v1788807866/IMG_1329.JPG_zui59e.jpg" 
            alt="Makeup Workshops" 
            className="w-full h-full object-cover object-top md:hidden"
          />
          
          {/* TODO: Ubaci sliku za VELIKE ekrane (desktop) */}
          <img 
            src="https://res.cloudinary.com/duomot4hp/image/upload/v1788807802/IMG_0606.JPG_jvxare.jpg" 
            alt="Makeup Workshops" 
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

      {/* 3. ŠTA ĆETE NAUČITI? (Kartice: Masterclass i Praksa) */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-serif text-stone-800 text-center mb-16">
          {content.whatYouLearn}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Kartica 1: Masterclass */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 sm:p-10 shadow-lg border border-stone-100"
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#f09433]/20 to-[#bc1888]/20 flex items-center justify-center text-[#bc1888] mb-6">
              <FaEye size={24} />
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

          {/* Kartica 2: Praksa i Networking */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 sm:p-10 shadow-lg border border-stone-100"
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#f09433]/20 to-[#bc1888]/20 flex items-center justify-center text-[#bc1888] mb-6">
              <FaBrush size={24} />
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
        {/* TODO: Zameni src atribute sa svojim Cloudinary linkovima za Workshops */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="aspect-[4/5] rounded-3xl overflow-hidden shadow-md">
            <img src="https://res.cloudinary.com/duomot4hp/image/upload/v1788807848/IMG_1332.JPG_k0g8yl.jpg" alt="Atmosfera 1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="aspect-[4/5] rounded-3xl overflow-hidden shadow-md sm:mt-8">
            <img src="https://res.cloudinary.com/duomot4hp/image/upload/v1788807820/IMG_1326.JPG_ytpstv.jpg" alt="Atmosfera 2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="aspect-[4/5] rounded-3xl overflow-hidden shadow-md">
            <img src="https://res.cloudinary.com/duomot4hp/image/upload/v1788807720/IMG_1325.JPG_fdj7eh.jpg" alt="Atmosfera 3" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
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