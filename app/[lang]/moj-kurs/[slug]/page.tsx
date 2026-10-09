import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CoursePlayer from "@/components/CoursePlayer";
import { COURSES, getCourse } from "@/lib/courses";

// pravi stranicu za svaki kurs unapred: /sr/moj-kurs/masterclass-sr ...
export function generateStaticParams() {
  return COURSES.map((course) => ({ slug: course.slug }));
}

// nepoznat kurs u adresi vraća 404
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/[lang]/moj-kurs/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const course = getCourse(slug);

  return {
    title: course ? `${course.title[lang === "en" ? "EN" : "SR"]} | Kika Rajić` : "Kika Rajić",
    // stranica za polaznike - ne sme u Google pretragu
    robots: { index: false, follow: false },
  };
}

export default async function MojKursPage({ params }: PageProps<"/[lang]/moj-kurs/[slug]">) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  return <CoursePlayer course={course} />;
}
