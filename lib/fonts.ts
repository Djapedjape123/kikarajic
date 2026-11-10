import { Luxurious_Script } from "next/font/google";

// jedan poziv za ceo sajt (Footer + O meni), da se font ne učitava više puta
// preload: false - Footer je u layout-u, pa je font bio preload-ovan na svakoj stranici i otimao mrežu
// logou u hero-u i JS-u. Bez preload-a se skida čim zatreba tekstu (i dalje na početku učitavanja),
// a na prvoj poseti ionako stigne dok loader pokriva ekran; posle je u kešu.
// (Posebna instanca samo za Footer ne valja: preload verzija fonta ima drugu adresu, pa bi se na O meni skidao dvaput.)
export const luxurious = Luxurious_Script({
  weight: "400",
  subsets: ["latin"],
  preload: false,
});
