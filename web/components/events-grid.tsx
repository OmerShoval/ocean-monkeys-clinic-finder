"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { CLINICS, type Clinic } from "@/lib/clinics";
import { useLang } from "@/lib/lang-context";

/* ── Shared detail sheet ── */
function DetailSheet({ clinic, onClose }: { clinic: Clinic; onClose: () => void }) {
  const { lang } = useLang();
  const S_LABEL: Record<string, string> = lang === "he"
    ? { open: "מקומות פנויים", full: "מלא — רשימת המתנה", soon: "נפתח בקרוב" }
    : { open: "Spots available", full: "Full — Waitlist", soon: "Coming soon" };
  const S_BG: Record<string, string> = { open: "var(--open-bg)", full: "var(--full-bg)", soon: "var(--soon-bg)" };
  const S_FG: Record<string, string> = { open: "var(--open-fg)", full: "var(--full-fg)", soon: "var(--soon-fg)" };
  const dir = lang === "he" ? "rtl" : "ltr";

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-40" style={{ background: "rgba(0,0,0,0.46)", backdropFilter: "blur(6px)" }}
        onClick={onClose}
      />
      <motion.div
        initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 340, damping: 34 }}
        className="fixed inset-x-0 bottom-0 z-50 overflow-hidden"
        style={{ borderRadius: "28px 28px 0 0", background: "#fff", maxHeight: "84vh", paddingBottom: "max(20px, env(safe-area-inset-bottom))" }}
      >
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full" style={{ background: "var(--line)" }} />
        </div>
        {/* Hero — natural image, no overlay */}
        <div className="relative mx-4 overflow-hidden" style={{ height: 190, borderRadius: 20, background: "#111" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={clinic.image} alt={clinic.nameHe} className="absolute inset-0 w-full h-full object-cover" />
          <button onClick={onClose} className="absolute top-3 left-3 w-9 h-9 rounded-full flex items-center justify-center text-white border-0" style={{ background: "rgba(0,0,0,0.32)", backdropFilter: "blur(8px)" }}>✕</button>
          <div className="absolute inset-x-0 bottom-0 p-4" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 100%)" }}>
            <div className="text-white font-black text-xl leading-tight" style={{ fontFamily: "var(--font-heebo)" }}>{clinic.flag} {lang === "he" ? clinic.nameHe : clinic.name}</div>
            <div className="text-white/70 text-sm">{lang === "he" ? clinic.locHe : clinic.loc}</div>
          </div>
        </div>
        <div className="scroll-y px-5 pt-4" style={{ maxHeight: "calc(84vh - 252px)" }}>
          <div className="flex gap-2 flex-wrap mb-3" style={{ direction: dir }}>
            <span className="text-xs font-bold px-3 py-1.5 rounded-full" style={{ background: S_BG[clinic.status], color: S_FG[clinic.status] }}>{S_LABEL[clinic.status]}</span>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: "var(--canvas-soft)", color: "var(--ink-muted)" }}>{lang === "he" ? clinic.datesHe : clinic.dates}</span>
          </div>
          <p className="text-[15px] leading-relaxed mb-4" style={{ color: "var(--ink-2)", direction: dir }}>{lang === "he" ? clinic.descHe : clinic.desc}</p>
          <div className="flex flex-wrap gap-2 mb-4" style={{ direction: dir }}>
            {(lang === "he" ? clinic.tagsHe : clinic.tags).map(t => (
              <span key={t} className="text-[11px] font-bold px-3 py-1.5 rounded-full" style={{ background: "var(--canvas-soft)", color: "var(--ink-2)" }}>{t}</span>
            ))}
          </div>
        </div>
        <div className="px-5 pt-2">
          <a href={`https://wa.me/972542491388?text=${encodeURIComponent(clinic.waMsg)}`}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full rounded-2xl py-4 text-white font-black text-base no-underline"
            style={{ background: clinic.gradient }}>
            💬 {clinic.status === "full"
              ? (lang === "he" ? "רשימת המתנה" : "Join Waitlist")
              : (lang === "he" ? "שלח הודעה לעומר" : "Message Omer")}
          </a>
        </div>
      </motion.div>
    </>
  );
}

/* ── Single masonry card ── */
function EventCard({ clinic, tall, index }: { clinic: Clinic; tall: boolean; index: number }) {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  const DOT_COLOR: Record<string, string> = { open: "#10b870", full: "#e05050", soon: "#aaa" };
  const DOT_LABEL: Record<string, string> = lang === "he"
    ? { open: "פנוי", full: "מלא", soon: "בקרוב" }
    : { open: "Open", full: "Full", soon: "Soon" };

  return (
    <>
      <motion.button
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.38, delay: index * 0.06, ease: "easeOut" }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setOpen(true)}
        className="relative overflow-hidden w-full border-0 p-0 cursor-pointer block"
        style={{ borderRadius: 20, background: "#111", aspectRatio: tall ? "3 / 4.5" : "3 / 3.8" }}
      >
        {/* Natural image — no overlay */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={clinic.image} alt={lang === "he" ? clinic.nameHe : clinic.name} className="absolute inset-0 w-full h-full object-cover" />

        {/* Status */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full px-2.5 py-1"
          style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(8px)" }}>
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: DOT_COLOR[clinic.status] }} />
          <span className="text-[9px] font-bold text-white">{DOT_LABEL[clinic.status]}</span>
        </div>

        {/* Bottom */}
        <div className="absolute inset-x-0 bottom-0 p-3"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 100%)" }}>
          <div className="text-white font-black text-[12px] leading-snug" style={{ fontFamily: "var(--font-heebo)" }}>
            {clinic.flag} {lang === "he" ? clinic.nameHe : clinic.name}
          </div>
          <div className="text-white/60 text-[10px] mt-0.5">{lang === "he" ? clinic.datesHe : clinic.dates}</div>
        </div>
      </motion.button>

      <AnimatePresence>
        {open && <DetailSheet key="sheet" clinic={clinic} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

const TABS_HE = [
  { id: "all",  label: "הכל"  },
  { id: "open", label: "פנוי" },
  { id: "full", label: "מלא"  },
  { id: "soon", label: "בקרוב" },
];
const TABS_EN = [
  { id: "all",  label: "All"  },
  { id: "open", label: "Open" },
  { id: "full", label: "Full" },
  { id: "soon", label: "Soon" },
];

export function EventsGrid() {
  const { lang } = useLang();
  const [tab, setTab] = useState("all");
  const TABS = lang === "he" ? TABS_HE : TABS_EN;

  const filtered = tab === "all" ? CLINICS : CLINICS.filter(c => c.status === tab);
  const left  = filtered.filter((_, i) => i % 2 === 0);
  const right = filtered.filter((_, i) => i % 2 === 1);

  return (
    <div className="h-full flex flex-col overflow-hidden" style={{ background: "var(--canvas)" }}>

      {/* Header */}
      <div className="px-5 pb-2 flex-shrink-0" style={{ paddingTop: "max(56px, calc(var(--sat) + 44px))", direction: "rtl" }}>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.22,1,0.36,1] }}>
          <h1 className="font-black text-[38px] leading-tight" style={{ color: "var(--ink)", fontFamily: "var(--font-heebo)", letterSpacing: "-0.025em" }}>
            {lang === "he" ? "טיולים" : "Trips"}
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--ink-muted)" }}>
            {filtered.length} {lang === "he" ? "טיולים · 2026–2027" : "trips · 2026–2027"}
          </p>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 px-5 pb-4 flex-shrink-0" style={{ direction: "rtl" }}>
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="px-4 h-9 rounded-full text-sm font-bold cursor-pointer border-0"
            style={{
              background: tab === t.id ? "var(--ink)" : "var(--surface)",
              color:      tab === t.id ? "var(--canvas)" : "var(--ink-2)",
              border:     `1px solid ${tab === t.id ? "transparent" : "var(--line)"}`,
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Masonry grid */}
      <div className="scroll-y flex-1 px-4" style={{ paddingBottom: "var(--nav-pad)" }}>
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-sm" style={{ color: "var(--ink-muted)" }}>
              {lang === "he" ? "אין טיולים" : "No trips"}
            </div>
          ) : (
            <div className="flex gap-3">
              <div className="flex-1 flex flex-col gap-3">
                {left.map((c, i) => (
                  <EventCard key={c.id} clinic={c} tall={i % 3 !== 1} index={i * 2} />
                ))}
              </div>
              <div className="flex-1 flex flex-col gap-3 mt-8">
                {right.map((c, i) => (
                  <EventCard key={c.id} clinic={c} tall={i % 3 === 1} index={i * 2 + 1} />
                ))}
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
