"use server";

import { headers } from "next/headers";
import { verifyApprovalToken } from "@/lib/approvalToken";
import { getCourse } from "@/lib/courses";
import {
  approvalMessage,
  getResend,
  kikaApprovedEmail,
  mailtoHref,
  studentApprovedEmail,
} from "@/lib/courseEmails";

export type ApproveState =
  | { status: "idle" }
  | { status: "sent"; email: string }
  | { status: "invalid" }
  | { status: "error" }
  // slanje studentu nije uspelo (npr. 403 dok domen nije verifikovan) - Kika šalje ručno
  | { status: "fallback"; mailto: string; subject: string; body: string };

// adresa sajta sa koje je zahtev stigao (za link do kursa u mejlu)
async function getOrigin() {
  const requestHeaders = await headers();
  const host = (requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host"))?.split(",")[0].trim();
  if (!host) return null;

  const proto =
    requestHeaders.get("x-forwarded-proto")?.split(",")[0].trim() ??
    (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

export async function approveCourse(_prevState: ApproveState, formData: FormData): Promise<ApproveState> {
  // server action je javna ruta - token se proverava iznova, a ne veruje se stranici
  const token = formData.get("t");
  const applicant = typeof token === "string" ? verifyApprovalToken(token) : null;
  const course = applicant ? getCourse(applicant.courseSlug) : undefined;
  if (!applicant || !course) return { status: "invalid" };

  const origin = await getOrigin();
  if (!origin) return { status: "error" };

  const courseUrl = `${origin}/${applicant.lang}/moj-kurs/${course.slug}`;
  const message = approvalMessage({ applicant, course, courseUrl });
  const fallback: ApproveState = {
    status: "fallback",
    mailto: mailtoHref(applicant.email, message),
    ...message,
  };

  const mailer = getResend();
  if (!mailer) return fallback;
  const { resend, from, kikaEmail } = mailer;

  // 1. mejl studentu sa pristupom
  try {
    const { error } = await resend.emails.send({
      from,
      to: applicant.email,
      replyTo: kikaEmail,
      ...studentApprovedEmail({ applicant, course, courseUrl }),
    });
    if (error) {
      console.error("odobri: Resend greška pri slanju studentu", error);
      return fallback;
    }
  } catch (error) {
    console.error("odobri: slanje studentu nije uspelo", error);
    return fallback;
  }

  // 2. evidencija u Kikinom inboxu - greška ovde ne menja činjenicu da je student dobio pristup
  try {
    const { error } = await resend.emails.send({
      from,
      to: kikaEmail,
      ...kikaApprovedEmail({ applicant, course }),
    });
    if (error) console.error("odobri: Resend greška pri slanju evidencije Kiki", error);
  } catch (error) {
    console.error("odobri: slanje evidencije Kiki nije uspelo", error);
  }

  return { status: "sent", email: applicant.email };
}
