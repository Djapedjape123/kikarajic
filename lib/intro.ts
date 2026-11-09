// Loader (crni ekran sa logom) se prikazuje samo jednom po poseti (sessionStorage = jedan tab).
// Pri osvežavanju ili ponovnom ulasku u istoj sesiji preskače se, a animacije koje su
// čekale loader (Navbar, Hero, Instagram dugme) kreću odmah.
export const INTRO_KEY = "kr_intro_seen";

declare global {
  interface Window {
    // trenutak kad je <head> pročitan (praktično prvo iscrtavanje) - od njega se računa loader
    __krIntroStart?: number;
  }
}

// skripta u <head>-u: beleži trenutak otvaranja stranice i obeležava <html> pre prvog iscrtavanja, da loader ne bljesne
export const INTRO_HEAD_SCRIPT = `window.__krIntroStart=performance.now();try{if(sessionStorage.getItem("${INTRO_KEY}"))document.documentElement.setAttribute("data-intro-seen","")}catch(e){}`;

export function isIntroSeen() {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(INTRO_KEY) === "1";
  } catch {
    return false;
  }
}

export function markIntroSeen() {
  try {
    sessionStorage.setItem(INTRO_KEY, "1");
  } catch {}
}

// Koliko je ostalo od pauze od `ms` milisekundi, računato od OTVARANJA stranice, a ne od trenutka
// kad se JS učita - na sporom telefonu se čekanje na JS i loader više ne sabiraju.
// Ako je loader već viđen u ovoj poseti, nema čekanja; ako trenutak otvaranja nije poznat, čeka se ceo `ms`.
export function introRemaining(ms: number) {
  if (typeof window === "undefined") return ms;
  if (isIntroSeen()) return 0;
  const start = window.__krIntroStart;
  if (start === undefined) return ms;
  return Math.max(0, ms - (performance.now() - start));
}
