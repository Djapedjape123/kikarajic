import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    const envUser = process.env.ADMIN_USERNAME;
    const envPass = process.env.ADMIN_PASSWORD;

    if (username === envUser && password === envPass) {
      const response = NextResponse.json({ message: "Uspešna prijava!" }, { status: 200 });

      // Postavljamo HTTP-only cookie koji važi 24h
      response.cookies.set("admin_session", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24, // 1 dan
      });

      return response;
    }

    return NextResponse.json(
      { error: "Pogrešno korisničko ime ili lozinka." },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { error: "Došlo je do greške na serveru." },
      { status: 500 }
    );
  }
}