import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { z } from "zod";

// Striktna pravila šta sme da uđe u bazu
const leadSchema = z.object({
  name: z.string().trim().min(2, "Ime je prekratko").max(100, "Ime je predugačko"),
  email: z.string().trim().email("Nevažeća email adresa").max(100, "Email je predugačak"),
  workshopName: z.string().trim().min(2).max(100),
  workshopDate: z.string().trim().min(2).max(50),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        
        // Zod proverava i "čisti" podatke (trimuje razmake)
        const validatedData = leadSchema.safeParse(body);

        if (!validatedData.success) {
            return NextResponse.json(
                { error: "Neispravni podaci", details: validatedData.error.format() },
                { status: 400 }
            );
        }

        const { name, email, workshopName, workshopDate } = validatedData.data;

        const { error: dbError } = await supabaseAdmin
            .from("workshop_leads")
            .insert([{ name, email, workshop_name: workshopName, workshop_date: workshopDate }]);

        if (dbError) throw new Error("Greška pri upisu");

        return NextResponse.json({ message: "Uspešna prijava!" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Serverska greška" }, { status: 500 });
    }
}