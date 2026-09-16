@AGENTS.md
# 🏗️ Arhitektura i Plan Implementacije: Online Kursevi (Hibridni Model)

## 🎯 Cilj
Kreirati sistem za prodaju online kurseva na statičkom Next.js (App Router) sajtu **BEZ korišćenja baze podataka (Database-free)** i bez klasičnog sistema korisničkih naloga (No Auth). 

Sistem koristi "Hibridni pristup": Premium UI na frontendu + Google Drive za bezbedan video hosting + Cloudinary za upload slika + Resend za notifikacije.

## 📐 Arhitektura (Flow)
1. **Prijava (Frontend):** Korisnik popunjava formu (Ime, Gmail, Slika uplatnice).
2. **Upload (Cloudinary):** Slika uplatnice se šalje direktno sa klijenta na Cloudinary (Unsigned upload) kako bi se izbeglo zagušenje serverless funkcije.
3. **Notifikacija (API/Resend):** Next.js Route Handler prima podatke i link slike, te šalje email vlasniku sajta (Kiki) preko Resend-a.
4. **Odobrenje (Manuelno):** Kika dodaje korisnikov Gmail u Google Drive video (View Only, No Download) i šalje mu pristupni link.
5. **Gledanje (Premium UI):** Korisnik gleda zaštićen video preko Iframe-a na našoj zaštićenoj URL ruti.

## 📂 Nova Struktura Foldera i Fajlova
Dodajemo samo sledeće fajlove u postojeću strukturu:
- `app/online-kursevi/page.tsx` -> Stranica za marketing i prodaju kurseva.
- `app/moj-kurs/page.tsx` -> "Bioskop" stranica gde je ugrađen Google Drive Iframe.
- `app/api/buy-course/route.ts` -> API endpoint za slanje emaila (Resend).
- `components/CourseSignupForm.tsx` -> Klijentska komponenta za formu i upload uplatnice.

## 🛠️ Tehničke Instrukcije za AI Asistenta (Pravila kodiranja)

### 1. Cloudinary Upload (Upload Uplatnice)
- **ZABRANJENO:** Slanje fajla (slike) kroz `/api/buy-course` rutu (zbog Vercel payload limita).
- **PRAVILO:** Koristiti klijentski `fetch` ka Cloudinary API-ju pre slanja same forme.
- Podešavanja za Cloudinary:
  - Metoda: `POST` ka `https://api.cloudinary.com/v1_1/duomot4hp/image/upload`
  - Body: `FormData`
  - Upload Preset: `kika_uplatnice` (Podešeno kao Unsigned)

### 2. Slanje Emaila (Resend)
- API ruta `app/api/buy-course/route.ts` prima isključivo JSON podatke: `{ name, email, imageUrl }`.
- Backend koristi `resend.emails.send()` da prosledi ove podatke vlasniku.

### 3. Google Drive Iframe Integracija (`/moj-kurs`)
- Video mora biti centriran na crnoj pozadini (Premium izgled).
- Iframe link se formira tako što se Google Drive URL modifikuje: umesto `/view?usp=sharing` koristi se `/preview`.
- **CRITICAL UX FALLBACK (Plan B Dugme):** Zbog Apple Safari i iOS politike blokiranja "third-party cookies", Iframe ponekad neće prepoznati ulogovan Google nalog. Zato ISPOD Iframe-a **mora** postojati fallback dugme: *"Video se ne učitava? Klikni ovde da otvoriš direktno u Google Drive-u"*.

### 4. UI/UX Ograničenja
- Svi novi elementi moraju pratiti postojeći dizajn sistem: Tailwind CSS, `bg-stone-900`, Framer Motion animacije (`motion.div`), ikonice iz `lucide-react`.
- Nema zadržavanja stanja na serveru.
- Forma mora imati jasne state indikatore: `idle`, `uploading_image`, `sending_email`, `success`, `error`.