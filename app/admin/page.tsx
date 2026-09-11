"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, Download, Trash2, User, Mail, Calendar, Ticket, Loader2, Globe } from "lucide-react";

// Tip podataka iz naše baze
type Lead = {
    id: string;
    name: string;
    email: string;
    workshop_name: string;
    workshop_date: string;
    created_at: string;
};

export default function AdminDashboard() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        try {
            const res = await fetch("/api/admin/leads");
            if (res.ok) {
                const data = await res.json();
                setLeads(data);
            }
        } catch (error) {
            console.error("Greška pri učitavanju prijava");
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        router.push("/admin/login");
        router.refresh();
    };

    const handleDelete = async (id: string) => {
        // Sigurnosno pitanje pre brisanja
        if (!window.confirm("Da li si sigurna da želiš da obrišeš ovu prijavu? Ovo se ne može vratiti.")) {
            return;
        }

        try {
            const res = await fetch("/api/admin/leads", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });

            if (res.ok) {
                // Ako je brisanje uspešno, sklanjamo karticu sa ekrana bez učitavanja stranice
                setLeads(leads.filter((lead) => lead.id !== id));
            }
        } catch (error) {
            alert("Došlo je do greške pri brisanju.");
        }
    };

    const handleExportCSV = () => {
        // Pravimo naslove kolona
        const headers = ["Ime i Prezime", "Email", "Radionica", "Datum Radionice", "Datum Prijave"];

        // Mapiramo podatke u redove
        const rows = leads.map(lead => [
            `"${lead.name}"`,
            `"${lead.email}"`,
            `"${lead.workshop_name}"`,
            `"${lead.workshop_date}"`,
            `"${new Date(lead.created_at).toLocaleDateString("sr-RS")}"`
        ]);

        // Spajamo sve u jedan fajl
        const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");

        // Kreiramo i klikćemo skriveni link za preuzimanje
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `kika_prijave_${new Date().toLocaleDateString("sr-RS")}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center">
                <Loader2 className="animate-spin text-[#bc1888] mb-4" size={32} />
                <p className="text-stone-500 text-sm tracking-widest uppercase">Učitavanje prijava...</p>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#FAF7F2] pb-20">
            {/* HEADER */}
            <header className="bg-white border-b border-stone-200 sticky top-0 z-40 shadow-sm">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-serif text-stone-800">Zdravo, Kika 👋</h1>
                        <p className="text-xs sm:text-sm text-stone-500 font-light">Pregled svih tvojih prijava</p>
                    </div>

                    {/* DUGMIĆI NA DESNOJ STRANI */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-stone-500 hover:text-[#bc1888] transition-colors text-sm font-medium bg-white border border-stone-200 hover:border-[#bc1888]/30 hover:bg-[#bc1888]/5 px-3 sm:px-4 py-2 rounded-full"
                        >
                            <Globe size={16} />
                            <span className="hidden sm:inline">Nazad na sajt</span>
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-stone-500 hover:text-stone-800 transition-colors text-sm font-medium bg-stone-100 hover:bg-stone-200 px-3 sm:px-4 py-2 rounded-full"
                        >
                            <LogOut size={16} />
                            <span className="hidden sm:inline">Odjavi se</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* GLAVNI DEO */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-8">

                {/* Kontrole iznad liste */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-stone-200 text-sm text-stone-600 font-medium">
                        Ukupno prijava: <span className="text-[#bc1888] font-bold">{leads.length}</span>
                    </div>

                    <button
                        onClick={handleExportCSV}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-stone-900 text-white px-6 py-2.5 rounded-full hover:bg-stone-800 transition-all text-sm font-medium shadow-md"
                    >
                        <Download size={16} />
                        Preuzmi tabelu (Excel)
                    </button>
                </div>

                {/* LISTA PRIJAVA - KARTICE */}
                {leads.length === 0 ? (
                    <div className="bg-white rounded-3xl p-12 text-center border border-stone-100 shadow-sm mt-10">
                        <Ticket className="mx-auto text-stone-300 mb-4" size={48} />
                        <h3 className="text-lg font-medium text-stone-700">Trenutno nema prijava</h3>
                        <p className="text-stone-500 text-sm mt-2">Kada se neko prijavi na radionicu, pojaviće se ovde.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <AnimatePresence>
                            {leads.map((lead) => (
                                <motion.div
                                    key={lead.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                                    className="bg-white p-5 rounded-[1.5rem] shadow-sm border border-stone-200 relative group hover:shadow-md transition-shadow"
                                >
                                    {/* Dugme za brisanje */}
                                    <button
                                        onClick={() => handleDelete(lead.id)}
                                        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-red-50 text-red-400 flex items-center justify-center opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
                                        title="Obriši prijavu"
                                    >
                                        <Trash2 size={16} />
                                    </button>

                                    {/* Informacije */}
                                    <div className="space-y-3 pr-10">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 shrink-0">
                                                <User size={18} />
                                            </div>
                                            <div>
                                                <p className="text-xs text-stone-400 uppercase tracking-wider mb-0.5">Ime i prezime</p>
                                                <p className="font-medium text-stone-800 text-sm sm:text-base">{lead.name}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 shrink-0">
                                                <Mail size={18} />
                                            </div>
                                            <div className="overflow-hidden">
                                                <p className="text-xs text-stone-400 uppercase tracking-wider mb-0.5">Email</p>
                                                <a href={`mailto:${lead.email}`} className="font-medium text-[#bc1888] text-sm sm:text-base truncate hover:underline">
                                                    {lead.email}
                                                </a>
                                            </div>
                                        </div>

                                        <div className="pt-3 mt-3 border-t border-stone-100 grid grid-cols-2 gap-2">
                                            <div>
                                                <div className="flex items-center gap-1.5 text-stone-400 mb-1">
                                                    <Ticket size={14} />
                                                    <span className="text-[10px] uppercase tracking-wider">Radionica</span>
                                                </div>
                                                <p className="text-sm font-medium text-stone-700">{lead.workshop_name}</p>
                                            </div>

                                            <div>
                                                <div className="flex items-center gap-1.5 text-stone-400 mb-1">
                                                    <Calendar size={14} />
                                                    <span className="text-[10px] uppercase tracking-wider">Datum</span>
                                                </div>
                                                <p className="text-sm font-medium text-stone-700">{lead.workshop_date}</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </main>
    );
}