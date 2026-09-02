"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { FaPlus, FaMinus, FaInstagram } from "react-icons/fa";

// Lista pitanja sa sređenim tekstom i dodatom engleskom verzijom
const faqs = [
  {
    id: 1,
    questionSR: "Kako zakazati termin?",
    questionEN: "How to book an appointment?",
    answerSR: "Termin možete zakazati putem Instagram poruke. Potrebno je da nam pošaljete datum i okvirno vreme kada vam je šminkanje potrebno.",
    answerEN: "You can book your appointment via Instagram message. Please send us the date and the approximate time you need makeup services.",
  },
  {
    id: 2,
    questionSR: "Koliko unapred je potrebno zakazati?",
    questionEN: "How far in advance should I book?",
    answerSR: "Preporučujemo da termin rezervišete što ranije, posebno za vikende i sezonu venčanja i proslava, kako biste osigurali željeni datum i vreme. Termine za terenska šminkanja zakazujem i do dve godine unapred, a termine u studiju do godinu i po dana unapred.",
    answerEN: "We recommend booking as early as possible, especially for weekends, wedding season, and celebrations, to secure your desired date and time. On-location makeup can be booked up to two years in advance, and studio appointments up to a year and a half.",
  },
  {
    id: 3,
    questionSR: "Da li radite terenska šminkanja?",
    questionEN: "Do you offer on-location makeup?",
    answerSR: "Da. Terenska šminkanja dostupna su worldwide, uz poseban cenovnik i individualni dogovor. Za veći broj osoba postoji mogućnost angažovanja tima, kako bismo obezbedili da sve klijentkinje budu spremne na vreme.",
    answerEN: "Yes. On-location makeup is available worldwide, with a special price list and individual agreement. For a larger number of people, we can hire a team to ensure all clients are ready on time.",
  },
  {
    id: 4,
    questionSR: "Koje sve usluge su dostupne u Kika Rajić studiju?",
    questionEN: "What services are available at Kika Rajić Studio?",
    answerSR: "U studiju možete zakazati profesionalno šminkanje, frizure, spray tan i edukacije. Sve usluge prilagođavamo vašim željama i potrebama.",
    answerEN: "In the studio, you can book professional makeup, hairstyles, spray tanning, and education. We tailor all services to your wishes and needs.",
  },
  {
    id: 5,
    questionSR: "Koje edukacije su dostupne?",
    questionEN: "What educational courses are available?",
    answerSR: "• Bazna obuka — namenjena početnicima koji žele da naprave prve korake u svetu profesionalnog šminkanja uz individualan pristup.\n\n• Škola šminkanja — grupna edukacija za početnike, kroz koju polaznici uče od osnove do naprednih tehnika.\n\n• Usavršavanje za šminkere — individualna edukacija namenjena profesionalcima koji žele da usavrše određene tehnike.\n\n• Perfect Yourself — individualna edukacija fokusirana na najtraženije salonske tehnike.\n\n• Workshops — povremene grupne edukacije i beauty eventi sa mnom i gostujućim edukatorima.",
    answerEN: "• Basic Training — for beginners wanting to take their first steps in professional makeup with a personalized approach.\n\n• Makeup School — group training for beginners, covering everything from basics to advanced techniques.\n\n• Advanced Makeup Training — one-on-one sessions for professionals looking to perfect specific techniques.\n\n• Perfect Yourself — personalized training focusing on the most requested salon techniques.\n\n• Workshops — periodic group classes and beauty events with me and guest educators.",
  },
  {
    id: 6,
    questionSR: "Da li se dobija sertifikat nakon završenih obuka?",
    questionEN: "Do I get a certificate after completing a course?",
    answerSR: "Na kraju svake obuke dobija se sertifikat sa pečatom i potpisom edukatora. Sa sertifikatom ostvarujete i pravo na popuste i pogodnosti kod određenih brendova.",
    answerEN: "At the end of each course, you receive a certificate with the educator's stamp and signature. The certificate also entitles you to discounts and benefits with certain beauty brands.",
  },
  {
    id: 7,
    questionSR: "Ko čini Kika Rajić tim?",
    questionEN: "Who makes up the Kika Rajić team?",
    answerSR: "Iza Kika Rajić studija stoji tim talentovanih beauty profesionalaca. Pored mene, naš tim čine tri makeup artista, hair stylist i spray tan artist, sa kojima zajedno kreiramo kompletan look i brinemo o svakom detalju vašeg beauty iskustva.",
    answerEN: "Behind Kika Rajić Studio is a team of talented beauty professionals. Besides me, our team consists of three makeup artists, a hair stylist, and a spray tan artist, with whom we create complete looks and take care of every detail of your beauty experience.",
  },
  {
    id: 8,
    questionSR: "Da li je potreban avans pri rezervaciji?",
    questionEN: "Is a deposit required when booking?",
    answerSR: "Za rezervaciju termina u studiju avans nije potreban, a rok za otkazivanje termina je 48h pre samog dogovora. Za rezervaciju terenskog šminkanja potreban je depozit.",
    answerEN: "No deposit is required for studio appointments, and the cancellation deadline is 48 hours beforehand. For on-location makeup bookings, a deposit is required.",
  },
];

export default function FAQ() {
  const { activeLang } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Prvo je automatski otvoreno

  const toggleFAQ = (index: number) => {
    // Ako klikne na već otvoreno, zatvara se. U suprotnom se otvara novo.
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden border-t border-stone-200/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Split Screen Grid (1 kolona na mobilnom, 12-col grid na desktopu) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEVA STRANA: Naslov i Dugme (Lepljivo na desktopu) */}
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <span className="text-[#bc1888] font-bold uppercase tracking-[0.25em] text-xs sm:text-sm mb-3 block">
              {activeLang === "SR" ? "Informacije" : "Information"}
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-stone-800 mb-6 leading-tight">
              {activeLang === "SR" ? "Često postavljana pitanja" : "Frequently Asked Questions"}
            </h2>
            <p className="text-stone-500 font-light text-base sm:text-lg mb-10 leading-relaxed">
              {activeLang === "SR" 
                ? "Sve što vas zanima o našim uslugama, zakazivanju i edukacijama na jednom mestu. Niste našli odgovor? Slobodno nas kontaktirajte." 
                : "Everything you need to know about our services, booking, and education in one place. Couldn't find your answer? Feel free to contact us."}
            </p>

            <a
              href="https://ig.me/m/kikarajic"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 rounded-full text-white font-medium shadow-xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] transition-transform hover:scale-105 hover:shadow-[#bc1888]/30 group"
            >
              <FaInstagram size={20} className="group-hover:rotate-12 transition-transform" />
              {activeLang === "SR" ? "Pišite nam na Instagramu" : "Message us on Instagram"}
            </a>
          </div>

          {/* DESNA STRANA: Harmonika (Accordion) Lista Pitanja */}
          <div className="lg:col-span-8 space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div 
                  key={faq.id} 
                  className={`border border-stone-200 rounded-3xl overflow-hidden transition-all duration-300 ${isOpen ? 'bg-stone-50/50 shadow-md border-[#bc1888]/30' : 'bg-white hover:border-stone-300'}`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between p-6 sm:p-8 text-left focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <h3 className={`font-serif text-lg sm:text-xl pr-4 transition-colors duration-300 ${isOpen ? 'text-[#bc1888]' : 'text-stone-800'}`}>
                      {activeLang === "SR" ? faq.questionSR : faq.questionEN}
                    </h3>
                    
                    {/* Animirana ikonica (+ i -) */}
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-[#bc1888] text-white' : 'bg-stone-100 text-stone-500'}`}
                    >
                      {isOpen ? <FaMinus size={14} /> : <FaPlus size={14} />}
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        {/* Odgovor (Koristimo whitespace-pre-line da bi prelomi redova kod edukacija radili) */}
                        <div className="px-6 pb-8 sm:px-8 pt-0 text-stone-600 font-light leading-relaxed whitespace-pre-line text-sm sm:text-base">
                          {activeLang === "SR" ? faq.answerSR : faq.answerEN}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}