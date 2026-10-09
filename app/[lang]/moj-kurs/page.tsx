import { redirect } from "next/navigation";

// /moj-kurs bez naziva kursa -> lista kurseva
export default async function MojKursIndexPage({ params }: PageProps<"/[lang]/moj-kurs">) {
  const { lang } = await params;
  redirect(`/${lang}/kursevi`);
}
