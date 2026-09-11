"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LockKeyhole } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh(); // Osvežavamo ruter da bi middleware odmah prepoznao kolačić
      } else {
        const data = await res.json();
        setError(data.error || "Pogrešni podaci. Pokušaj ponovo.");
      }
    } catch (err) {
      setError("Došlo je do greške pri povezivanju sa serverom.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Koristimo 100dvh za savršeno centriranje na mobilnim pregledačima
    <main className="min-h-[100dvh] flex items-center justify-center bg-[#FAF7F2] p-4 sm:p-6 overflow-hidden relative">
      {/* Suptilni dekorativni gradijent u pozadini */}
      <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] rounded-full bg-[#bc1888]/10 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] rounded-full bg-[#D4A373]/20 blur-[80px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-2xl border border-stone-100 relative z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-stone-50 rounded-2xl flex items-center justify-center mb-4 shadow-sm border border-stone-100 text-[#bc1888]">
            <LockKeyhole size={28} strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif text-stone-800 tracking-tight text-center">
            Admin Panel
          </h1>
          <p className="text-stone-500 text-sm mt-2 text-center">
            Pristup rezervisan samo za administraciju.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label
              htmlFor="username"
              className="block text-xs uppercase tracking-widest text-stone-500 mb-2 ml-1"
            >
              Korisničko Ime
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-5 py-4 text-[16px] text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#bc1888] focus:ring-1 focus:ring-[#bc1888] transition-all"
              placeholder="Unesi korisničko ime"
              autoComplete="username"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs uppercase tracking-widest text-stone-500 mb-2 ml-1"
            >
              Lozinka
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-5 py-4 text-[16px] text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#bc1888] focus:ring-1 focus:ring-[#bc1888] transition-all"
              placeholder="Unesi lozinku"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="text-red-500 text-sm text-center font-medium bg-red-50 py-2 px-4 rounded-xl"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-white text-base font-medium shadow-lg shadow-[#bc1888]/20 bg-gradient-to-tr from-[#e35bb0] via-[#bc1888] to-[#7a0f5e] transition-all active:scale-[0.98] disabled:opacity-70"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              "Prijavi se"
            )}
          </button>
        </form>
      </motion.div>
    </main>
  );
}