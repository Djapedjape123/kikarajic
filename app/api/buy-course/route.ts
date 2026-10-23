import { z } from "zod";
import { createApprovalToken, signupFieldsSchema } from "@/lib/approvalToken";
import { getCourse } from "@/lib/courses";
import {
  approvalMessage,
  getResend,
  kikaNewSignupHtml,
  studentReceivedEmail,
} from "@/lib/courseEmails";

const CLOUDINARY_PREFIX = "https://res.cloudinary.com/duomot4hp/";

// forma šalje samo JSON (slika ili PDF su već na Cloudinary-ju)
const bodySchema = signupFieldsSchema.extend({
  imageUrl: z.url().max(500).startsWith(CLOUDINARY_PREFIX),
  website: z.string().optional(), // honeypot
});

export async function POST(request: Request) {
  const mailer = getResend();
  if (!mailer) {
    return Response.json({ ok: false }, { status: 500 });
  }
  const { resend, from, kikaEmail } = mailer;

  const json = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return Response.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const { imageUrl, website, ...fields } = parsed.data;

  // bot je popunio skriveno polje - glumimo uspeh, ništa ne šaljemo
  if (website) {
    return Response.json({ ok: true });
  }

  const course = getCourse(fields.courseSlug);
  if (!course) {
    return Response.json({ ok: false, error: "unknown_course" }, { status: 400 });
  }

  const origin = new URL(request.url).origin;
  const courseUrl = `${origin}/${fields.lang}/moj-kurs/${course.slug}`;
  const message = approvalMessage({ applicant: fields, course, courseUrl });

  // potpisani link za "Odobri"; bez COURSE_APPROVAL_SECRET ostaje samo mailto dugme
  const token = createApprovalToken(fields);
  // stranica za odobrenje je na srpskom (služi samo Kiki), pa je link uvek /sr
  const approveUrl = token ? `${origin}/sr/odobri?t=${token}` : null;

  const { error } = await resend.emails.send({
    from,
    to: kikaEmail,
    replyTo: fields.email,
    subject: `Nova prijava: ${course.title.SR} – ${fields.name}`,
    html: kikaNewSignupHtml({ applicant: fields, course, receiptUrl: imageUrl, approveUrl, message }),
  });

  if (error) {
    console.error("buy-course: Resend greška", error);
    return Response.json({ ok: false }, { status: 500 });
  }

  // mejl "Primili smo prijavu" studentu - greška se samo loguje (dok nema domena Resend vraća 403)
  try {
    const { error: studentError } = await resend.emails.send({
      from,
      to: fields.email,
      replyTo: kikaEmail,
      ...studentReceivedEmail({ applicant: fields, course }),
    });
    if (studentError) {
      console.error("buy-course: Resend greška pri slanju studentu", studentError);
    }
  } catch (studentError) {
    console.error("buy-course: slanje studentu nije uspelo", studentError);
  }

  return Response.json({ ok: true });
}
