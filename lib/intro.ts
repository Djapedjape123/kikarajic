// Loader (crni ekran sa logom) se prikazuje samo jednom po poseti (sessionStorage = jedan tab).
// Pri osvežavanju ili ponovnom ulasku u istoj sesiji preskače se, a animacije koje su
// čekale loader (Navbar, Hero, Instagram dugme) kreću odmah.
export const INTRO_KEY = "kr_intro_seen";

// skripta u <head>-u: obeležava <html> pre prvog iscrtavanja, da loader ne bljesne
export const INTRO_HEAD_SCRIPT = `try{if(sessionStorage.getItem("${INTRO_KEY}"))document.documentElement.setAttribute("data-intro-seen","")}catch(e){}`;

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
