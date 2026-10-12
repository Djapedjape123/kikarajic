# Plan: stranica „Sprej ten" → `/sr/usluge/sprej-ten` i `/en/usluge/sprej-ten`

> **Kako koristiti:** u novom razgovoru napiši „Implementiraj PLAN-SPREJ-TEN.md" i pošalji 7 Cloudinary linkova i tekst (priprema i nega).
> Plan je napravljen 2026-10-12. Ništa od ovoga još nije urađeno u kodu. Kad stranica bude gotova, ovaj fajl može da se obriše.

## Kontekst
Stigli su tekst za sprej ten (priprema pre tretmana i nega posle) i 7 slika rezultata (biće na Cloudinary-ju). Pravimo prvu stranicu iz menija „Usluge", u novom folderu `usluge/`, isto kao što je urađeno za `edukacije/`. Stranica treba da bude moderna, a navbar mora lepo da se vidi i na samom vrhu, gde je providan sa belim tekstom.
**Dogovoreno:** tamni split hero · tekst = priprema + nega · svih 7 slika su rezultati (nema klizača pre/posle).

## Šta mi treba od tebe kad krenemo
1. 7 Cloudinary linkova (originalni `https://res.cloudinary.com/duomot4hp/image/upload/v…/….jpg`).
2. Tekst na srpskom (priprema + nega). Prenosim ga doslovno, samo ga raspoređujem u stavke.
3. Podnaslov u hero-u, skriptna reč i završni CTA: tekst ih nema, pa ja predlažem kratke rečenice, a ti/Kika odobravate. Ništa ne izmišljam (ni cene, ni trajanje).

## Fajlovi
| Fajl | Šta |
|---|---|
| **NOVO** `app/[lang]/usluge/sprej-ten/page.tsx` | Server komponenta (bez `"use client"`): samo `generateMetadata` sa naslovom taba („Sprej ten \| Kika Rajić" / „Spray Tan \| Kika Rajić") i `<SprayTanPage />`. Ostatak SEO-a ide u završnu SEO fazu, ovde je samo spremno za nju. |
| **NOVO** `components/services/SprayTanPage.tsx` | `"use client"`, sve sekcije stranice. |
| **NOVO** `components/services/ServiceGallery.tsx` | Galerija + lightbox kao posebna komponenta, za ponovno korišćenje na Šminki i Frizurama. |
| **NOVO** `lib/services/sprayTan.ts` | **Jedino mesto za tekst i slike**: SR/EN tekst, 7 linkova, alt tekstovi. |
| IZMENA `lib/translations.ts` | `serviceLinks` (SR i EN): `/sminka` → `/usluge/sminka`, `/sprej-ten` → `/usluge/sprej-ten`, `/svecane-frizure` → `/usluge/svecane-frizure`. Navbar (desktop + mobilni) i Footer čitaju odatle, pa se sami ažuriraju. |
| IZMENA `components/Navbar.tsx` | Jedan red (vidi ispod). Izgled se ne menja. |

**Zašto tekst nije u `translations.ts`:** taj fajl ide u JS svake stranice (učitava ga `LanguageContext` u layoutu). Duži tekst za samo jednu stranicu bi zato usporio ceo sajt. U `translations.ts` ostaju samo meni i linkovi. Ista je logika kod edukacija, koje imaju svoj `t` u fajlu stranice.

Sadržaj `lib/services/sprayTan.ts` (skica):
```ts
export const SPRAY_TAN_IMAGES = { hero: "…", prep: "…", care: "…", gallery: ["…", "…", "…", "…"] };
type Step = { title: string; desc?: string };
type SprayTanContent = {
  badge; title; accent; subtitle; bookBtn; prepBtn;            // hero
  prep: { badge; title; steps: Step[]; note? };                 // pre tretmana
  care: { badge; title; steps: Step[]; avoid?: string[]; note? }; // posle tretmana
  galleryTitle; finalCta: { title; desc; btn };
  alt: { hero; prep; care; gallery: string[] };
};
export const SPRAY_TAN: Record<Language, SprayTanContent> = { SR: {…}, EN: {…} };
```
Zbog `Record<Language, …>` TypeScript prijavljuje grešku ako u EN nedostaje bilo koji deo SR teksta, pa ne može da ostane nepreveden deo.

## Navbar: kako ostaje vidljiv
1. **Hero je taman (`bg-stone-900`)**, pa su beli tekst i `LOGO_TOP` na vrhu uvek čitljivi. Ništa se ne menja u izgledu Navbar-a.
2. **Ispravka u `Navbar.tsx`:** sada se `isScrolled` računa tek na prvi skrol. Ako se stranica otvori već skrolovana (osvežavanje na sredini, dugme „nazad", ili link `…/sprej-ten#priprema` koji Kika pošalje klijentkinji), navbar ostaje providan sa belim tekstom preko krem pozadine i ne vidi se. Rešenje: u istom `useEffect` dodajemo `const raf = requestAnimationFrame(handleScroll)` i `cancelAnimationFrame(raf)` u cleanup. Ide kroz rAF, kao postojeći `setTimeout(…, 0)`, da ESLint pravilo `react-hooks/set-state-in-effect` (v7.1.1) ne prijavi grešku.
3. Sekcije sa sidrom (`#priprema`, `#nega`) dobijaju `scroll-mt-28`, da naslov ne završi ispod navbar „pill"-a.

## Izgled stranice, sekcije redom
1. **Hero (tamni split)**: `bg-stone-900` sa zaobljenim donjim uglovima (`rounded-b-[2.5rem] md:rounded-b-[4rem]`), pa je prelaz u krem čist, bez mutnog preliva. `pt-28 md:pt-36` za navbar.
   - Levo: badge „Usluge" (bronzana `#D4A373`, `uppercase tracking-[0.25em]`), H1 „Sprej ten" (`font-serif`, belo), pa jedna reč fontom `luxurious` u bronzanoj boji, zatim podnaslov (`text-stone-300 font-light`).
   - Dugmad: gradijent Instagram „Zakaži termin" (`https://ig.me/m/kikarajic`, `FaInstagram`) i stakleno „Kako se pripremiti ↓" koje glatko skroluje do `#priprema`.
   - Desno: slika `hero` u ramu `aspect-[3/4]` (format slika sa telefona), cela i nezatamnjena, `rounded-[2rem]`. Iza nje je bronzani sjaj (`#C28B5A`→`#bc1888`, blur) koji polako „diše", kao svetlo u `HeroSection`.
   - Telefon: tekst gore, slika ispod.
   - Animacije čekaju loader preko `isIntroSeen()` (`lib/intro.ts`), kao na početnoj, da ne prođu ispod loadera kad neko dođe direktno sa Instagrama.
2. **Pre tretmana (`#priprema`)**: krem pozadina. Levo slika `prep` u O-meni ramu (`border-[8px] border-white rounded-3xl shadow-2xl`), na desktopu `lg:sticky lg:top-28`. Desno badge (`text-[#bc1888]`), H2 i numerisane stavke „01, 02…" sa gradijent brojem (`#f09433`→`#bc1888`), naslovom i opisom. Stavke se pojavljuju jedna za drugom pri skrolu. Ako tekst ima ključno upozorenje, ide u „Važno" okvir (stil citata sa O meni).
3. **Posle tretmana (`#nega`)**: bela traka (`bg-white border-y border-stone-200/50`, kao kod edukacija), u ogledalu (slika `care` desno). Ako tekst ima stvari koje treba izbegavati, idu u posebnu listu sa `X` ikonicom.
4. **Rezultati**: naslov + `<ServiceGallery>`. Mreža `grid-cols-2 lg:grid-cols-4`, pločice `aspect-[3/4] rounded-3xl`, svaka druga pomerena naniže (kao `sm:mt-8` kod edukacija), zoom na hover. Klik otvara lightbox: crna pozadina, slika `object-contain`, ←/→/Esc, prevlačenje prstom (`drag="x"`), brojač „2 / 4", zaključan skrol stranice dok je otvoren. Lightbox je `z-[100]`, iznad navbara (`z-40`) i Instagram dugmeta (`z-[60]`).
5. **Završni CTA**: isti blok kao na edukacijama (`bg-stone-900` + gradijent blur + Instagram dugme).

Cela stranica je umotana u `<MotionConfig reducedMotion="user">`, pa se animacije gase korisnicima koji ih isključe u telefonu.
Ikonice su iz `lucide-react` (Check, X, ChevronLeft/Right, Sparkles), kako traži CLAUDE.md. Instagram ostaje `FaInstagram`, jer lucide nema brend ikonice.

## Raspored 7 slika
`hero` 1 · `prep` 1 · `care` 1 · `gallery` 4 (bez ponavljanja na stranici). Tačan raspored biram kad vidim slike: uspravne idu u ramove, ostale u galeriju.
Veličine preko `optimizeCloudinaryUrl` (`lib/cloudinary.ts`):

| Gde | Širina | Učitavanje |
|---|---|---|
| hero | 1000 | `fetchPriority="high"` |
| prep / care | 900 | `loading="lazy"` |
| pločice u galeriji | 700 | `loading="lazy"` |
| lightbox | 1600 | — |

## Postojeće stvari koje koristimo
- `useLanguage()` (`context/LanguageContext.tsx`): `activeLang`.
- `optimizeCloudinaryUrl` (`lib/cloudinary.ts`).
- `luxurious` (`lib/fonts.ts`).
- `isIntroSeen` (`lib/intro.ts`).
- Lightbox sa O meni (`app/[lang]/o-meni/page.tsx`) kao uzor; O meni se ne dira.
- Završni CTA iz `app/[lang]/edukacije/bazna/page.tsx`.
- Badge stil iz `FAQ.tsx` / `LocationSection.tsx`.

## Redosled rada
1. `translations.ts` (linkovi) + ispravka u `Navbar.tsx`.
2. `lib/services/sprayTan.ts`: Kikin SR tekst, moj EN prevod (prirodni beauty izrazi), 7 linkova + SR/EN alt tekstovi.
3. `ServiceGallery.tsx` → `SprayTanPage.tsx` → `app/[lang]/usluge/sprej-ten/page.tsx`.
4. Provera (ispod).

Nema index stranice `/usluge` (kao ni `/edukacije`). `prefetch={false}` i TODO na linkovima usluga ostaju dok ne budu gotove Šminka i Frizure. Po Next dokumentaciji, prefetch se i tako radi na hover.

## Provera
- `npm run lint` i `npm run build`: u izlazu buildа mora da postoji `/[lang]/usluge/sprej-ten`, statički napravljen za `/sr` i `/en`.
- `npm run dev`, pa otvoriti `/sr/usluge/sprej-ten` i `/en/usluge/sprej-ten`:
  - Na vrhu se beli navbar jasno vidi na tamnom hero-u; posle 50px skrola prelazi u krem „pill".
  - Otvoriti direktno `/sr/usluge/sprej-ten#priprema` i osvežiti stranicu na sredini: navbar je odmah krem i čitljiv, a naslov sekcije nije ispod njega.
  - Usluge → Sprej ten iz desktop menija, mobilnog menija i Footer-a vodi na novu adresu.
  - SR ⇄ EN ostaje na istoj stranici i menja sav tekst.
  - Telefon (375px) i desktop: raspored hero-a, ramovi slika, mreža galerije, lightbox (klik, strelice, Esc, prevlačenje).
  - U konzoli nema hydration upozorenja.
