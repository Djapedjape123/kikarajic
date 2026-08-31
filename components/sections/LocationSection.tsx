"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaDirections } from 'react-icons/fa';

export default function LocationSection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24 px-4 md:px-12 bg-[#FAF7F2] relative overflow-hidden border-t border-stone-200/50">
      
      <div className="max-w-7xl mx-auto h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* --- LEVA STRANA: INFO --- */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-[#bc1888] font-bold uppercase tracking-[0.2em] text-sm mb-4 block">
              {t.location.badge}
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-stone-800 mb-6 drop-shadow-sm">
              {t.location.title}
            </h2>
            
            <p className="text-stone-600 text-lg mb-10 leading-relaxed max-w-lg">
              {t.location.desc}
            </p>

            <div className="space-y-4">
              
              {/* Adresa */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/60 border border-stone-200 hover:border-[#bc1888]/40 transition-all group shadow-sm hover:shadow-md">
                <div className="bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] p-3 rounded-full text-white shadow-sm transform group-hover:scale-110 transition-transform">
                  <FaMapMarkerAlt size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-stone-800">{t.location.address_label}</h4>
                  <p className="text-stone-600 font-medium text-lg mt-1">{t.location.address_value}</p>
                  <p className="text-stone-500 text-sm mt-0.5">{t.location.address_note}</p>
                </div>
              </div>

              {/* Email */}
              <a href="mailto:rajickristina.ns@gmail.com" className="flex items-start gap-4 p-5 rounded-2xl bg-white/60 border border-stone-200 hover:border-[#bc1888]/40 transition-all group shadow-sm hover:shadow-md cursor-pointer">
                <div className="bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] p-3 rounded-full text-white shadow-sm transform group-hover:scale-110 transition-transform">
                  <FaEnvelope size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-stone-800">{t.location.email_label}</h4>
                  <p className="text-stone-600 mt-1">rajickristina.ns@gmail.com</p>
                </div>
              </a>

              {/* Telefon */}
              <a href="tel:0601944713" className="flex items-start gap-4 p-5 rounded-2xl bg-white/60 border border-stone-200 hover:border-[#bc1888]/40 transition-all group shadow-sm hover:shadow-md cursor-pointer">
                <div className="bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] p-3 rounded-full text-white shadow-sm transform group-hover:scale-110 transition-transform">
                  <FaPhoneAlt size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-stone-800">{t.location.phone_label}</h4>
                  <p className="text-stone-600 mt-1">060 194 4713</p>
                </div>
              </a>

              {/* 
              // ----------------------------------------------------
              // RADNO VREME (ZAKOMENTARISANO)
              // Otkomentariši ovaj blok kada budete želeli da ga prikažete
              // ----------------------------------------------------
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/60 border border-stone-200 hover:border-[#bc1888]/40 transition-all group shadow-sm hover:shadow-md">
                <div className="bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] p-3 rounded-full text-white shadow-sm transform group-hover:scale-110 transition-transform">
                  <FaClock size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-stone-800">{t.location.hours_label}</h4>
                  <p className="text-stone-600 mt-1">{t.location.hours_week}</p>
                  <p className="text-stone-600">{t.location.hours_weekend}</p>
                </div>
              </div>
              */}
              
            </div>

            {/* Dugme za navigaciju */}
            <motion.a 
              href="https://www.google.com/maps/dir//Bore+Prodanovića+1A,+Novi+Sad"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-10 inline-flex items-center gap-3 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-[#bc1888]/30 transition-all"
            >
              <FaDirections className="text-xl" /> {t.location.nav_button}
            </motion.a>

          </motion.div>

          {/* --- DESNA STRANA: MAPA --- */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative h-[450px] lg:h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl border-[6px] border-white"
          >
            {/* Google Maps Iframe - Besplatan embed generisan na osnovu adrese */}
            <iframe 
              title="Mape - Kika Rajic Studio"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              loading="lazy" 
              allowFullScreen 
              referrerPolicy="no-referrer-when-downgrade"
              src="https://maps.google.com/maps?q=Bore%20Prodanovi%C4%87a%201A,%20Novi%20Sad&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="transition-all duration-700 grayscale-[20%] contrast-[1.1]" // Blagi filter na mapi da izgleda luksuznije
            ></iframe>

            {/* Pin Kartica preko mape */}
            <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-stone-100 hidden sm:block pointer-events-none">
              <p className="text-stone-800 font-bold text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#bc1888] animate-pulse"></span>
                {t.location.pin_title}
              </p>
              <p className="text-xs text-stone-500 mt-1 pl-4">{t.location.pin_sub}</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}