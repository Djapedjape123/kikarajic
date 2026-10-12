import type { Language } from "@/lib/translations";

// Jedino mesto za tekst i slike stranice "Sprej ten" (/usluge/sprej-ten).
// Tekst nije u translations.ts jer taj fajl ide u JS svake stranice (učitava ga LanguageContext u layoutu).

// TODO (PRIVREMENO): ovo su slike koje već postoje na sajtu (O meni / Edukacije), samo da se vidi izgled stranice.
// Zameniti sa 7 Cloudinary linkova za sprej ten: hero, prep, care i 4 za galeriju rezultata.
export const SPRAY_TAN_IMAGES = {
  hero: "https://res.cloudinary.com/duomot4hp/image/upload/v1791820622/WhatsApp_Image_2026-10-12_at_15.21.06_ccgwme.jpg",
  prep: "https://res.cloudinary.com/duomot4hp/image/upload/v1791820609/WhatsApp_Image_2026-10-12_at_15.21.05_asrs02.jpg",
  care: "https://res.cloudinary.com/duomot4hp/image/upload/v1791820666/WhatsApp_Image_2026-10-12_at_15.21.06_4_huhsys.jpg",
  gallery: [
    "https://res.cloudinary.com/duomot4hp/image/upload/v1791820644/WhatsApp_Image_2026-10-12_at_15.21.06_2_ukw91a.jpg",
    "https://res.cloudinary.com/duomot4hp/image/upload/v1791820644/WhatsApp_Image_2026-10-12_at_15.21.06_2_ukw91a.jpg",
    "https://res.cloudinary.com/duomot4hp/image/upload/v1791820633/WhatsApp_Image_2026-10-12_at_15.21.06_1_bcguxq.jpg",
    "https://res.cloudinary.com/duomot4hp/image/upload/v1791820622/WhatsApp_Image_2026-10-12_at_15.21.06_ccgwme.jpg",
  ],
};

// ikonica kartice u "Dobro je znati" (prave se u SprayTanPage, ovde ostaje samo podatak)
export type FactIcon = "calendar" | "timer" | "users" | "baby";

type Step = { title: string; desc: string };
// avoid: stavka "izbegavajte" (X ikonica), inače stavka "uradite" (Check ikonica)
type CareStep = Step & { avoid?: boolean };

export type SprayTanContent = {
  // hero
  title: string;
  accent: string; // reč u skriptnom fontu, ispod naslova
  subtitle: string;
  bookBtn: string;
  prepBtn: string;
  // pitanja i odgovori (kada, koliko traje, za koga, trudnice)
  facts: { badge: string; title: string; items: { icon: FactIcon; question: string; answer: string }[] };
  prep: { badge: string; title: string; steps: Step[] };
  care: { badge: string; title: string; steps: CareStep[] };
  galleryTitle: string;
  finalCta: { title: string; desc: string; btn: string };
  alt: { hero: string; prep: string; care: string; gallery: string[] };
};

// Record<Language, ...>: TypeScript prijavljuje grešku ako u EN nedostaje bilo koji deo SR teksta
export const SPRAY_TAN: Record<Language, SprayTanContent> = {
  SR: {
    title: "Sprej ten",
    accent: "bronzani sjaj",
    subtitle:
      "Spray tan je veštačko tamnjenje kože pomoću spreja koji se ravnomerno nanosi na telo, kako bi koža dobila preplanuli, bronzani ten — bez sunčanja i solarijuma.",
    bookBtn: "Zakaži termin",
    prepBtn: "Kako se pripremiti",
    facts: {
      badge: "Informacije",
      title: "Dobro je znati",
      items: [
        {
          icon: "calendar",
          question: "Kada je najbolje uraditi spray tan?",
          answer:
            "Ukoliko se pripremate za neku posebnu priliku, poput proslave, svadbe, rođendana, mature ili izlaska, najbolje je uraditi spray tan dva dana pre događaja. Na taj način ten ima dovoljno vremena da se razvije, da se nakon prvog tuširanja ukloni višak bronzera i da koža dobije prirodan, ujednačen i lep bronzani izgled.",
        },
        {
          icon: "timer",
          question: "Koliko traje spray tan?",
          answer:
            "Trajanje spray tana može varirati u zavisnosti od tipa kože, pripreme pre tretmana, nege nakon tretmana i načina života. Uz pravilnu pripremu i odgovarajuću negu, ten može trajati približno 5–10 dana, postepeno i prirodno bledeći.",
        },
        {
          icon: "users",
          question: "Da li je spray tan namenjen svima?",
          answer:
            "Spray tan je namenjen devojkama i ženama svih uzrasta koje žele preplanuli, bronzani ten bez izlaganja suncu i odlaska u solarijum.",
        },
        {
          icon: "baby",
          question: "Da li trudnice mogu da rade spray tan?",
          answer: "Da, spray tan mogu da rade i trudnice!",
        },
      ],
    },
    prep: {
      badge: "Pre tretmana",
      title: "Kako se pripremiti za spray taniranje?",
      steps: [
        {
          title: "Piling",
          desc: "Pre vašeg termina za spray taniranje, važno je da izvršite piling kože kako biste uklonili mrtve ćelije kože. To pomaže u stvaranju glatke površine na koju će se tanning rastvor ravnomerno naneti. Koristite blagi piling ili sunđer za piling da nežno istrljate telo, posebno obraćajući pažnju na grube delove kao što su laktovi, kolena i članci.",
        },
        {
          title: "Brijanje ili depilacija",
          desc: "Ako želite da imate glatku kožu bez dlačica, preporučuje se da se obrijete ili depilirate najmanje 24 sata pre termina za spray taniranje. To omogućava koži da se oporavi i smanjuje rizik od iritacije od tanning rastvora.",
        },
        {
          title: "Izbegavajte hidratantne kreme i ulja",
          desc: "Na dan vašeg spray taniranja izbegavajte nanošenje hidratantnih krema, ulja ili losiona na kožu. Ovi proizvodi mogu stvoriti barijeru i ometati ravnomerno nanošenje tanning rastvora. Najbolje je da imate čistu i suvu kožu pre termina.",
        },
        {
          title: "Uklonite šminku i dezodorans",
          desc: "Pre spray taniranja uklonite svu šminku, dezodorans i druge proizvode sa kože. Oni takođe mogu stvoriti barijeru i uticati na rezultat tana. Preporučuje se da pre tretmana temeljno očistite kožu i uklonite sve ostatke proizvoda.",
        },
        {
          title: "Nosite široke, tamne odevne predmete",
          desc: "Odaberite široku, tamnu odeću koju ćete nositi na terminu za spray taniranje. Tesna odeća ili donje rublje mogu trljati o tanning rastvor i izazvati pruge ili neujednačenost. Tamna odeća pomaže u smanjenju vidljivosti mogućih fleka od početnog bronzera u tanning rastvoru.",
        },
        {
          title: "Ponesite zaštitnu opremu",
          desc: "U zavisnosti od salona ili tehničara, može vam biti obezbeđeno jednokratno donje rublje ili zaštitne papuče za određene delove tela. Ipak, dobra je ideja da ponesete svoje tamno donje rublje ili kupaći kostim, kao i japanke ili sandale koje ćete nositi nakon tretmana.",
        },
      ],
    },
    care: {
      badge: "Posle tretmana",
      title: "Kako negovati spray tan da traje što duže?",
      steps: [
        {
          avoid: true,
          title: "Izbegavajte vodu i znojenje",
          desc: "Prvih 8–12 sati nakon spray taniranja važno je izbegavati aktivnosti koje mogu izazvati prekomerno znojenje ili kontakt sa vodom. To uključuje vežbanje, plivanje i duge tuševe. Voda može uticati na ravnomeran razvoj tena, pa je najbolje sačekati završetak početnog razvojnog perioda. Uvek pratite preporuku za ispiranje koju dobijete u salonu, jer vreme može zavisiti od formule koju koristite.",
        },
        {
          title: "Redovno hidrirajte kožu",
          desc: "Održavanje hidrirane kože ključno je za očuvanje spray tana. Svakodnevno hidrirajte kožu blagom hidratantnom kremom koja odgovara vašem tipu kože. To pomaže da ten duže izgleda lepo i ujednačeno i sprečava isušivanje kože.",
        },
        {
          title: "Tapkajte kožu nakon tuširanja",
          desc: "Prilikom tuširanja izbegavajte grubo trljanje kože peškirom. Umesto toga, nežno tapkajte kožu kako biste sprečili nepotrebno uklanjanje površinskog sloja kože i ubrzano izbleđivanje tena. Isto uradite nakon svakog tuširanja ili kupanja.",
        },
        {
          avoid: true,
          title: "Izbegavajte jake sapune i pilinge",
          desc: "Da biste sprečili prerano izbleđivanje, izbegavajte upotrebu jakih sapuna, pilinga ili grubih sunđera na koži. Oni mogu ukloniti površinski sloj kože i dovesti do bržeg nestajanja tena. Umesto toga, koristite blage čistače i izbegavajte preterano grubo trljanje kože.",
        },
        {
          avoid: true,
          title: "Izbegavajte hlor i morsku vodu",
          desc: "Hlor i morska voda mogu doprineti bržem izbleđivanju spray tana. Ako planirate da plivate, imajte na umu da ni vodootporna krema za sunčanje ne može u potpunosti sprečiti uticaj vode na ten. Nakon plivanja isperite se svežom vodom i nežno tapkajte kožu peškirom.",
        },
        {
          avoid: true,
          title: "Ograničite izlaganje vrućim kadama i saunama",
          desc: "Produženo izlaganje vrućim kadama, saunama ili parnim sobama može ubrzati izbleđivanje spray tana. Toplota, vlaga i znojenje mogu uticati na postojanost tena. Ako koristite ove objekte, pokušajte da ograničite vreme provedeno u njima.",
        },
      ],
    },
    galleryTitle: "Rezultati",
    finalCta: {
      title: "Naš savet",
      desc: "Ako želite savršen bronzani ten za posebnu priliku, zakažite svoj spray tan dva dana ranije i pridržavajte se saveta za pripremu i negu. Tako ćete imati dovoljno vremena da se ten razvije i da vaša koža zablista u svom najlepšem, prirodnom bronzanom izdanju.",
      btn: "Zakaži svoj spray tan",
    },
    alt: {
      hero: "Bronzani ten nakon spray tana",
      prep: "Ujednačen bronzani ten nakon spray tana",
      care: "Negovan spray tan, bronzani ten",
      gallery: ["Rezultat spray tana 1", "Rezultat spray tana 2", "Rezultat spray tana 3", "Rezultat spray tana 4"],
    },
  },
  EN: {
    title: "Spray Tan",
    accent: "bronzed glow",
    subtitle:
      "Spray tan is sunless tanning: a spray applied evenly over the body to give your skin a sun-kissed, bronzed tan, without sunbathing or tanning beds.",
    bookBtn: "Book an Appointment",
    prepBtn: "How to prepare",
    facts: {
      badge: "Information",
      title: "Good to know",
      items: [
        {
          icon: "calendar",
          question: "When is the best time to get a spray tan?",
          answer:
            "If you're getting ready for a special occasion, such as a celebration, wedding, birthday, graduation or a night out, the best time for a spray tan is two days before the event. This gives your tan enough time to develop, lets the excess bronzer wash off after your first shower, and leaves your skin with a natural, even and beautiful bronzed look.",
        },
        {
          icon: "timer",
          question: "How long does a spray tan last?",
          answer:
            "How long a spray tan lasts depends on your skin type, how you prepare beforehand, the aftercare and your lifestyle. With proper preparation and the right aftercare, your tan can last roughly 5–10 days, gradually and naturally fading.",
        },
        {
          icon: "users",
          question: "Is spray tan for everyone?",
          answer:
            "Spray tan is for girls and women of all ages who want a sun-kissed, bronzed tan without sun exposure or tanning beds.",
        },
        {
          icon: "baby",
          question: "Can pregnant women get a spray tan?",
          answer: "Yes, pregnant women can get a spray tan too!",
        },
      ],
    },
    prep: {
      badge: "Before your tan",
      title: "How to prepare for a spray tan?",
      steps: [
        {
          title: "Exfoliate",
          desc: "Before your spray tan appointment, it's important to exfoliate to remove dead skin cells. This creates a smooth surface for the tanning solution to go on evenly. Use a gentle scrub or an exfoliating sponge to buff your body, paying special attention to rough areas such as the elbows, knees and ankles.",
        },
        {
          title: "Shave or wax",
          desc: "If you want smooth, hair-free skin, we recommend shaving or waxing at least 24 hours before your spray tan appointment. This gives your skin time to recover and lowers the risk of irritation from the tanning solution.",
        },
        {
          title: "Skip moisturizers and oils",
          desc: "On the day of your spray tan, avoid applying moisturizers, oils or lotions to your skin. These products can create a barrier and get in the way of an even application of the tanning solution. It's best to arrive with clean, dry skin.",
        },
        {
          title: "Remove makeup and deodorant",
          desc: "Before your spray tan, remove all makeup, deodorant and other products from your skin. They can also create a barrier and affect the result of your tan. We recommend thoroughly cleansing your skin and removing any residue before the treatment.",
        },
        {
          title: "Wear loose, dark clothing",
          desc: "Choose loose, dark clothing to wear to your spray tan appointment. Tight clothing or underwear can rub against the tanning solution and cause streaks or unevenness. Dark clothes help make any stains from the initial bronzer in the tanning solution less visible.",
        },
        {
          title: "Bring protective items",
          desc: "Depending on the salon or technician, you may be given disposable underwear or protective slippers for certain areas of the body. Still, it's a good idea to bring your own dark underwear or swimsuit, as well as flip-flops or sandals to wear after the treatment.",
        },
      ],
    },
    care: {
      badge: "After your tan",
      title: "How to care for your spray tan so it lasts longer?",
      steps: [
        {
          avoid: true,
          title: "Avoid water and sweating",
          desc: "For the first 8–12 hours after your spray tan, it's important to avoid activities that can cause heavy sweating or contact with water. That includes working out, swimming and long showers. Water can affect how evenly your tan develops, so it's best to wait until the initial development period is over. Always follow the rinse-off guidance you get at the salon, as the timing can depend on the formula used.",
        },
        {
          title: "Moisturize regularly",
          desc: "Keeping your skin hydrated is key to preserving your spray tan. Moisturize daily with a gentle moisturizer that suits your skin type. It helps your tan look beautiful and even for longer and prevents your skin from drying out.",
        },
        {
          title: "Pat your skin dry after showering",
          desc: "When you shower, avoid rubbing your skin roughly with a towel. Instead, gently pat your skin dry to avoid unnecessarily removing the top layer of skin and fading your tan faster. Do the same after every shower or bath.",
        },
        {
          avoid: true,
          title: "Avoid harsh soaps and scrubs",
          desc: "To prevent premature fading, avoid using harsh soaps, scrubs or rough sponges on your skin. They can strip away the top layer of skin and make your tan disappear faster. Use gentle cleansers instead and avoid scrubbing your skin too hard.",
        },
        {
          avoid: true,
          title: "Avoid chlorine and sea water",
          desc: "Chlorine and sea water can make your spray tan fade faster. If you're planning to swim, keep in mind that even waterproof sunscreen can't fully protect your tan from the effects of water. After swimming, rinse off with fresh water and gently pat your skin dry with a towel.",
        },
        {
          avoid: true,
          title: "Limit hot tubs and saunas",
          desc: "Extended time in hot tubs, saunas or steam rooms can make your spray tan fade faster. Heat, humidity and sweating can affect how long your tan lasts. If you use these facilities, try to limit the time you spend in them.",
        },
      ],
    },
    galleryTitle: "Results",
    finalCta: {
      title: "Our advice",
      desc: "If you want the perfect bronzed tan for a special occasion, book your spray tan two days ahead and follow the tips for preparation and aftercare. That way, you'll have enough time for your tan to develop and for your skin to glow in its most beautiful, natural bronzed finish.",
      btn: "Book your spray tan",
    },
    alt: {
      hero: "Bronzed tan after a spray tan",
      prep: "Even, bronzed tan after a spray tan",
      care: "Well-kept spray tan, bronzed skin",
      gallery: ["Spray tan result 1", "Spray tan result 2", "Spray tan result 3", "Spray tan result 4"],
    },
  },
};
