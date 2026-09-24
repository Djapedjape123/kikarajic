"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { FaUpload, FaCheckCircle, FaExclamationCircle, FaSpinner } from "react-icons/fa";

interface CourseSignupFormProps {
  courseName: string;
}

export default function CourseSignupForm({ courseName }: CourseSignupFormProps) {
  const { activeLang } = useLanguage();

  // Stanja forme
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [terms, setTerms] = useState(false);
  const [honeypot, setHoneypot] = useState(""); // Skriveno polje za botove

  // Stanja procesa (Loading, Error, Success)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Validacija: Samo slike
      if (!selectedFile.type.startsWith("image/")) {
        setErrorMessage(activeLang === "SR" ? "Molimo vas izaberite sliku (JPG, PNG)." : "Please select an image (JPG, PNG).");
        return;
      }
      
      // Validacija: Max 10MB
      if (selectedFile.size > 10 * 1024 * 1024) {
        setErrorMessage(activeLang === "SR" ? "Slika je prevelika (Max 10MB)." : "Image is too large (Max 10MB).");
        return;
      }

      setFile(selectedFile);
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // 1. Anti-Spam (Honeypot)
    if (honeypot !== "") {
      setStatus("success");
      return;
    }

    // 2. Gmail Validacija
    if (!email.toLowerCase().endsWith("@gmail.com")) {
      setErrorMessage(activeLang === "SR" ? "Za pristup kursu morate koristiti @gmail.com adresu." : "You must use a @gmail.com address to access the course.");
      return;
    }

    if (!file) {
      setErrorMessage(activeLang === "SR" ? "Molimo vas priložite uplatnicu ili PayPal potvrdu." : "Please attach the payment slip or PayPal screenshot.");
      return;
    }

    setStatus("loading");

    try {
      // 3. Upload slike na Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "kika_uplatnice");

      const cloudinaryRes = await fetch("https://api.cloudinary.com/v1_1/duomot4hp/image/upload", {
        method: "POST",
        body: formData,
      });

      const cloudinaryData = await cloudinaryRes.json();

      if (!cloudinaryRes.ok) {
        throw new Error("Greška pri slanju slike na server.");
      }

      const imageUrl = cloudinaryData.secure_url;

      // 4. Slanje podataka na naš API
      const apiRes = await fetch("/api/buy-course", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          courseName,
          imageUrl,
        }),
      });

      if (!apiRes.ok) {
        throw new Error("Greška pri obradi prijave.");
      }

      // Sve je prošlo super!
      setStatus("success");

    } catch (error) {
      console.error(error);
      setStatus("error");
      setErrorMessage(activeLang === "SR" ? "Došlo je do greške. Pokušajte ponovo kasnije." : "An error occurred. Please try again later.");
    }
  };

  // AKO JE USPEŠNO
  if (status === "success") {
    return (
      <div className="text-center py-10 flex flex-col items-center justify-center">
        <FaCheckCircle className="text-green-500 text-6xl mb-4" />
        <h3 className="text-2xl font-serif text-white mb-2">
          {activeLang === "SR" ? "Prijava je uspešna!" : "Enrollment Successful!"}
        </h3>
        <p className="text-stone-400">
          {activeLang === "SR" 
            ? "Primili smo vašu potvrdu. Čim proverimo uplatu, stiže vam pristup na mejl." 
            : "We received your confirmation. Once verified, you will get access via email."}
        </p>
      </div>
    );
  }

  // SAMA FORMA
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      
      {/* Skriveno polje za botove (Honeypot) */}
      <input 
        type="text" 
        name="website" 
        value={honeypot} 
        onChange={(e) => setHoneypot(e.target.value)} 
        className="opacity-0 absolute -z-10 w-0 h-0" 
        tabIndex={-1} 
        autoComplete="off"
      />

      {/* Prikaz Greške */}
      {errorMessage && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-center gap-3 text-sm">
          <FaExclamationCircle className="shrink-0" size={18} />
          {errorMessage}
        </div>
      )}

      {/* Ime i Prezime */}
      <div>
        <label className="block text-sm font-medium text-stone-300 mb-1">
          {activeLang === "SR" ? "Ime i Prezime" : "Full Name"}
        </label>
        <input
          required
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={activeLang === "SR" ? "Npr. Ana Jovanović" : "E.g. Jane Doe"}
          className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-stone-500 focus:outline-none focus:border-[#bc1888] focus:ring-1 focus:ring-[#bc1888] transition-all"
        />
      </div>

      {/* Broj telefona */}
      <div>
        <label className="block text-sm font-medium text-stone-300 mb-1">
          {activeLang === "SR" ? "Broj telefona (Viber/WhatsApp)" : "Phone Number (Viber/WhatsApp)"}
        </label>
        <input
          required
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={activeLang === "SR" ? "Npr. +381 6..." : "E.g. +381 6..."}
          className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-stone-500 focus:outline-none focus:border-[#bc1888] focus:ring-1 focus:ring-[#bc1888] transition-all"
        />
      </div>

      {/* Gmail */}
      <div>
        <label className="block text-sm font-medium text-stone-300 mb-1">
          {activeLang === "SR" ? "Vaša @gmail.com adresa" : "Your @gmail.com address"}
        </label>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ana.jovanovic@gmail.com"
          className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-stone-500 focus:outline-none focus:border-[#bc1888] focus:ring-1 focus:ring-[#bc1888] transition-all"
        />
        <p className="text-xs text-stone-500 mt-1">
          {activeLang === "SR" 
            ? "Pristup videu je moguć isključivo preko Google (Gmail) naloga." 
            : "Video access is only possible via a Google (Gmail) account."}
        </p>
      </div>

      {/* NAČINI PLAĆANJA - INFO BLOK */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-4 mt-2">
        <h4 className="text-white font-medium mb-3">
          {activeLang === "SR" ? "Instrukcije za uplatu:" : "Payment Instructions:"}
        </h4>
        
        <div className="flex flex-col gap-4 text-sm text-stone-300 font-light">
          {/* Srbija */}
          <div className="flex items-start gap-3">
            <span className="text-xl mt-0.5">🇷🇸</span>
            <div>
              <strong className="text-white block mb-1">
                {activeLang === "SR" ? "Iz Srbije (Žiro račun):" : "From Serbia (Bank Account):"}
              </strong>
              160-XXXXXX-XX (Kika Rajić) <br/>
              <span className="text-stone-400">
                {activeLang === "SR" ? "Iznos:" : "Amount:"} <span className="text-[#f09433] font-medium">9.900 RSD</span>
              </span>
            </div>
          </div>

          {/* Inostranstvo */}
          <div className="flex items-start gap-3">
            <span className="text-xl mt-0.5">🌍</span>
            <div>
              <strong className="text-white block mb-1">
                {activeLang === "SR" ? "Iz inostranstva (PayPal):" : "International (PayPal):"}
              </strong>
              <a 
                href="https://www.paypal.me/KristinaRajic" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#bc1888] hover:text-[#f09433] underline transition-colors"
              >
                paypal.me/KristinaRajic
              </a> <br/>
              <span className="text-stone-400">
                {activeLang === "SR" ? "Iznos:" : "Amount:"} <span className="text-[#f09433] font-medium">85 EUR</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Uplatnica / PayPal Upload */}
      <div>
        <label className="block text-sm font-medium text-stone-300 mb-2 mt-2">
          {activeLang === "SR" ? "Skrinšot uplatnice ili PayPal potvrde" : "Payment Slip or PayPal Screenshot"}
        </label>
        
        <p className="text-xs text-stone-400 mb-3 bg-[#f09433]/10 border border-[#f09433]/20 p-3 rounded-lg leading-relaxed">
          💡 {activeLang === "SR" 
            ? "Uputstvo: Bez obzira kako ste platili, uslikajte ekran (uplatnicu ili PayPal 'Success' ekran) i priložite sliku ispod." 
            : "Instruction: Regardless of how you paid, take a screenshot of the confirmation (bank slip or PayPal success screen) and upload it below."}
        </p>

        <label className="w-full flex flex-col items-center justify-center border-2 border-dashed border-white/10 hover:border-[#bc1888]/50 bg-black/10 rounded-xl py-6 cursor-pointer transition-all">
          <FaUpload className="text-stone-400 mb-2" size={24} />
          <span className="text-sm text-stone-300 font-medium">
            {file ? file.name : (activeLang === "SR" ? "Klikni da izabereš sliku" : "Click to select image")}
          </span>
          <span className="text-xs text-stone-500 mt-1">JPG, PNG (Max 10MB)</span>
          <input 
            type="file" 
            accept="image/png, image/jpeg, image/webp" 
            onChange={handleFileChange} 
            className="hidden" 
          />
        </label>
      </div>

      {/* Uslovi (Pravna zaštita) */}
      <label className="flex items-start gap-3 cursor-pointer group mt-2">
        <div className="relative flex items-center justify-center">
          <input
            required
            type="checkbox"
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
            className="peer appearance-none w-5 h-5 border border-white/20 rounded bg-black/20 checked:bg-[#bc1888] checked:border-[#bc1888] transition-all cursor-pointer"
          />
          <FaCheckCircle className="absolute text-white opacity-0 peer-checked:opacity-100 w-3 h-3 pointer-events-none" />
        </div>
        <span className="text-xs text-stone-400 leading-relaxed font-light select-none group-hover:text-stone-300 transition-colors">
          {activeLang === "SR" 
            ? "Razumem da je kurs strogo vezan za moju Gmail adresu. Snimanje i deljenje materijala strogo je zabranjeno i zaštićeno autorskim pravima." 
            : "I understand the course is tied to my Gmail. Recording or sharing is strictly prohibited and protected by copyright."}
        </span>
      </label>

      {/* Submit Dugme */}
      <button 
        type="submit" 
        disabled={status === "loading"}
        className="w-full mt-2 flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-tr from-[#f09433] to-[#bc1888] text-white font-medium text-lg hover:shadow-[0_0_20px_rgba(188,24,136,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <>
            <FaSpinner className="animate-spin" />
            {activeLang === "SR" ? "Šaljem..." : "Sending..."}
          </>
        ) : (
          activeLang === "SR" ? "Pošalji prijavu" : "Submit Enrollment"
        )}
      </button>

    </form>
  );
}