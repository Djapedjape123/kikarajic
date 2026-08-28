export type Language = 'SR' | 'EN';

export const translations = {
  SR: {
    nav: {
      about: 'O meni',
      gallery: 'Galerija',
      makeup: 'Šminka',
      sprayTan: 'Sprej ten',
      services: 'Usluge',
      educations: 'Edukacije',
      studio: 'Studio'
    },
    brands: {
      title: "Brendovi sa kojima sarađujem"
    },
    serviceLinks: [
      { name: "Šminka", href: "/sminka" },
      { name: "Sprej ten", href: "/sprej-ten" },
      { name: "Svečane frizure", href: "/svecane-frizure" },
    ],
    hero: {
      subtitle: 'Otkrijte svoju savršenu verziju uz profesionalno šminkanje, frizure i premium sprej ten tretmane.',
      bookBtn: 'Zakaži termin',
      workshopBtn: 'WorkShop Prijave'
    },
    // NOVO: Dodati prevodi za statistike
    stats: {
      badge: "Iskustvo i poverenje",
      items: {
        yearsWork: "Godina rada",
        yearsEdu: "Godina edukacija",
        clients: "Zadovoljnih klijenata",
        students: "Učenica",
        masterclasses: "Masterclassova"
      }
    },
    // NOVO: Edukacije na srpskom
    eduLinks: [
      { name: "Škola šminkanja", href: "/edukacije/1-1-bazna" },
      { name: "Workshops", href: "/edukacije/skola-sminke" },
      { name: "Bazna obuka", href: "/edukacije/perfekto" },
      { name: "Usavršavanje za sminkere", href: "/edukacije/usavrsavanje" },
      { name: "Perfect yourself", href: "/edukacije/n-sam-by-tamara" },
    ]
  },
  EN: {
    nav: {
      about: 'About me',
      gallery: 'Gallery',
      makeup: 'Makeup',
      services: 'Services', 
      sprayTan: 'Spray Tan',
      educations: 'Educations',
      studio: 'Studio'
    },
    brands: {
      title: "Brands I collaborate with"
    },
    hero: {
      subtitle: 'Discover your perfect version with professional makeup, hairstyling, and premium spray tan treatments.',
      bookBtn: 'Book an Appointment',
      workshopBtn: 'WorkShop Signups'
    },
    // NOVO: Dodati prevodi za statistike (Engleski)
    stats: {
      badge: "Experience & Trust",
      items: {
        yearsWork: "Years working",
        yearsEdu: "Years teaching",
        clients: "Happy clients",
        students: "Students",
        masterclasses: "Masterclasses"
      }
    },
    // NOVO: Edukacije na engleskom (zadržano i netaknuto kako si tražio)
    serviceLinks: [
      { name: "Makeup", href: "/sminka" },
      { name: "Spray Tan", href: "/sprej-ten" },
      { name: "Formal Hairstyles", href: "/svecane-frizure" },
    ],
    eduLinks: [
      { name: "Makeup School", href: "/edukacije/1-1-bazna" },
      { name: "Workshops", href: "/edukacije/skola-sminke" },
      { name: "Basic Training", href: "/edukacije/perfekto" },
      { name: "Advanced for Makeup Artists", href: "/edukacije/usavrsavanje" },
      { name: "Perfect yourself", href: "/edukacije/n-sam-by-tamara" },
    ]
  }
};