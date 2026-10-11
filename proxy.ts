import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["sr", "en"];

// adresa bez jezika (npr. /o-meni) -> /sr/o-meni, ili /en/o-meni ako je korisnik ranije izabrao EN
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (hasLocale) return;

  const saved = request.cookies.get("NEXT_LOCALE")?.value;
  const locale = saved && locales.includes(saved) ? saved : "sr";

  request.nextUrl.pathname = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // preskače API rute, Next.js interne fajlove, fajlove sa ekstenzijom (icon.png, slike...)
  // i adrese koje već imaju jezik (/sr, /sr/..., /en, /en/...) - tu proxy nema šta da radi
  matcher: ["/((?!api|_next|sr(?:/|$)|en(?:/|$)|.*\\..*).*)"],
};
