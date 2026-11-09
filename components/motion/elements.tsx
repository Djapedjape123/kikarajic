"use client";

// Animirani elementi za server stranice (edukacije). Uvoz `import * as motion from "@/components/motion/elements"`
// zadržava isti JSX (motion.div, motion.h1...), a u JS idu samo ovi elementi - "framer-motion/client" bi
// doneo spisak svih ~170 HTML elemenata i povećao zajednički framer paket na svakoj stranici.
import { motion } from "framer-motion";

export const a = motion.a;
export const div = motion.div;
export const h1 = motion.h1;
export const p = motion.p;
export const span = motion.span;
