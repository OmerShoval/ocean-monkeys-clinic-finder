"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { CLINICS, type Clinic } from "@/lib/clinics";

const TABS = [
  { id: "all",  label: "הכל"  },
  { id: "open", label: "פנוי" },
  { id: "full", label: "מלא"  },
  { id: "soon", label: "בקרוב" },
];

/* ── Shared detail sheet ── */
function DetailSheet({ clinic, onClose }: { clinic: Clinic; onClose: () => void }) {
  const S_LABEL: Record<string, string> = { open: "מקומות פנויים", full: "מלא — רשימת המתנה", soon: "נפתח בקרוב" };
  const S_BG:    Record<string, string> = { open: "var(--open-bg)",  full: "var(--full-bg)",   soon: "var(--soon-bg)" };
  const S_FG:    Record<string, string> = { open: "var(--open-fg)",  full: "var(--full-fg)",   soon: "var(--soon-fg)" };

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
        <div className="relative mx-4 overflow-hidden" style={{ height: 190, borderRadius: 20, background: clinic.gradient }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={clinic.image} alt={clinic.nameHe} className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.42, mixBlendMode: "overlay" }} />
          <button onClick={onClose} className="absolute top-3 left-3 w-9 h-9 rounded-full flex items-center justify-center text-white border-0" style={{ background: "rgba(0,0,0,0.32)", backdropFilter: "blur(8px)" }}>✕</button>
          <div className="absolute bottom-4 right-4 left-4">
            <div className="text-white font-black text-xl leading-tight" style={{ fontFamily: "var(--font-heebo)" }}>{clinic.flag} {clinic.nameHe}</div>
            <div className="text-white/70 text-sm">{clinic.locHe}</div>
          </div>
        </div>
        <div className="scroll-y px-5 pt-4" style={{ maxHeight: "calc(84vh - 252px)" }}>
          <div className="flex gap-2 flex-wrap mb-3" style={{ direction: "rtl" }}>
            <span className="text-xs font-bold px-3 py-1.5 rounded-full" style={{ background: S_BG[clinic.status], color: S_FG[clinic.status] }}>{S_LABEL[clinic.status]}</span>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: "var(--canvas-soft)", color: "var(--ink-muted)" }}>{clinic.datesHe}</span>
          </div>
          <p className="text-[15px] leading-relaxed mb-4" style={{ color: "var(--ink-2)", direction: "rtl" }}>{clinic.descHe}</p>
          <div className="flex flex-wrap gap-2 mb-4" style={{ direction: "rtl" }}>
            {clinic.tagsHe.map(t => (
              <span key={t} className="text-[11px] font-bold px-3 py-1.5 rounded-full" style={{ background: "var(--canvas-soft)", color: "var(--ink-2)" }}>{t}</span>
            ))}
          </div>
        </div>
        <div className="px-5 pt-2">
          <a href={`https://wa.me/972542491388?text=${encodeURIComponent(clinic.waMsg)}`}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full rounded-2xl py-4 text-white font-black text-base no-underline"
            style={{ background: clinic.gradient }}>
            💬 {clinic.status === "full" ? "רשימת המתנה" : "שלח הודעה לעומר"}
          </a>
        </div>
      </motion.div>
    </>
  );
}

/* ── Single masonry card ── */
function EventCard({ clinic, tall, index }: { clinic: Clinic; tall: boolean; index: number }) {
  const [open, setOpen] = useState(false);
  const DOT_COLOR: Record<string, string> = { open: "#10b870", full: "#e05050", soon: "#aaa" };
  const DOT_LABEL: Record<string, string> = { open: "פנוי", full: "מלא", soon: "בקרוב" };

  return (
    <>
      <motion.button
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.38, delay: index * 0.06, ease: "easeOut" }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setOpen(true)}
        className="relative overflow-hidden w-full border-0 p-0 cursor-pointer block"
        style={{
          borderRadius: 20,
          background:   clinic.gradient,
          aspectRatio:  tall ? "3 / 4.5" : "3 / 3.8",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={clinic.image} alt={clinic.nameHe} className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.38, mixBlendMode: "overlay" }} />

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
            {clinic.flag} {clinic.nameHe}
          </div>
          <div className="text-white/60 text-[10px] mt-0.5">{clinic.datesHe}</div>
        </div>
      </motion.button>

      <AnimatePresence>
        {open && <DetailSheet key="sheet" clinic={clinic} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

export function EventsGrid() {
  const [tab, setTab] = useState("all");

  const filtered = tab === "all" ? CLINICS : CLINICS.filter(c => c.status === tab);
  const left  = filtered.filter((_, i) => i % 2 === 0);
  const right = filtered.filter((_, i) => i % 2 === 1);

  return (
    <div className="h-full flex flex-col overflow-hidden" style={{ background: "var(--canvas)" }}>

      {/* Header */}
      <div
        className="px-5 pb-2 flex-shrink-0"
        style={{ paddingTop: "max(56px, calc(var(--sat) + 44px))", direction: "rtl" }}
      >
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.22,1,0.36,1] }}>
          <h1 className="font-black text-[38px] leading-tight" style={{ color: "var(--ink)", fontFamily: "var(--font-heebo)", letterSpacing: "-0.025em" }}>
            טיולים
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--ink-muted)" }}>
            {filtered.length} טיולים · 2026–2027
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
            <div className="text-center py-16 text-sm" style={{ color: "var(--ink-muted)" }}>אין טיולים</div>
          ) : (
            <div className="flex gap-3">
              {/* Left column */}
              <div className="flex-1 flex flex-col gap-3">
                {left.map((c, i) => (
                  <EventCard key={c.id} clinic={c} tall={i % 3 !== 1} index={i * 2} />
                ))}
              </div>
              {/* Right column — offset top for masonry feel */}
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
