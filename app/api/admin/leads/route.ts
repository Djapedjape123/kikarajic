import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

// Provera autorizacije dešifrovanjem JWT tokena
async function checkAuth() {
  const cookieStore = await cookies();
  const adminCookie = cookieStore.get("admin_session")?.value;

  if (!adminCookie) return false;

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    // Ako token nije validan, istekao je ili je ručno menjan, jwtVerify će izbaciti grešku
    await jwtVerify(adminCookie, secret);
    return true;
  } catch (err) {
    return false;
  }
}

// GET: Čitanje svih prijava
export async function GET() {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from("workshop_leads")
      .select("*")
      .order("created_at", { ascending: false }); 

    if (error) throw error;
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Greška pri učitavanju podataka" }, { status: 500 });
  }
}

// DELETE: Brisanje jedne prijave
export async function DELETE(req: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "ID je obavezan" }, { status: 400 });

    const { error } = await supabaseAdmin
      .from("workshop_leads")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return NextResponse.json({ message: "Uspešno obrisano" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Greška pri brisanju" }, { status: 500 });
  }
}