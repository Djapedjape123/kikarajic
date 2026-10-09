import type { Language } from "@/lib/translations";

type Localized<T> = Record<Language, T>;

export type Lesson = {
  title: Localized<string>;
  // deo Drive linka između /d/ i /view: drive.google.com/file/d/<OVO>/view
  driveFileId: string;
};

export type Course = {
  slug: string;
  courseLang: Language;
  image: string;
  price: string;
  priceRSD: string;
  priceEUR: string;
  title: Localized<string>;
  shortDesc: Localized<string>;
  fullDesc: Localized<string>;
  includes: Localized<string[]>;
  lessons: Lesson[];
};

// Podaci za uplatu (prikazuju se u formi za prijavu)
// TODO: upisati pravi broj računa
export const PAYMENT_INFO = {
  bankAccount: "160-XXXXXX-XX",
  bankOwner: "Kika Rajić",
  paypalUrl: "https://www.paypal.me/KristinaRajic",
  paypalLabel: "paypal.me/KristinaRajic",
};

// Katalog kurseva - ovde se dodaju novi kursevi kada ih Kika snimi.
// slug je deo adrese: /sr/moj-kurs/<slug>
export const COURSES: Course[] = [
  {
    slug: "masterclass-sr",
    courseLang: "SR",
    image: "https://res.cloudinary.com/duomot4hp/image/upload/f_auto,q_auto,w_800/v1788807802/IMG_0606.JPG_jvxare.jpg",
    price: "9.900 RSD",
    priceRSD: "9.900 RSD",
    priceEUR: "85 EUR",
    title: {
      SR: "Masterclass Šminkanja (Srpski jezik)",
      EN: "Makeup Masterclass (Serbian Voiceover)",
    },
    shortDesc: {
      SR: "Naučite najtraženije salonske tehnike šminkanja kroz 5 sati video materijala.",
      EN: "Learn the most requested salon makeup techniques through 5 hours of video content.",
    },
    fullDesc: {
      SR: "Ovaj kurs pokriva sve od pripreme kože do naprednih tehnika poput Soft Glam i Bridal makeup-a. Naučićete kako da prilagodite šminku različitim tipovima kože i oblicima lica.",
      EN: "This course covers everything from skin prep to advanced techniques like Soft Glam and Bridal makeup. Learn how to adapt makeup to different skin types and face shapes.",
    },
    includes: {
      SR: [
        "5+ sati video materijala",
        "Doživotni pristup preko Google Drive-a",
        "Lista preporučenih proizvoda",
        "Sertifikat o završenom kursu",
      ],
      EN: [
        "5+ hours of video content",
        "Lifetime access via Google Drive",
        "Recommended product list",
        "Certificate of completion",
      ],
    },
    // TODO: upisati pravi Drive ID videa
    lessons: [
      {
        title: { SR: "Masterclass Šminkanja", EN: "Makeup Masterclass" },
        driveFileId: "DRIVE_FILE_ID_SR",
      },
    ],
  },
  {
    slug: "masterclass-en",
    courseLang: "EN",
    image: "https://res.cloudinary.com/duomot4hp/image/upload/f_auto,q_auto,w_800/v1788807736/IMG_5148.JPG_beawel.jpg",
    price: "€85",
    priceRSD: "9.900 RSD",
    priceEUR: "85 EUR",
    title: {
      SR: "Masterclass Šminkanja (Engleski jezik)",
      EN: "Makeup Masterclass (English Voiceover)",
    },
    shortDesc: {
      SR: "Isti vrhunski materijal, prilagođen za strano tržište sa engleskim glasom (Voiceover).",
      EN: "The same premium content, adapted for the international market with English voiceover.",
    },
    fullDesc: {
      SR: "Edukacija na engleskom jeziku idealna za klijente iz inostranstva. Prolazimo sve korake od pripreme lica do završnih detalja.",
      EN: "Training in English, ideal for international clients. We cover all steps from face preparation to finishing details.",
    },
    includes: {
      SR: [
        "5+ sati video materijala",
        "Doživotni pristup preko Google Drive-a",
        "Lista preporučenih proizvoda",
        "Sertifikat o završenom kursu",
      ],
      EN: [
        "5+ hours of video content",
        "Lifetime access via Google Drive",
        "Recommended product list",
        "Certificate of completion",
      ],
    },
    // TODO: upisati pravi Drive ID videa
    lessons: [
      {
        title: { SR: "Makeup Masterclass", EN: "Makeup Masterclass" },
        driveFileId: "DRIVE_FILE_ID_EN",
      },
    ],
  },
];

export function getCourse(slug: string) {
  return COURSES.find((course) => course.slug === slug);
}

// iframe link: umesto /view?usp=sharing koristi se /preview
export function drivePreviewUrl(fileId: string) {
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

// fallback link (Safari/iOS blokira kolačiće u iframe-u)
export function driveViewUrl(fileId: string) {
  return `https://drive.google.com/file/d/${fileId}/view`;
}
