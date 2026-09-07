"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { FaInstagram, FaCheck, FaUsers, FaBrush, FaCertificate, FaClock, FaCreditCard } from "react-icons/fa";

// Rečnik za prevod - prilagođen tekstu za Školu šminkanja
const t = {
  SR: {
    heroTag: "Grupni Program",
    title: "Škola šminkanja",
    subtitle: "Započnite svoju karijeru uz rad u malim grupama i neprocenjivo beauty iskustvo.",
    cta: "Zakaži svoje mesto",
    intro: "Škola šminkanja je grupna edukacija namenjena početnicima bez ili sa malo iskustva. Organizovana je u malim grupama od najviše 7 polaznika, što omogućava da svakom posvetimo dovoljno pažnje, uz istovremeno stvaranje prijatne atmosfere za razmenu znanja, iskustava i kontakata.\n\nEdukacija se sastoji od ukupno 12 časova (1 teorijski i 11 praktičnih). Posebna prednost ove škole jeste učenje u grupi, gde polaznici uče jedni od drugih i grade svoj prvi beauty networking, dok prisustvo dodatnog asistenta pruža maksimalnu podršku u praktičnom radu.",
    whatYouLearn: "Šta ćete naučiti?",
    techniques: "Praktični rad i tehnike",
    techniquesList: [
      "Soft Glam i Bridal Makeup",
      "Klasični i blendani eyeliner",
      "Smokey Eyes tehnika",
      "Rad na zreloj koži",
      "Kompleksnije tehnike i stilovi šminkanja"
    ],
    business: "Teorija i Biznis",
    businessList: [
      "Osnove profesionalnog rada i odnos prema poslu",
      "Komunikacija i konsultacije sa klijentima",
      "Nabavka materijala i potrebnog pribora",
      "Marketing i vođenje društvenih mreža",
      "Saveti koji olakšavaju početak u beauty industriji"
    ],
    logisticsTitle: "Detalji i organizacija",
    logistics: [
      {
        icon: <FaUsers size={20} />,
        title: "Male grupe",
        desc: "Rad u grupama do najviše 7 polaznika, uz prisustvo edukatora i asistenta."
      },
      {
        icon: <FaClock size={20} />,
        title: "Fiksni termini",
        desc: "Časovi se održavaju 2 puta nedeljno u unapred definisanim terminima."
      },
      {
        icon: <FaBrush size={20} />,
        title: "Pribor obezbeđen",
        desc: "Sav potreban pribor za rad je obezbeđen i uključen u cenu edukacije."
      },
      {
        icon: <FaCertificate size={20} />,
        title: "Sertifikat i popusti",
        desc: "Po završetku dobijate sertifikat i pravo na posebne popuste kod odabranih brendova."
      }
    ],
    galleryTitle: "Deo atmosfere sa edukacija",
    finalCtaTitle: "Spremna da unaprediš svoje veštine?",
    finalCtaDesc: "Broj mesta u grupi je strogo ograničen na 7 polaznika. Plaćanje je moguće na rate tokom trajanja programa.",
    finalCtaBtn: "Pošalji poruku na Instagramu"
  },
  EN: {
    heroTag: "Group Program",
    title: "Makeup School",
    subtitle: "Start your career through small group training and invaluable beauty experience.",
    cta: "Book your spot",
    intro: "The Makeup School is a group training designed for beginners with little to no experience. Organized in small groups of up to 7 students, it allows us to give everyone sufficient attention while creating a pleasant atmosphere for exchanging knowledge, experiences, and making contacts.\n\nThe training consists of 12 classes in total (1 theoretical and 11 practical). A special advantage of this school is group learning, where students learn from each other and build their first beauty network. The presence of an additional assistant ensures maximum support during practical work.",
    whatYouLearn: "What will you learn?",
    techniques: "Practical Work & Techniques",
    techniquesList: [
      "Soft Glam and Bridal Makeup",
      "Classic and blended eyeliner",
      "Smokey Eyes technique",
      "Working on mature skin",
      "More complex techniques and makeup styles"
    ],
    business: "Theory & Business",
    businessList: [
      "Basics of professional work and work ethic",
      "Client communication and consultations",
      "Sourcing materials and necessary tools",
      "Marketing and social media management",
      "Tips and recommendations to ease your start"
    ],
    logisticsTitle: "Details & Organization",
    logistics: [
      {
        icon: <FaUsers size={20} />,
        title: "Small Groups",
        desc: "Work in groups of up to 7 students, supported by the educator and an assistant."
      },
      {
        icon: <FaClock size={20} />,
        title: "Fixed Schedule",
        desc: "Classes are held twice a week at predefined, fixed times for easy organization."
      },
      {
        icon: <FaBrush size={20} />,
        title: "Tools Provided",
        desc: "All necessary tools for work are provided and included in the course price."
      },
      {
        icon: <FaCertificate size={20} />,
        title: "Certificate & Discounts",
        desc: "Upon completion, you receive a certificate and special discounts with selected brands."
      }
    ],
    galleryTitle: "Atmosphere from our classes",
    finalCtaTitle: "Ready to upgrade your skills?",
    finalCtaDesc: "Spots are strictly limited to 7 students per group. Installment payment is available throughout the program.",
    finalCtaBtn: "Message us on Instagram"
  }
};

export default function SkolaSminkanjaPage() {
  const { activeLang } = useLanguage();
  const content = activeLang === "SR" ? t.SR : t.EN;

  return (
    <main className="min-h-screen bg-[#FAF7F2]">
      
      {/* 1. HERO SEKCIJA */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* TODO: Ovde ubaci svoj Cloudinary link za HERO sliku za Školu šminkanja */}
        <div className="absolute inset-0 w-full h-full">
          {/* Slika za male ekrane (vidljiva samo na mobilnim uređajima) */}
          <img 
            src="https://res.cloudinary.com/duomot4hp/image/upload/v1788807820/IMG_1326.JPG_ytpstv.jpg" 
            alt="Škola šminkanja" 
            className="w-full h-full object-cover object-top md:hidden"
          />
          
          {/* Slika za velike ekrane (vidljiva samo na desktopu i većim tabletima) */}
          <img 
            src="https://res.cloudinary.com/duomot4hp/image/upload/v1788807802/IMG_0606.JPG_jvxare.jpg" 
            alt="Škola šminkanja" 
            className="w-full h-full object-cover object-top hidden md:block"
          />
          
          {/* Tamni overlay za savršenu vidljivost navbara */}
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

          {/* Kartica 2: Teorija i Biznis */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 sm:p-10 shadow-lg border border-stone-100"
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#f09433]/20 to-[#bc1888]/20 flex items-center justify-center text-[#bc1888] mb-6">
              <FaUsers size={24} />
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
        {/* TODO: Zameni src atribute sa svojim Cloudinary linkovima za Školu šminkanja */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="aspect-[4/5] rounded-3xl overflow-hidden shadow-md">
            <img src="https://res.cloudinary.com/duomot4hp/image/upload/v1788807866/IMG_1329.JPG_zui59e.jpg" alt="Atmosfera 1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="aspect-[4/5] rounded-3xl overflow-hidden shadow-md sm:mt-8">
            <img src="https://res.cloudinary.com/duomot4hp/image/upload/v1788807848/IMG_1332.JPG_k0g8yl.jpg" alt="Atmosfera 2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
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