import type { Metadata } from "next";
import Link from "next/link";
import AboutPageClient from "@/components/about/AboutPageClient";
import { luxurious } from "@/lib/fonts";
import { translations } from "@/lib/translations";

// samo naslov taba; ostatak SEO-a ide u završnu SEO fazu
export async function generateMetadata({ params }: PageProps<"/[lang]/o-meni">): Promise<Metadata> {
    const { lang } = await params;
    const name = translations[lang === "en" ? "EN" : "SR"].nav.about;

    return { title: `${name} | Kika Rajić` };
}

// Server komponenta: tekst stiže kao gotov HTML (nije u JS-u), jezik se čita iz adrese (/sr ili /en).
// Slajder, lightbox i animacija pojavljivanja teksta su u components/about/AboutPageClient.tsx.
export default async function AboutPage({ params }: PageProps<"/[lang]/o-meni">) {
    const { lang } = await params;
    const t = translations[lang === "en" ? "EN" : "SR"];

    return (
        <AboutPageClient clickLabel={t.about.klikni}>
            <span data-about-reveal className="text-[#bc1888] font-bold uppercase tracking-[0.25em] text-xs sm:text-sm mb-3 block">
                {t.about.badge}
            </span>

            <h1 data-about-reveal className="text-4xl sm:text-5xl md:text-6xl font-serif text-stone-800 mb-8 leading-tight">
                {t.about.title} <span className={`${luxurious.className} text-5xl sm:text-6xl md:text-7xl text-[#bc1888] inline-block`}>Kika Rajić</span>
            </h1>

            <div className="space-y-5 text-stone-700 text-base sm:text-lg leading-relaxed font-light">
                <p data-about-reveal>{t.about.p1}</p>
                <p data-about-reveal>{t.about.p2}</p>
                <p data-about-reveal>{t.about.p3}</p>
                <p data-about-reveal>{t.about.p4}</p>
            </div>

            <div data-about-reveal className="mt-8 p-6 rounded-2xl bg-white/70 border-l-4 border-[#bc1888] shadow-sm backdrop-blur-sm">
                <p className="italic text-stone-800 font-serif text-xl">
                    &ldquo;{t.about.quote}&rdquo;
                </p>
            </div>

            <Link
                data-about-reveal
                href={`/${lang}/edukacije/skola-sminkanja`}
                className="mt-7 self-start rounded-full bg-[#bc1888] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#bc1888]/20 transition-transform hover:-translate-y-1 hover:bg-[#a91579]"
            >
                {t.nav.educations}
            </Link>
        </AboutPageClient>
    );
}
