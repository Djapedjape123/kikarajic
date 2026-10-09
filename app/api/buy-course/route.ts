import { Resend } from "resend";
import { z } from "zod";
import { getCourse, driveViewUrl } from "@/lib/courses";

const CLOUDINARY_PREFIX = "https://res.cloudinary.com/duomot4hp/";

// forma šalje samo JSON (slika je već na Cloudinary-ju)
const bodySchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.email().max(200),
  phone: z.string().trim().min(6).max(30),
  courseSlug: z.string().max(100),
  lang: z.enum(["sr", "en"]),
  imageUrl: z.url().max(500).startsWith(CLOUDINARY_PREFIX),
  website: z.string().optional(), // honeypot
});

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  const to = process.env.KIKA_EMAIL;

  if (!apiKey || !from || !to) {
    console.error("buy-course: nedostaju RESEND_API_KEY, RESEND_FROM ili KIKA_EMAIL");
    return Response.json({ ok: false }, { status: 500 });
  }

  const json = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return Response.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const { name, email, phone, courseSlug, lang, imageUrl, website } = parsed.data;

  // bot je popunio skriveno polje - glumimo uspeh, ništa ne šaljemo
  if (website) {
    return Response.json({ ok: true });
  }

  const course = getCourse(courseSlug);
  if (!course) {
    return Response.json({ ok: false, error: "unknown_course" }, { status: 400 });
  }

  const courseUrl = `${new URL(request.url).origin}/${lang}/moj-kurs/${course.slug}`;
  const courseTitle = course.title.SR;

  // poruka koju Kika šalje studentu kad odobri (na jeziku na kom je popunjena forma)
  const approval =
    lang === "en"
      ? {
          subject: `Your access to "${course.title.EN}"`,
          body: `Hi ${name},\n\nYour payment has been confirmed and access to the course "${course.title.EN}" is now active.\n\nWatch the course here:\n${courseUrl}\n\nImportant: sign in to Google with ${email} - the video is shared only with that account.\n\nEnjoy the course!\nKika Rajić`,
        }
      : {
          subject: `Pristup kursu "${course.title.SR}"`,
          body: `Zdravo ${name},\n\nUplata je potvrđena i pristup kursu "${course.title.SR}" je aktivan.\n\nKurs možeš gledati ovde:\n${courseUrl}\n\nVažno: prijavi se na Google nalog ${email} - video je podeljen samo sa tim nalogom.\n\nUživaj u kursu!\nKika Rajić`,
        };

  const approveMailto = `mailto:${email}?subject=${encodeURIComponent(approval.subject)}&body=${encodeURIComponent(approval.body)}`;

  const rows = [
    ["Ime i prezime", name],
    ["Google mejl", email],
    ["Telefon", phone],
    ["Kurs", courseTitle],
    ["Jezik forme", lang.toUpperCase()],
  ]
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 0;color:#a8a29e;font-size:13px;width:130px;">${label}</td><td style="padding:8px 0;color:#ffffff;font-size:15px;">${escapeHtml(value)}</td></tr>`
    )
    .join("");

  const driveButtons = course.lessons
    .map(
      (lesson) =>
        `<a href="${driveViewUrl(lesson.driveFileId)}" style="display:inline-block;margin:4px 8px 4px 0;padding:12px 20px;border-radius:12px;background:#292524;color:#ffffff;text-decoration:none;font-size:14px;">1. Podeli video: ${escapeHtml(lesson.title.SR)}</a>`
    )
    .join("");

  const html = `
<div style="background:#0c0a09;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:560px;margin:0 auto;background:#1c1917;border:1px solid #292524;border-radius:24px;padding:32px;">
    <p style="margin:0 0 4px;color:#bc1888;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Nova prijava za kurs</p>
    <h1 style="margin:0 0 24px;color:#ffffff;font-size:22px;font-weight:normal;">${escapeHtml(courseTitle)}</h1>

    <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">${rows}</table>

    <p style="margin:0 0 8px;color:#a8a29e;font-size:13px;">Uplatnica:</p>
    <a href="${escapeHtml(imageUrl)}"><img src="${escapeHtml(imageUrl)}" alt="Uplatnica" style="max-width:100%;border-radius:12px;border:1px solid #292524;" /></a>
    <p style="margin:8px 0 28px;"><a href="${escapeHtml(imageUrl)}" style="color:#f09433;font-size:13px;">Otvori sliku u punoj veličini</a></p>

    <p style="margin:0 0 12px;color:#ffffff;font-size:15px;">Odobravanje u 2 koraka:</p>
    <p style="margin:0 0 12px;color:#a8a29e;font-size:13px;line-height:1.5;">Otvori video u Drive-u → Deli (Share) → dodaj <strong style="color:#ffffff;">${escapeHtml(email)}</strong> kao Viewer.</p>
    <div style="margin-bottom:12px;">${driveButtons}</div>
    <a href="${escapeHtml(approveMailto)}" style="display:inline-block;padding:14px 24px;border-radius:12px;background:#bc1888;color:#ffffff;text-decoration:none;font-size:15px;">2. Odobri – pošalji link studentu</a>

    <p style="margin:28px 0 8px;color:#a8a29e;font-size:12px;">Ako dugme „Odobri“ ne otvori mejl, kopiraj ovu poruku i pošalji je na ${escapeHtml(email)}:</p>
    <div style="background:#0c0a09;border-radius:12px;padding:16px;color:#d6d3d1;font-size:13px;line-height:1.6;white-space:pre-line;">${escapeHtml(approval.subject)}

${escapeHtml(approval.body)}</div>
  </div>
</div>`;

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `Nova prijava: ${courseTitle} – ${name}`,
    html,
  });

  if (error) {
    console.error("buy-course: Resend greška", error);
    return Response.json({ ok: false }, { status: 500 });
  }

  return Response.json({ ok: true });
}
