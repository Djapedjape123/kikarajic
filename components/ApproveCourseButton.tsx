"use client";

import { useActionState, useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, Check, CheckCircle2, Copy, Loader2, Mail, Send } from "lucide-react";
import { approveCourse, type ApproveState } from "@/app/[lang]/odobri/actions";

const initialState: ApproveState = { status: "idle" };

export default function ApproveCourseButton({ token }: { token: string }) {
  const [state, formAction, pending] = useActionState(approveCourse, initialState);
  const [copied, setCopied] = useState(false);

  const copyMessage = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // kopiranje nije dozvoljeno - tekst je ionako prikazan, može ručno
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <form action={formAction}>
        <input type="hidden" name="t" value={token} />
        <button
          type="submit"
          disabled={pending}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-tr from-[#f09433] to-[#bc1888] text-white font-medium text-lg hover:shadow-[0_0_20px_rgba(188,24,136,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {pending ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Šaljem...
            </>
          ) : (
            <>
              <Send size={20} />
              {state.status === "sent" ? "Pošalji ponovo" : "Pošalji pristup studentu"}
            </>
          )}
        </button>
      </form>

      {state.status === "sent" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl flex items-start gap-3 text-sm"
        >
          <CheckCircle2 className="shrink-0 mt-0.5" size={18} />
          <div>
            <p className="font-medium">Poslato na {state.email}</p>
            <p className="text-green-400/80 mt-1">
              Ako ponovo klikneš na dugme, mejl sa pristupom se šalje ponovo.
            </p>
          </div>
        </motion.div>
      )}

      {state.status === "invalid" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-center gap-3 text-sm"
        >
          <AlertCircle className="shrink-0" size={18} />
          Link nije ispravan.
        </motion.div>
      )}

      {state.status === "error" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-center gap-3 text-sm"
        >
          <AlertCircle className="shrink-0" size={18} />
          Došlo je do greške. Pokušaj ponovo.
        </motion.div>
      )}

      {state.status === "fallback" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#f09433]/10 border border-[#f09433]/20 p-4 rounded-xl flex flex-col gap-4"
        >
          <div className="flex items-start gap-3 text-sm text-[#f09433]">
            <AlertCircle className="shrink-0 mt-0.5" size={18} />
            <p>
              Automatsko slanje nije uspelo. Pošalji poruku studentu ručno - dugme otvara tvoj mejl sa već
              popunjenom porukom.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={state.mailto}
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-stone-900 text-white font-medium hover:bg-stone-800 transition-colors"
            >
              <Mail size={18} />
              Otvori u mejlu
            </a>
            <button
              type="button"
              onClick={() => copyMessage(`${state.subject}\n\n${state.body}`)}
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-colors"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? "Kopirano" : "Kopiraj poruku"}
            </button>
          </div>

          <div className="bg-black/30 rounded-xl p-4 text-sm text-stone-300 leading-relaxed whitespace-pre-line">
            <p className="font-medium text-white mb-2">{state.subject}</p>
            {state.body}
          </div>
        </motion.div>
      )}
    </div>
  );
}
