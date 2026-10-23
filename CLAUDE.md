@AGENTS.md
# 🏗️ Arhitektura i Plan Implementacije: Online Kursevi (Hibridni Model)

## 🎯 Cilj
Kreirati sistem za prodaju online kurseva na statičkom Next.js (App Router) sajtu **BEZ korišćenja baze podataka (Database-free)** i bez klasičnog sistema korisničkih naloga (No Auth). 

Sistem koristi "Hibridni pristup": Premium UI na frontendu + Google Drive za bezbedan video hosting + Cloudinary za upload slika + Resend za notifikacije.

## 📐 Arhitektura (Flow)
1. **Prijava (Frontend):** Korisnik popunjava formu (Ime, Telefon, Google mejl, Slika uplatnice).
2. **Upload (Cloudinary):** Slika uplatnice se šalje direktno sa klijenta na Cloudinary (Unsigned upload) kako bi se izbeglo zagušenje serverless funkcije.
3. **Notifikacija (API/Resend):** Next.js Route Handler prima podatke i link uplatnice (slika ili PDF), te šalje email vlasniku sajta (Kiki) preko Resend-a. Mejl sadrži dugme za Drive video i „Odobri“ (potpisani link ka `/sr/odobri?t=<token>`; rezerva je `mailto:` sa već popunjenom porukom i linkom ka `/{lang}/moj-kurs/{slug}`). Studentu odmah stiže mejl „Primili smo prijavu“.
4. **Odobrenje (Manuelno + klik):** Kika dodaje korisnikov Gmail u Google Drive video (View Only, No Download), pa na stranici `/sr/odobri` klikne „Pošalji pristup studentu“ — server action šalje studentu mejl sa linkom do kursa, a Kiki mejl „Odobreno: Ime – Kurs“ (evidencija). Ako slanje studentu padne (npr. 403 dok nema verifikovanog domena), stranica prikazuje rezervni `mailto:` sa istom porukom.
5. **Gledanje (Premium UI):** Korisnik gleda zaštićen video preko Iframe-a na našoj zaštićenoj URL ruti.

## 📂 Nova Struktura Foldera i Fajlova
Dodajemo samo sledeće fajlove u postojeću strukturu:
- `lib/courses.ts` -> Katalog kurseva (jedini izvor podataka): slug, cene, tekstovi SR/EN, `lessons` sa Drive ID-jevima, `PAYMENT_INFO`.
- `app/[lang]/kursevi/page.tsx` -> Stranica za marketing i prodaju kurseva.
- `app/[lang]/moj-kurs/[slug]/page.tsx` -> "Bioskop" stranica (noindex), renderuje `components/CoursePlayer.tsx` sa Google Drive Iframe-om. `/[lang]/moj-kurs` preusmerava na kurseve.
- `app/api/buy-course/route.ts` -> API endpoint za slanje emaila (Resend).
- `lib/courseEmails.ts` -> Zajednički mejl modul: `getResend()`, HTML šabloni (Kika: nova prijava / odobreno, student: primljeno / odobreno), tekst poruke za odobrenje.
- `lib/approvalToken.ts` -> Potpisani token (HMAC-SHA256, bez baze, bez isteka) za link „Odobri“.
- `app/[lang]/odobri/page.tsx` + `actions.ts` -> Stranica (noindex) i server action za odobrenje; klijentsko dugme je `components/ApproveCourseButton.tsx`.
- `components/CourseSignupForm.tsx` -> Klijentska komponenta za formu i upload uplatnice (slika ili PDF).

## 🛠️ Tehničke Instrukcije za AI Asistenta (Pravila kodiranja)

### 1. Cloudinary Upload (Upload Uplatnice)
- **ZABRANJENO:** Slanje fajla (slike) kroz `/api/buy-course` rutu (zbog Vercel payload limita).
- **PRAVILO:** Koristiti klijentski `fetch` ka Cloudinary API-ju pre slanja same forme.
- Podešavanja za Cloudinary:
  - Metoda: `POST` ka `https://api.cloudinary.com/v1_1/duomot4hp/image/upload`
  - Body: `FormData`
  - Upload Preset: `kika_uplatnice` (Podešeno kao Unsigned)

### 2. Slanje Emaila (Resend)
- API ruta `app/api/buy-course/route.ts` prima isključivo JSON podatke: `{ name, email, phone, courseSlug, lang, imageUrl, website }` (`website` je honeypot). Validacija preko `zod`; `imageUrl` mora biti sa `https://res.cloudinary.com/duomot4hp/`.
- Backend koristi `resend.emails.send()` da prosledi ove podatke vlasniku, a zatim pošalje studentu „Primili smo prijavu“ (greška tog mejla se samo loguje, ne obara odgovor).
- Dugme „Odobri“ je potpisani link (`lib/approvalToken.ts`) ka `/sr/odobri?t=<token>`; stranica ima `<form>` sa server action-om (ne GET, da mejl skeneri ne okinu slanje). Bez `COURSE_APPROVAL_SECRET` link se ne pravi i u mejlu ostaje samo `mailto:` dugme.
- Uplatnica može biti slika ili PDF (Cloudinary: u Settings → Security uključiti „Allow delivery of PDF and ZIP files“); u mejlu se za PDF prikazuje prva strana (`.pdf` → `.jpg`).
- Env (`.env.local` i Vercel): `RESEND_API_KEY`, `RESEND_FROM`, `KIKA_EMAIL`, `COURSE_APPROVAL_SECRET` (dug nasumičan string; promena poništava već poslate „Odobri“ linkove).
- Dok domen nije verifikovan u Resend-u: `RESEND_FROM` mora biti `onboarding@resend.dev`, a `KIKA_EMAIL` mora biti mejl kojim je otvoren Resend nalog.

### 3. Google Drive Iframe Integracija (`/moj-kurs`)
- Video mora biti centriran na crnoj pozadini (Premium izgled).
- Iframe link se formira tako što se Google Drive URL modifikuje: umesto `/view?usp=sharing` koristi se `/preview`.
- **CRITICAL UX FALLBACK (Plan B Dugme):** Zbog Apple Safari i iOS politike blokiranja "third-party cookies", Iframe ponekad neće prepoznati ulogovan Google nalog. Zato ISPOD Iframe-a **mora** postojati fallback dugme: *"Video se ne učitava? Klikni ovde da otvoriš direktno u Google Drive-u"*.

### 4. UI/UX Ograničenja
- Svi novi elementi moraju pratiti postojeći dizajn sistem: Tailwind CSS, `bg-stone-900`, Framer Motion animacije (`motion.div`), ikonice iz `lucide-react`.
- Nema zadržavanja stanja na serveru.
- Forma mora imati jasne state indikatore: `idle`, `uploading_image`, `sending_email`, `success`, `error`.