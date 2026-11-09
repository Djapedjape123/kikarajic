import type { Metadata } from "next";
import CoursesCatalog from "@/components/courses/CoursesCatalog";
import { translations } from "@/lib/translations";

// samo naslov taba; ostatak SEO-a ide u završnu SEO fazu
export async function generateMetadata({ params }: PageProps<"/[lang]/kursevi">): Promise<Metadata> {
  const { lang } = await params;
  const name = translations[lang === "en" ? "EN" : "SR"].nav.kursevi;

  return { title: `${name} | Kika Rajić` };
}

export default function KurseviPage() {
  return <CoursesCatalog />;
}
