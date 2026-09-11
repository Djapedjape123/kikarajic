import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const adminCookie = req.cookies.get("admin_session")?.value;
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  let isValid = false;

  if (adminCookie) {
    try {
      await jwtVerify(adminCookie, secret);
      isValid = true;
    } catch (err) {
      isValid = false;
    }
  }

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!isValid) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  if (pathname === "/admin/login" && isValid) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };