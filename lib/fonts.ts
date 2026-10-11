import { Luxurious_Script } from "next/font/google";

// jedan poziv za ceo sajt (Footer + O meni), da se font ne učitava više puta
export const luxurious = Luxurious_Script({
  weight: "400",
  subsets: ["latin"],
});
