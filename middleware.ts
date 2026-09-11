import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const adminCookie = req.cookies.get("admin_session")?.value;

  // Ako korisnik pokuša da pristupi /admin (osim /admin/login), a nema kolačić
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!adminCookie || adminCookie !== "authenticated") {
      const loginUrl = new URL("/admin/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Ako je ulogovan i pokuša da otvori /admin/login, šaljemo ga direktno na dashboard
  if (pathname === "/admin/login" && adminCookie === "authenticated") {
    const dashboardUrl = new URL("/admin", req.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};