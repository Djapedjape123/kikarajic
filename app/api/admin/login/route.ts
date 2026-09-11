import { NextResponse } from "next/server";
import { SignJWT } from "jose";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    const envUser = process.env.ADMIN_USERNAME;
    const envPass = process.env.ADMIN_PASSWORD;
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    if (username === envUser && password === envPass) {
      // Pravimo neprobojni potpisani token koji važi 24h
      const token = await new SignJWT({ role: "admin" })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(secret);

      const response = NextResponse.json({ message: "Uspešna prijava!" }, { status: 200 });

      response.cookies.set("admin_session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24,
      });

      return response;
    }

    return NextResponse.json({ error: "Pogrešni podaci." }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "Serverska greška." }, { status: 500 });
  }
}