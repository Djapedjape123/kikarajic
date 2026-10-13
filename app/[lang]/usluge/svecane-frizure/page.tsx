import type { Metadata } from "next";
import HairstylesPage from "@/components/services/HairstylesPage";
import { translations } from "@/lib/translations";

// samo naslov taba; ostatak SEO-a ide u završnu SEO fazu
export async function generateMetadata({ params }: PageProps<"/[lang]/usluge/svecane-frizure">): Promise<Metadata> {
  const { lang } = await params;
  const name = translations[lang === "en" ? "EN" : "SR"].nav.hairstyles;

  return { title: `${name} | Kika Rajić` };
}

export default function SvecaneFrizurePage() {
  return <HairstylesPage />;
}
