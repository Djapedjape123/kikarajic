import type { Metadata } from "next";
import Link from "next/link";
import { AlertCircle, ExternalLink } from "lucide-react";
import ApproveCourseButton from "@/components/ApproveCourseButton";
import { verifyApprovalToken } from "@/lib/approvalToken";
import { driveViewUrl, getCourse } from "@/lib/courses";

export const metadata: Metadata = {
  title: "Odobri pristup | Kika Rajić",
  // stranica samo za Kiku - ne sme u Google pretragu
  robots: { index: false, follow: false },
};

// stranica je na srpskom bez obzira na jezik adrese - služi samo Kiki
export default async function OdobriPage({ searchParams }: PageProps<"/[lang]/odobri">) {
  const { t } = await searchParams;
  const token = typeof t === "string" ? t : "";
  const applicant = token ? verifyApprovalToken(token) : null;
  const course = applicant ? getCourse(applicant.courseSlug) : undefined;

  if (!applicant || !course) {
    return (
      <main className="min-h-screen bg-stone-900 pt-28 pb-20 px-4 sm:px-6 lg:px-8 text-stone-200">
        <div className="max-w-xl mx-auto bg-white/5 border border-white/10 rounded-[2rem] p-8 text-center">
          <AlertCircle className="mx-auto text-red-400 mb-4" size={48} />
          <h1 className="text-2xl font-serif text-white mb-3">Link nije ispravan</h1>
          <p className="text-stone-400 font-light leading-relaxed mb-6">
            Link za odobrenje je nepotpun ili izmenjen. Otvori ga ponovo iz mejla sa novom prijavom.
          </p>
          <Link href="/sr" className="text-[#bc1888] hover:text-[#f09433] underline transition-colors">
            Nazad na sajt
          </Link>
        </div>
      </main>
    );
  }

  const rows = [
    ["Ime i prezime", applicant.name],
    ["Google mejl", applicant.email],
    ["Telefon", applicant.phone],
    ["Kurs", course.title.SR],
  ];

  return (
    <main className="min-h-screen bg-stone-900 pt-28 pb-20 px-4 sm:px-6 lg:px-8 text-stone-200">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-xs font-bold tracking-widest text-[#bc1888] mb-3 uppercase">Odobravanje prijave</div>
          <h1 className="text-3xl sm:text-4xl font-serif text-white">{course.title.SR}</h1>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 sm:p-8 flex flex-col gap-6">
          {/* PODACI PRIJAVE */}
          <dl className="flex flex-col gap-3">
            {rows.map(([label, value]) => (
              <div key={label} className="flex flex-col sm:flex-row sm:gap-4">
                <dt className="text-sm text-stone-400 sm:w-36 shrink-0">{label}</dt>
                <dd className="text-white break-words">{value}</dd>
              </div>
            ))}
          </dl>

          {/* KORAK 1: DRIVE */}
          <div className="bg-[#f09433]/10 border border-[#f09433]/20 rounded-xl p-4">
            <p className="text-sm text-[#f09433] leading-relaxed mb-3">
              Prvo podeli video na Drive-u sa <strong className="text-white break-all">{applicant.email}</strong>{" "}
              (Deli → Viewer), pa tek onda pošalji pristup.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-2">
              {course.lessons.map((lesson) => (
                <a
                  key={lesson.driveFileId}
                  href={driveViewUrl(lesson.driveFileId)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-stone-900 text-white text-sm font-medium hover:bg-stone-800 transition-colors"
                >
                  <ExternalLink size={16} className="shrink-0" />
                  Otvori u Drive-u: {lesson.title.SR}
                </a>
              ))}
            </div>
          </div>

          {/* KORAK 2: SLANJE PRISTUPA */}
          <ApproveCourseButton token={token} />
        </div>
      </div>
    </main>
  );
}
