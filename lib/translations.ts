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
    location: {
      badge: "Lokacija",
      title: "Kako do nas?",
      desc: "Naš studio se nalazi na pristupačnoj lokaciji u Novom Sadu. Radujemo se vašem dolasku!",
      address_label: "Adresa",
      address_value: "Bore Prodanovića 1A",
      address_note: "(Ulaz je u prizemlju zgrade)",
      email_label: "Email adresa",
      phone_label: "Telefon",
      hours_label: "Radno vreme",
      hours_week: "Ponedeljak - Petak: 09:00 - 18:00",
      hours_weekend: "Subota: Po dogovoru",
      nav_button: "Uključi navigaciju",
      pin_title: "Kika Rajić Studio",
      pin_sub: "Vaša oaza lepote"
    },
    // NOVO: Edukacije na srpskom
    eduLinks: [
      { name: "Škola šminkanja", href: "/edukacije/1-1-bazna" },
      { name: "Workshops", href: "/edukacije/skola-sminke" },
      { name: "Bazna obuka", href: "/edukacije/perfekto" },
      { name: "Usavršavanje za sminkere", href: "/edukacije/usavrsavanje" },
      { name: "Perfect yourself", href: "/edukacije/n-sam-by-tamara" },
    ],
    about: {
      badge: "Moj put",
      title: "O meni & ",
      p1: "Moje ime je Kika Rajić, osnivačica i vlasnica Kika Rajić Studia — beauty prostora koji je nastao iz moje ljubavi prema šminkanju, edukaciji i stvaranju.",
      p2: "Šminkanjem se bavim već 10 godina, a poslednjih 6 godina sam i edukator, gde prenosim svoje znanje, iskustvo i ljubav prema šminkanju na više od 500 polaznika. Do danas sam imala priliku da našminkam više od 5.000 klijenata, održim brojne masterclass-ove, radim kampanje, spotove, putujem na različite destinacije kako bi klijenti nosili baš moju šminku i ostvarim saradnje sa različitim beauty brendovima, kao i da učestvujem u kreiranju sadržaja i snimanjima za društvene mreže.",
      p3: "Verujem da šminka nije samo tehnika, već način da istaknemo ono najlepše u sebi, a upravo tu filozofiju želim da prenesem i kroz novi koncept Kika Rajić Studia.",
      p4: "Novi studio nastao je sa željom da šminkanje i edukaciju podignemo na potpuno novi nivo. Kroz spoj znanja, iskustva, estetike i ljubavi prema ovom poslu, trudim se da svako od vas dobije jedinstveno iskustvo i oseća se posebno za svaku priliku.",
      quote: "Ovo je tek početak..."
    }
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
    ],
    location: {
      badge: "Location",
      title: "How to find us?",
      desc: "Our studio is located in an easily accessible area in Novi Sad. We look forward to seeing you!",
      address_label: "Address",
      address_value: "Bore Prodanovića 1A",
      address_note: "(Ground floor entrance)",
      email_label: "Email Address",
      phone_label: "Phone",
      hours_label: "Working Hours",
      hours_week: "Monday - Friday: 09:00 - 18:00",
      hours_weekend: "Saturday: By appointment",
      nav_button: "Get Directions",
      pin_title: "Kika Rajić Studio",
      pin_sub: "Your beauty oasis"
    },
    about: {
      badge: "My Journey",
      title: "About me & ",
      p1: "My name is Kika Rajić, founder and owner of Kika Rajić Studio — a beauty space born out of my love for makeup, education, and creation.",
      p2: "I have been working as a makeup artist for 10 years, and for the last 6 years, I've also been an educator, passing on my knowledge, experience, and passion for makeup to over 500 students. To date, I have had the privilege of doing makeup for more than 5,000 clients, holding numerous masterclasses, working on campaigns and music videos, traveling to various destinations so clients could wear my makeup, collaborating with different beauty brands, and participating in content creation for social media.",
      p3: "I believe that makeup is not just a technique, but a way to highlight the most beautiful parts of ourselves. That is exactly the philosophy I want to convey through the new concept of Kika Rajić Studio.",
      p4: "The new studio was created with the desire to elevate makeup and education to a completely new level. Through a blend of knowledge, experience, aesthetics, and love for this profession, I strive to ensure that each of you receives a unique experience and feels special for every occasion.",
      quote: "This is just the beginning..."
    }
  }
};