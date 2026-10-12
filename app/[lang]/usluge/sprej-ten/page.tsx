import type { Metadata } from "next";
import SprayTanPage from "@/components/services/SprayTanPage";
import { translations } from "@/lib/translations";

// samo naslov taba; ostatak SEO-a ide u završnu SEO fazu
export async function generateMetadata({ params }: PageProps<"/[lang]/usluge/sprej-ten">): Promise<Metadata> {
  const { lang } = await params;
  const name = translations[lang === "en" ? "EN" : "SR"].nav.sprayTan;

  return { title: `${name} | Kika Rajić` };
}

export default function SprejTenPage() {
  return <SprayTanPage />;
}
