"use client";

import { useSyncExternalStore } from "react";
import { INTRO_HEAD_SCRIPT } from "@/lib/intro";

const subscribe = () => () => {};

// Skripta treba samo u HTML-u sa servera (izvrši se pre prvog iscrtavanja).
// Kad se layout ponovo renderuje u browseru (npr. promena jezika /sr -> /en),
// React ne izvršava <script> i prijavljuje grešku - zato je tada ne renderujemo.
export default function IntroScript() {
  const isServerHtml = useSyncExternalStore(subscribe, () => false, () => true);
  if (!isServerHtml) return null;

  return <script dangerouslySetInnerHTML={{ __html: INTRO_HEAD_SCRIPT }} />;
}
