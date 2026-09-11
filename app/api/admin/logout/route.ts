import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Uspešna odjava" }, { status: 200 });
  
  // Brišemo kolačić postavljanjem maxAge na 0
  response.cookies.set("admin_session", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });

  return response;
}