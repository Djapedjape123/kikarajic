import { createHmac, timingSafeEqual } from "node:crypto";
import { z } from "zod";
import { getCourse } from "@/lib/courses";

// Polja prijave - isti propisi važe za formu (API) i za token
export const signupFieldsSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.email().max(200),
  phone: z.string().trim().min(6).max(30),
  courseSlug: z.string().max(100),
  lang: z.enum(["sr", "en"]),
});

const payloadSchema = signupFieldsSchema.extend({
  iat: z.number().int(), // kada je token napravljen (sekunde); za sada bez isteka
});

export type SignupFields = z.infer<typeof signupFieldsSchema>;

const MIN_SECRET_LENGTH = 16;

function getSecret() {
  const secret = process.env.COURSE_APPROVAL_SECRET;
  if (!secret || secret.length < MIN_SECRET_LENGTH) {
    console.error(`approvalToken: COURSE_APPROVAL_SECRET nije podešen (min ${MIN_SECRET_LENGTH} karaktera)`);
    return null;
  }
  return secret;
}

function sign(payload: string, secret: string) {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

// token = base64url(JSON) + "." + HMAC-SHA256; bez baze, sve što treba je u samom tokenu
export function createApprovalToken(fields: SignupFields): string | null {
  const secret = getSecret();
  if (!secret) return null;

  const payload = Buffer.from(
    JSON.stringify({ ...fields, iat: Math.floor(Date.now() / 1000) })
  ).toString("base64url");

  return `${payload}.${sign(payload, secret)}`;
}

// vraća podatke prijave ili null ako je token pokvaren, potpis ne odgovara ili kurs više ne postoji
export function verifyApprovalToken(token: string): SignupFields | null {
  const secret = getSecret();
  if (!secret) return null;

  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [payload, signature] = parts;

  const expected = Buffer.from(sign(payload, secret));
  const received = Buffer.from(signature);
  if (expected.length !== received.length || !timingSafeEqual(expected, received)) {
    return null;
  }

  let json: unknown;
  try {
    json = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
  } catch {
    return null;
  }

  const parsed = payloadSchema.safeParse(json);
  if (!parsed.success) return null;

  const { name, email, phone, courseSlug, lang } = parsed.data;
  if (!getCourse(courseSlug)) return null;

  return { name, email, phone, courseSlug, lang };
}
