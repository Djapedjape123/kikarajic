import type { Language } from "@/lib/translations";

// Jedino mesto za tekst, slike i link za zakazivanje stranice "Svečane frizure" (/usluge/svecane-frizure).
// Tekst nije u translations.ts jer taj fajl ide u JS svake stranice (učitava ga LanguageContext u layoutu).

// TODO: zameniti Instagram nalogom hair stylist-a kad bude poznat (za sada Kikin nalog)
export const HAIRSTYLES_BOOKING_URL = "https://ig.me/m/kikarajic";

// 4 vrste frizura za kolaž u hero-u; redosled mora da prati `styles` u tekstu ispod
export const HAIRSTYLE_IMAGES = [
  "https://res.cloudinary.com/duomot4hp/image/upload/v1791887753/IMG_8867_bejjfc.jpg",
  "https://res.cloudinary.com/duomot4hp/image/upload/v1791887787/IMG_8056.JPG_udxiyl.jpg",
  "https://res.cloudinary.com/duomot4hp/image/upload/v1791887822/IMG_9827.JPG_st1oxn.jpg",
  "https://res.cloudinary.com/duomot4hp/image/upload/v1791887836/IMG_8077.JPG_lq1zet.jpg",
];

// ikonica bloka u "Pre zakazivanja" i "Pravila termina" (prave se u HairstylesPage, ovde ostaje samo podatak)
export type InfoIcon = "gem" | "camera" | "timer" | "crown" | "clock" | "calendarX" | "refresh" | "undo";

// points: Kikine rečenice iz jedne tačke teksta, doslovno
export type InfoBlock = { icon: InfoIcon; title: string; points: string[] };

export type HairstylesContent = {
  // hero
  title: string;
  accent: string; // reč u skriptnom fontu, ispod naslova
  subtitle: string;
  bookBtn: string;
  prepBtn: string;
  styles: { name: string; alt: string }[]; // isti redosled kao HAIRSTYLE_IMAGES
  info: { badge: string; title: string; intro: string; items: InfoBlock[] };
  prep: { badge: string; title: string; steps: { title: string; desc: string }[] };
  rules: {
    badge: string;
    title: string;
    items: InfoBlock[];
    summary: { title: string; items: { value: string; label: string }[] }; // kartica "Ukratko"
  };
  finalCta: { title: string; desc: string; btn: string };
};

// Record<Language, ...>: TypeScript prijavljuje grešku ako u EN nedostaje bilo koji deo SR teksta
export const HAIRSTYLES: Record<Language, HairstylesContent> = {
  SR: {
    title: "Svečane frizure",
    accent: "za posebne prilike",
    subtitle:
      "Lokne, talasi, punđe, visoki repovi i druge stilizovane frizure — pažljivo izrađene, da se osećaš lepo, posebno i samouvereno.",
    bookBtn: "Zakaži termin",
    prepBtn: "Kako se pripremiti",
    styles: [
      { name: "Repovi sa ekstenzijama", alt: "Visoki rep sa ekstenzijama za kosu" },
      { name: "Wet look frizura", alt: "Wet look frizura sa zalizanom kosom" },
      { name: "Zalizana niska punđa", alt: "Zalizana niska punđa, pogled otpozadi" },
      { name: "Polupodignuta frizura sa talasima", alt: "Polupodignuta frizura sa talasima, pogled otpozadi" },
    ],
    info: {
      badge: "Informacije",
      title: "Pre zakazivanja",
      intro:
        "Kako bismo osigurale da tvoja frizura izgleda što lepše i traje što duže, molim te da pre dolaska na termin obratiš pažnju na nekoliko važnih smernica.",
      items: [
        {
          icon: "gem",
          title: "Usluge koje pružam",
          points: [
            "U ponudi su isključivo svečane frizure, poput lokni, talasa, punđi, visokih repova i drugih stilizovanih frizura za posebne prilike.",
            "Pranje kose, feniranje i šišanje nisu deo moje ponude.",
          ],
        },
        {
          icon: "camera",
          title: "Odabir željene frizure",
          points: [
            "Pre dolaska razmisli o frizuri koju želiš da radimo.",
            "Ukoliko imaš fotografiju željene frizure, pošalji mi je unapred kako bismo se dogovorile oko izgleda i procenile da li je odgovarajuća za tvoju dužinu i tip kose.",
            "Fotografije služe kao inspiracija, jer konačan rezultat zavisi od prirodne teksture, gustine i dužine kose.",
          ],
        },
        {
          icon: "timer",
          title: "Trajanje termina",
          points: [
            "Izrada svečane frizure traje okvirno 30–45 minuta, u zavisnosti od vrste i zahtevnosti frizure.",
            "Kod posebno zahtevnih frizura može biti potrebno dodatno vreme, zbog čega je važno da željeni izgled dogovorimo unapred.",
            "Ukoliko imaš zakazano i šminkanje ili drugi događaj istog dana, preporučujem da to isplaniraš unapred kako bismo izbegle žurbu.",
          ],
        },
        {
          icon: "crown",
          title: "Posebno zahtevne frizure",
          points: [
            "Ukoliko želiš veoma zahtevnu ili detaljnu frizuru, pošalji mi fotografiju unapred kako bismo se dogovorile o mogućnostima izrade i potrebnom vremenu.",
            "Molim te da sve posebne želje i detalje naglasiš prilikom zakazivanja, kako bismo imale dovoljno vremena za pripremu i izradu.",
          ],
        },
      ],
    },
    prep: {
      badge: "Pre termina",
      title: "Priprema kose",
      steps: [
        {
          title: "Čista i suva kosa",
          desc: "Operi kosu dan pre termina. Kosa treba da bude potpuno čista i suva prilikom dolaska.",
        },
        {
          title: "Bez regeneratora, maski i ulja",
          desc: "Nemoj koristiti regenerator ili proizvode koji zaglađuju kosu i otežavaju formiranje lokni, kao ni maske i ulja koja kosu čine previše mekanom i klizavom.",
        },
        {
          title: "Bez proizvoda za stilizovanje",
          desc: "Na kosi ne treba da bude gela, laka, pene, suvog šampona niti drugih proizvoda za stilizovanje.",
        },
        {
          title: "Osušena kosa, bez uvijanja i ispravljanja",
          desc: "Molim te da na termin dođeš sa osušenom kosom, bez prethodnog uvijanja ili ispravljanja, osim ako se drugačije ne dogovorimo.",
        },
      ],
    },
    rules: {
      badge: "Važno",
      title: "Pravila termina",
      items: [
        {
          icon: "clock",
          title: "Dolazak na termin",
          points: [
            "Molim te da na svoj termin dođeš na vreme, idealno 5 minuta ranije, kako bismo mogle da počnemo bez žurbe.",
            "Kašnjenje duže od 10 minuta može rezultirati otkazivanjem termina, jer želim da svakoj klijentkinji posvetim dovoljno vremena i pažnje.",
            "Ukoliko znaš da ćeš kasniti, molim te da me obavestiš što pre.",
          ],
        },
        {
          icon: "calendarX",
          title: "Otkazivanje i promena termina",
          points: [
            "Ukoliko nisi u mogućnosti da dođeš, potrebno je da otkažeš termin najmanje 48 sati unapred.",
            "U slučaju neblagovremenog otkazivanja ili nedolaska, prilikom ponovnog zakazivanja potrebno je izmiriti pun iznos prethodno rezervisanog termina.",
            "Hvala ti što poštuješ moje vreme i omogućavaš da termin bude dostupan drugim klijentkinjama.",
          ],
        },
        {
          icon: "refresh",
          title: "Promena dogovorene frizure",
          points: [
            "Ukoliko želiš da promeniš frizuru nakon što smo se već dogovorile, molim te da me o tome obavestiš unapred.",
            "Veće promene u odnosu na prvobitni dogovor mogu zahtevati dodatno vreme, pa je važno da ih uskladimo pre dolaska.",
            "Promena frizure na samom terminu zavisiće od raspoloživog vremena i mogućnosti da se nova frizura izvede kvalitetno.",
          ],
        },
        {
          icon: "undo",
          title: "Iznajmljivanje repova za frizuru",
          points: [
            "Ukoliko za svoju frizuru iznajmljuješ rep iz moje ponude, potrebno je da ga vratiš u roku od 48 sati od preuzimanja, odnosno u dogovorenom roku.",
            "Molim te da rep vratiš uredan i sačuvan, kako bi bio spreman za narednu upotrebu.",
            "U slučaju kašnjenja sa vraćanjem, potrebno je da me blagovremeno obavestiš kako bismo dogovorile dalje korake.",
          ],
        },
      ],
      summary: {
        title: "Ukratko",
        items: [
          { value: "5 min", label: "ranije dođi na termin" },
          { value: "10 min", label: "kašnjenja može značiti otkazivanje" },
          { value: "48 h", label: "unapred otkaži termin" },
          { value: "48 h", label: "rok za povrat repa" },
        ],
      },
    },
    finalCta: {
      title: "Hvala na poverenju!",
      desc: "Hvala ti što biraš moj rad i što poštuješ navedena pravila. Želim da svaka klijentkinja dobije pažljivo izrađenu frizuru, prijatno iskustvo i rezultat u kojem će se osećati lepo, posebno i samouvereno.",
      btn: "Zakaži svoju frizuru",
    },
  },
  EN: {
    title: "Formal Hairstyles",
    accent: "for special occasions",
    subtitle:
      "Curls, waves, updos, high ponytails and other styled looks — carefully crafted so you feel beautiful, special and confident.",
    bookBtn: "Book an Appointment",
    prepBtn: "How to prepare",
    styles: [
      { name: "Ponytails with Hair Extensions", alt: "High ponytail with hair extensions" },
      { name: "Wet Look Hairstyle", alt: "Wet look hairstyle with slicked-back hair" },
      { name: "Sleek Low Bun", alt: "Sleek low bun, back view" },
      { name: "Half-Up, Half-Down Waves", alt: "Half-up, half-down waves, back view" },
    ],
    info: {
      badge: "Information",
      title: "Before you book",
      intro:
        "To make sure your hairstyle looks as beautiful as possible and lasts as long as possible, please keep a few important guidelines in mind before your appointment.",
      items: [
        {
          icon: "gem",
          title: "Services I offer",
          points: [
            "I offer formal hairstyles only, such as curls, waves, updos, high ponytails and other styled looks for special occasions.",
            "Hair washing, blow-drying and haircuts are not part of my services.",
          ],
        },
        {
          icon: "camera",
          title: "Choosing your hairstyle",
          points: [
            "Before your appointment, think about the hairstyle you'd like us to do.",
            "If you have a photo of the hairstyle you want, send it to me in advance so we can agree on the look and check whether it suits your hair length and type.",
            "Photos are meant as inspiration, since the final result depends on your hair's natural texture, thickness and length.",
          ],
        },
        {
          icon: "timer",
          title: "Appointment length",
          points: [
            "A formal hairstyle takes about 30–45 minutes, depending on the style and how complex it is.",
            "Especially complex hairstyles may need extra time, which is why it's important that we agree on the look in advance.",
            "If you also have a makeup appointment or another event on the same day, I recommend planning ahead so we don't have to rush.",
          ],
        },
        {
          icon: "crown",
          title: "Complex hairstyles",
          points: [
            "If you'd like a very complex or detailed hairstyle, send me a photo in advance so we can discuss what's possible and how much time it will take.",
            "Please mention any special requests and details when booking, so we have enough time to prepare and create your look.",
          ],
        },
      ],
    },
    prep: {
      badge: "Before your appointment",
      title: "Preparing your hair",
      steps: [
        {
          title: "Clean, dry hair",
          desc: "Wash your hair the day before your appointment. Your hair should be completely clean and dry when you arrive.",
        },
        {
          title: "No conditioner, masks or oils",
          desc: "Don't use conditioner or smoothing products that make it harder to form curls, or masks and oils that leave your hair too soft and slippery.",
        },
        {
          title: "No styling products",
          desc: "Your hair should be free of gel, hairspray, mousse, dry shampoo and any other styling products.",
        },
        {
          title: "Dry hair, not curled or straightened",
          desc: "Please come to your appointment with dry hair that hasn't been curled or straightened beforehand, unless we've agreed otherwise.",
        },
      ],
    },
    rules: {
      badge: "Important",
      title: "Appointment policies",
      items: [
        {
          icon: "clock",
          title: "Arriving for your appointment",
          points: [
            "Please arrive on time, ideally 5 minutes early, so we can start without rushing.",
            "Arriving more than 10 minutes late may result in your appointment being cancelled, because I want to give every client enough time and attention.",
            "If you know you'll be late, please let me know as soon as possible.",
          ],
        },
        {
          icon: "calendarX",
          title: "Cancelling or rescheduling",
          points: [
            "If you can't make it, please cancel your appointment at least 48 hours in advance.",
            "In case of a late cancellation or no-show, you'll need to pay the full price of the previously booked appointment when you book again.",
            "Thank you for respecting my time and making the slot available to other clients.",
          ],
        },
        {
          icon: "refresh",
          title: "Changing the agreed hairstyle",
          points: [
            "If you'd like to change your hairstyle after we've already agreed on it, please let me know in advance.",
            "Bigger changes from what we originally agreed may need extra time, so it's important to sort them out before your appointment.",
            "Changing the hairstyle at the appointment itself will depend on the time available and whether the new style can be done well.",
          ],
        },
        {
          icon: "undo",
          title: "Ponytail extension rental",
          points: [
            "If you rent a ponytail extension from me for your hairstyle, please return it within 48 hours of pick-up, or by the agreed date.",
            "Please return the ponytail clean and in good condition, so it's ready for the next use.",
            "If you're running late with the return, let me know in good time so we can agree on next steps.",
          ],
        },
      ],
      summary: {
        title: "At a glance",
        items: [
          { value: "5 min", label: "arrive early" },
          { value: "10 min", label: "late may mean cancellation" },
          { value: "48 h", label: "notice to cancel" },
          { value: "48 h", label: "to return the ponytail" },
        ],
      },
    },
    finalCta: {
      title: "Thank you for your trust!",
      desc: "Thank you for choosing my work and for respecting these guidelines. I want every client to get a carefully crafted hairstyle, a pleasant experience and a result that makes her feel beautiful, special and confident.",
      btn: "Book your hairstyle",
    },
  },
};
