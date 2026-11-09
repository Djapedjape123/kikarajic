// Stranice iz menija koje još ne postoje. Za njih je prefetch isključen (inače bi Next unapred skidao 404 stranicu).
// Kad se stranica napravi, skloni je odavde - link će se tada učitavati unapred i otvarati odmah.
const UNFINISHED_ROUTES = new Set(["/galerija", "/studio", "/usluge/sminka"]);

// vrednost za <Link prefetch>: false za stranice koje ne postoje, inače podrazumevano ponašanje Next-a
export function prefetchFor(href: string) {
  return UNFINISHED_ROUTES.has(href) ? false : undefined;
}
