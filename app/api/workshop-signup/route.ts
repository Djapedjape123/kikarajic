import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
    try {
        // 1. Čitamo podatke koje je modal poslao
        const body = await req.json();
        const { name, email, workshopName, workshopDate } = body;

        // Validacija na serveru (za svaki slučaj)
        if (!name || !email || !workshopName) {
            return NextResponse.json(
                { error: "Nedostaju obavezna polja" },
                { status: 400 }
            );
        }

        // 2. Upisujemo podatke u Supabase bazu
        const { error: dbError } = await supabaseAdmin
            .from("workshop_leads")
            .insert([
                {
                    name: name,
                    email: email,
                    workshop_name: workshopName,
                    workshop_date: workshopDate,
                },
            ]);

        // Ako baza vrati grešku, prekidamo
        if (dbError) {
            console.error("Supabase greška:", dbError);
            throw new Error("Greška pri upisu u bazu");
        }

        // 3. (Ovde će kasnije doći kod za slanje mejla Kiki preko Resend-a)

        // 4. Vraćamo uspešan odgovor modalu (što trigeruje onu lepu animaciju rotiranja)
        return NextResponse.json(
            { message: "Uspesna prijava!" },
            { status: 200 }
        );

    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json(
            { error: "Došlo je do greške na serveru." },
            { status: 500 }
        );
    }
}