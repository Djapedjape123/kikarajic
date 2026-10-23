import { Resend } from "resend";
import { driveViewUrl, type Course } from "@/lib/courses";

// jezik na kom je student popunio formu (ide u mejlove koje on dobija)
export type FormLang = "sr" | "en";

export type Applicant = {
  name: string;
  email: string;
  phone: string;
  lang: FormLang;
};

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// čita env promenljive za Resend; bez njih nema slanja (vraća null)
export function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  const kikaEmail = process.env.KIKA_EMAIL;

  if (!apiKey || !from || !kikaEmail) {
    console.error("courseEmails: nedostaju RESEND_API_KEY, RESEND_FROM ili KIKA_EMAIL");
    return null;
  }

  return { resend: new Resend(apiKey), from, kikaEmail };
}

// tamni okvir koji dele svi mejlovi
export function emailLayout(innerHtml: string) {
  return `
<div style="background:#0c0a09;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:560px;margin:0 auto;background:#1c1917;border:1px solid #292524;border-radius:24px;padding:32px;">
${innerHtml}
  </div>
</div>`;
}

function detailsTable(rows: [label: string, value: string][]) {
  const body = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 0;color:#a8a29e;font-size:13px;width:130px;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:8px 0;color:#ffffff;font-size:15px;">${escapeHtml(value)}</td></tr>`
    )
    .join("");
  return `<table style="width:100%;border-collapse:collapse;margin-bottom:24px;">${body}</table>`;
}

function button(href: string, label: string, background = "#bc1888") {
  return `<a href="${escapeHtml(href)}" style="display:inline-block;margin:4px 8px 4px 0;padding:14px 24px;border-radius:12px;background:${background};color:#ffffff;text-decoration:none;font-size:15px;">${escapeHtml(label)}</a>`;
}

function courseTitle(course: Course, lang: FormLang) {
  return lang === "en" ? course.title.EN : course.title.SR;
}

// ---------- poruka koju Kika šalje studentu kad odobri ----------

// tekst je na jeziku forme; koristi se i u mejlu studentu i u rezervnom mailto linku
export function approvalMessage({
  applicant,
  course,
  courseUrl,
}: {
  applicant: Applicant;
  course: Course;
  courseUrl: string;
}) {
  const { name, email, lang } = applicant;

  if (lang === "en") {
    return {
      subject: `Your access to "${course.title.EN}"`,
      body: `Hi ${name},\n\nYour payment has been confirmed and access to the course "${course.title.EN}" is now active.\n\nWatch the course here:\n${courseUrl}\n\nImportant: sign in to Google with ${email} - the video is shared only with that account.\n\nEnjoy the course!\nKika Rajić`,
    };
  }

  return {
    subject: `Pristup kursu "${course.title.SR}"`,
    body: `Zdravo ${name},\n\nUplata je potvrđena i pristup kursu "${course.title.SR}" je aktivan.\n\nKurs možeš gledati ovde:\n${courseUrl}\n\nVažno: prijavi se na Google nalog ${email} - video je podeljen samo sa tim nalogom.\n\nUživaj u kursu!\nKika Rajić`,
  };
}

export function mailtoHref(to: string, message: { subject: string; body: string }) {
  return `mailto:${to}?subject=${encodeURIComponent(message.subject)}&body=${encodeURIComponent(message.body)}`;
}

// ---------- uplatnica (slika ili PDF) ----------

export function isPdfUrl(url: string) {
  try {
    return new URL(url).pathname.toLowerCase().endsWith(".pdf");
  } catch {
    return false;
  }
}

// Cloudinary iz PDF-a sam pravi sliku prve strane kad se ekstenzija zameni
function pdfPreviewUrl(url: string) {
  const preview = new URL(url);
  preview.pathname = preview.pathname.replace(/\.pdf$/i, ".jpg");
  return preview.toString();
}

function receiptBlock(receiptUrl: string) {
  const isPdf = isPdfUrl(receiptUrl);
  const previewUrl = isPdf ? pdfPreviewUrl(receiptUrl) : receiptUrl;
  const linkLabel = isPdf ? "Otvori PDF" : "Otvori sliku u punoj veličini";

  return `
    <p style="margin:0 0 8px;color:#a8a29e;font-size:13px;">Uplatnica${isPdf ? " (PDF – prikazana prva strana)" : ""}:</p>
    <a href="${escapeHtml(receiptUrl)}"><img src="${escapeHtml(previewUrl)}" alt="Uplatnica" style="max-width:100%;border-radius:12px;border:1px solid #292524;" /></a>
    <p style="margin:8px 0 28px;"><a href="${escapeHtml(receiptUrl)}" style="color:#f09433;font-size:13px;">${linkLabel}</a></p>`;
}

// ---------- mejl Kiki: nova prijava ----------

// approveUrl je null kad nema COURSE_APPROVAL_SECRET - tada ostaje samo mailto dugme
export function kikaNewSignupHtml({
  applicant,
  course,
  receiptUrl,
  approveUrl,
  message,
}: {
  applicant: Applicant;
  course: Course;
  receiptUrl: string;
  approveUrl: string | null;
  message: { subject: string; body: string };
}) {
  const { name, email, phone, lang } = applicant;
  const mailto = mailtoHref(email, message);

  const driveButtons = course.lessons
    .map((lesson) =>
      button(driveViewUrl(lesson.driveFileId), `1. Podeli video: ${lesson.title.SR}`, "#292524")
    )
    .join("");

  const approveButton = approveUrl
    ? button(approveUrl, "2. Odobri – pošalji pristup studentu")
    : button(mailto, "2. Odobri – pošalji link studentu");

  const fallbackIntro = approveUrl
    ? `Ako dugme „Odobri“ ne radi, pošalji ovu poruku ručno na ${escapeHtml(email)} (<a href="${escapeHtml(mailto)}" style="color:#f09433;">otvori u mejlu</a>):`
    : `Ako dugme „Odobri“ ne otvori mejl, kopiraj ovu poruku i pošalji je na ${escapeHtml(email)}:`;

  return emailLayout(`
    <p style="margin:0 0 4px;color:#bc1888;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Nova prijava za kurs</p>
    <h1 style="margin:0 0 24px;color:#ffffff;font-size:22px;font-weight:normal;">${escapeHtml(course.title.SR)}</h1>

    ${detailsTable([
      ["Ime i prezime", name],
      ["Google mejl", email],
      ["Telefon", phone],
      ["Kurs", course.title.SR],
      ["Jezik forme", lang.toUpperCase()],
    ])}
    ${receiptBlock(receiptUrl)}

    <p style="margin:0 0 12px;color:#ffffff;font-size:15px;">Odobravanje u 2 koraka:</p>
    <p style="margin:0 0 12px;color:#a8a29e;font-size:13px;line-height:1.5;">Otvori video u Drive-u → Deli (Share) → dodaj <strong style="color:#ffffff;">${escapeHtml(email)}</strong> kao Viewer.</p>
    <div style="margin-bottom:12px;">${driveButtons}</div>
    ${approveButton}

    <p style="margin:28px 0 8px;color:#a8a29e;font-size:12px;">${fallbackIntro}</p>
    <div style="background:#0c0a09;border-radius:12px;padding:16px;color:#d6d3d1;font-size:13px;line-height:1.6;white-space:pre-line;">${escapeHtml(message.subject)}

${escapeHtml(message.body)}</div>`);
}

// ---------- mejl studentu: primili smo prijavu ----------

export function studentReceivedEmail({ applicant, course }: { applicant: Applicant; course: Course }) {
  const { name, email, lang } = applicant;
  const isEn = lang === "en";
  const title = courseTitle(course, lang);

  const copy = isEn
    ? {
        subject: `We received your enrollment – ${title}`,
        eyebrow: "Enrollment received",
        greeting: `Hi ${name}, thank you for enrolling!`,
        courseLabel: "Course",
        amountLabel: "Amount",
        accountLabel: "Google account",
        next: "Kika will check your payment and your access will arrive at this email address.",
        note: `The video is shared only with the Google account ${email}. Make sure you sign in to Google with that account when you watch.`,
      }
    : {
        subject: `Primili smo tvoju prijavu – ${title}`,
        eyebrow: "Prijava primljena",
        greeting: `Zdravo ${name}, hvala na prijavi!`,
        courseLabel: "Kurs",
        amountLabel: "Iznos",
        accountLabel: "Google nalog",
        next: "Kika će proveriti uplatu, a pristup stiže na ovaj mejl.",
        note: `Video je podeljen samo sa Google nalogom ${email}. Pri gledanju se prijavi na Google baš tim nalogom.`,
      };

  const html = emailLayout(`
    <p style="margin:0 0 4px;color:#bc1888;font-size:12px;letter-spacing:2px;text-transform:uppercase;">${copy.eyebrow}</p>
    <h1 style="margin:0 0 24px;color:#ffffff;font-size:22px;font-weight:normal;">${escapeHtml(copy.greeting)}</h1>

    ${detailsTable([
      [copy.courseLabel, title],
      [copy.amountLabel, `${course.priceRSD} / ${course.priceEUR}`],
      [copy.accountLabel, email],
    ])}

    <p style="margin:0 0 16px;color:#ffffff;font-size:15px;line-height:1.6;">${escapeHtml(copy.next)}</p>
    <p style="margin:0;color:#a8a29e;font-size:13px;line-height:1.6;">${escapeHtml(copy.note)}</p>`);

  return { subject: copy.subject, html };
}

// ---------- mejl studentu: pristup odobren ----------

export function studentApprovedEmail({
  applicant,
  course,
  courseUrl,
}: {
  applicant: Applicant;
  course: Course;
  courseUrl: string;
}) {
  const { name, email, lang } = applicant;
  const isEn = lang === "en";
  const title = courseTitle(course, lang);
  const message = approvalMessage({ applicant, course, courseUrl });

  const copy = isEn
    ? {
        eyebrow: "Access approved",
        greeting: `Hi ${name}, your payment is confirmed!`,
        intro: `Access to "${title}" is now active.`,
        cta: "Watch the course",
        note: `Important: sign in to Google with ${email} – the video is shared only with that account.`,
        signoff: "Enjoy the course!",
      }
    : {
        eyebrow: "Pristup odobren",
        greeting: `Zdravo ${name}, uplata je potvrđena!`,
        intro: `Pristup kursu „${title}“ je aktivan.`,
        cta: "Gledaj kurs",
        note: `Važno: prijavi se na Google nalog ${email} – video je podeljen samo sa tim nalogom.`,
        signoff: "Uživaj u kursu!",
      };

  const html = emailLayout(`
    <p style="margin:0 0 4px;color:#bc1888;font-size:12px;letter-spacing:2px;text-transform:uppercase;">${copy.eyebrow}</p>
    <h1 style="margin:0 0 16px;color:#ffffff;font-size:22px;font-weight:normal;">${escapeHtml(copy.greeting)}</h1>
    <p style="margin:0 0 24px;color:#ffffff;font-size:15px;line-height:1.6;">${escapeHtml(copy.intro)}</p>

    <div style="margin-bottom:24px;">${button(courseUrl, copy.cta)}</div>

    <p style="margin:0 0 16px;color:#a8a29e;font-size:13px;line-height:1.6;">${escapeHtml(copy.note)}</p>
    <p style="margin:0;color:#ffffff;font-size:15px;">${escapeHtml(copy.signoff)}<br />Kika Rajić</p>`);

  // text verzija = ista poruka kao u rezervnom mailto linku
  return { subject: message.subject, html, text: message.body };
}

// ---------- mejl Kiki: evidencija da je odobreno ----------

export function kikaApprovedEmail({ applicant, course }: { applicant: Applicant; course: Course }) {
  const { name, email, phone } = applicant;

  const html = emailLayout(`
    <p style="margin:0 0 4px;color:#bc1888;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Pristup odobren</p>
    <h1 style="margin:0 0 24px;color:#ffffff;font-size:22px;font-weight:normal;">${escapeHtml(course.title.SR)}</h1>

    ${detailsTable([
      ["Ime i prezime", name],
      ["Google mejl", email],
      ["Telefon", phone],
    ])}

    <p style="margin:0;color:#a8a29e;font-size:13px;line-height:1.6;">Student je dobio mejl sa linkom do kursa.</p>`);

  return { subject: `Odobreno: ${name} – ${course.title.SR}`, html };
}
