"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { CLINICS, type Clinic, type Level, type WaveType } from "@/lib/clinics";

type CatId = "all" | "beginner" | "intermediate" | "advanced" | "reef" | "point" | "mellow" | "longboard";

interface Cat { id: CatId; label: string; emoji: string; filter: (c: Clinic) => boolean }

const CATS: Cat[] = [
  { id: "all",          label: "הכל",        emoji: "🌍", filter: () => true },
  { id: "beginner",     label: "מתחילים",     emoji: "🐣", filter: c => c.levels.includes("beginner"   as Level) },
  { id: "intermediate", label: "בינוני",      emoji: "🌀", filter: c => c.levels.includes("intermediate" as Level) },
  { id: "advanced",     label: "מתקדמים",    emoji: "🔥", filter: c => c.levels.includes("advanced"    as Level) },
  { id: "reef",         label: "גלי ריף",    emoji: "💎", filter: c => c.waves.includes("reef"  as WaveType) },
  { id: "point",        label: "פוינטברייק", emoji: "➰", filter: c => c.waves.includes("point" as WaveType) },
  { id: "mellow",       label: "מתון",        emoji: "😌", filter: c => c.waves.includes("mellow" as WaveType) },
  { id: "longboard",    label: "לונגבורד",   emoji: "🏄", filter: c => c.boards.includes("longboard") },
];

/* ── Mini sheet for a selected clinic ── */
function ClinicSheet({ clinic, onClose }: { clinic: Clinic; onClose: () => void }) {
  const S_LABEL: Record<string, string> = { open: "מקומות פנויים", full: "מלא — רשימת המתנה", soon: "נפתח בקרוב" };
  const S_BG:    Record<string, string> = { open: "var(--open-bg)",  full: "var(--full-bg)",   soon: "var(--soon-bg)" };
  const S_FG:    Record<string, string> = { open: "var(--open-fg)",  full: "var(--full-fg)",   soon: "var(--soon-fg)" };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-40"
        style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)" }}
        onClick={onClose}
      />
      <motion.div
        initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 340, damping: 34 }}
        className="fixed inset-x-0 bottom-0 z-50 overflow-hidden"
        style={{
          borderRadius: "28px 28px 0 0",
          background: "#fff",
          maxHeight: "82vh",
          paddingBottom: "max(20px, env(safe-area-inset-bottom))",
        }}
      >
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full" style={{ background: "var(--line)" }} />
        </div>
        <div className="relative mx-4 overflow-hidden" style={{ height: 170, borderRadius: 20, background: clinic.gradient }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={clinic.image} alt={clinic.nameHe} className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.4, mixBlendMode: "overlay" }} />
          <button onClick={onClose} className="absolute top-3 left-3 w-9 h-9 rounded-full flex items-center justify-center text-white border-0" style={{ background: "rgba(0,0,0,0.3)", backdropFilter: "blur(8px)" }}>✕</button>
          <div className="absolute bottom-3 right-4 left-4">
            <div className="text-white font-black text-xl" style={{ fontFamily: "var(--font-heebo)" }}>{clinic.flag} {clinic.nameHe}</div>
            <div className="text-white/70 text-sm">{clinic.locHe} · {clinic.datesHe}</div>
          </div>
        </div>
        <div className="scroll-y px-5 pt-4" style={{ maxHeight: "calc(82vh - 230px)" }}>
          <div className="flex gap-2 flex-wrap mb-3" style={{ direction: "rtl" }}>
            <span className="text-xs font-bold px-3 py-1.5 rounded-full" style={{ background: S_BG[clinic.status], color: S_FG[clinic.status] }}>{S_LABEL[clinic.status]}</span>
          </div>
          <p className="text-[15px] leading-relaxed mb-4" style={{ color: "var(--ink-2)", direction: "rtl" }}>{clinic.descHe}</p>
          <div className="flex flex-wrap gap-2 mb-4" style={{ direction: "rtl" }}>
            {clinic.tagsHe.map(t => (
              <span key={t} className="text-[11px] font-bold px-3 py-1.5 rounded-full" style={{ background: "var(--canvas-soft)", color: "var(--ink-2)" }}>{t}</span>
            ))}
          </div>
        </div>
        <div className="px-5 pt-2">
          <a
            href={`https://wa.me/972542491388?text=${encodeURIComponent(clinic.waMsg)}`}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full rounded-2xl py-4 text-white font-black text-base no-underline"
            style={{ background: clinic.gradient }}
          >
            💬 {clinic.status === "full" ? "רשימת המתנה" : "שלח הודעה לעומר"}
          </a>
        </div>
      </motion.div>
    </>
  );
}

/* ── Clinic row ── */
function ClinicRow({ clinic, index }: { clinic: Clinic; index: number }) {
  const [open, setOpen] = useState(false);
  const S_BG: Record<string, string> = { open: "var(--open-bg)", full: "var(--full-bg)", soon: "var(--soon-bg)" };
  const S_FG: Record<string, string> = { open: "var(--open-fg)", full: "var(--full-fg)", soon: "var(--soon-fg)" };
  const S_LBL: Record<string, string> = { open: "פנוי", full: "מלא", soon: "בקרוב" };

  return (
    <>
      <motion.button
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setOpen(true)}
        className="w-full flex items-center gap-3 rounded-2xl p-4 text-right border-0 cursor-pointer"
        style={{ background: "var(--surface)", border: "1px solid var(--line)", direction: "rtl" }}
      >
        {/* Colour strip */}
        <div className="w-1 self-stretch rounded-full flex-shrink-0" style={{ background: clinic.accentColor }} />

        {/* Thumb */}
        <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0" style={{ background: clinic.gradient }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={clinic.image} alt="" className="w-full h-full object-cover" style={{ opacity: 0.7, mixBlendMode: "overlay" }} />
        </div>

        <div className="flex-1 min-w-0 text-right">
          <div className="font-bold text-[15px] truncate" style={{ color: "var(--ink)" }}>
            {clinic.flag} {clinic.nameHe}
          </div>
          <div className="text-xs mt-0.5" style={{ color: "var(--ink-muted)" }}>{clinic.datesHe}</div>
        </div>

        <span
          className="text-[10px] font-bold px-2.5 py-1 rounded-full flex-shrink-0"
          style={{ background: S_BG[clinic.status], color: S_FG[clinic.status] }}
        >
          {S_LBL[clinic.status]}
        </span>
      </motion.button>

      <AnimatePresence>
        {open && <ClinicSheet key="sheet" clinic={clinic} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

export function CategoriesView() {
  const [active, setActive] = useState<CatId>("all");
  const cat     = CATS.find(c => c.id === active)!;
  const visible = CLINICS.filter(cat.filter);

  return (
    <div className="h-full flex flex-col overflow-hidden" style={{ background: "var(--canvas)" }}>

      {/* Header */}
      <div
        className="px-5 pb-3 flex-shrink-0"
        style={{ paddingTop: "max(56px, calc(var(--sat) + 44px))", direction: "rtl" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1
            className="font-black text-[38px] leading-tight"
            style={{ color: "var(--ink)", fontFamily: "var(--font-heebo)", letterSpacing: "-0.025em" }}
          >
            יעדים
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--ink-muted)" }}>
            {CLINICS.length} טיולים · 5 יעדים · 2026–2027
          </p>
        </motion.div>
      </div>

      {/* Category chips — horizontal scroll, momentum */}
      <div className="scroll-x flex-shrink-0 pb-3" style={{ direction: "rtl" }}>
        <div className="flex gap-2 px-5" style={{ width: "max-content" }}>
          {CATS.map((c, i) => {
            const on = active === c.id;
            return (
              <motion.button
                key={c.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                whileTap={{ scale: 0.93 }}
                onClick={() => setActive(c.id)}
                className="flex items-center gap-2 rounded-full px-5 h-10 text-sm font-bold flex-shrink-0 border-0 cursor-pointer"
                style={{
                  background: on ? "var(--ink)" : "var(--surface)",
                  color:      on ? "var(--canvas)" : "var(--ink-2)",
                  border:     `1px solid ${on ? "transparent" : "var(--line)"}`,
                }}
              >
                <span>{c.emoji}</span>
                <span>{c.label}</span>
                <span
                  className="text-[11px] px-2 py-0.5 rounded-full"
                  style={{
                    background: on ? "rgba(255,255,255,0.18)" : "var(--canvas-soft)",
                    color:      on ? "#fff" : "var(--ink-muted)",
                  }}
                >
                  {CLINICS.filter(c.filter).length}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Active category banner */}
      <motion.div
        key={active}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.28 }}
        className="mx-5 mb-4 flex-shrink-0 rounded-3xl overflow-hidden relative"
        style={{
          height:     120,
          background: active !== "all" ? "var(--ink)" : "var(--surface)",
          border:     `1px solid var(--line)`,
        }}
      >
        {/* Ghost big text */}
        <div
          className="absolute inset-0 flex items-end pb-3 pr-4 font-black leading-none select-none"
          style={{
            fontSize:    52,
            color:       active !== "all" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
            fontFamily:  "var(--font-heebo)",
            direction:   "rtl",
          }}
        >
          {cat.label}
        </div>
        {/* Foreground */}
        <div className="absolute top-4 right-4" style={{ direction: "rtl" }}>
          <div
            className="font-black text-[22px]"
            style={{ color: active !== "all" ? "#fff" : "var(--ink)", fontFamily: "var(--font-heebo)" }}
          >
            {cat.emoji} {cat.label}
          </div>
          <div className="text-sm mt-0.5" style={{ color: active !== "all" ? "rgba(255,255,255,0.55)" : "var(--ink-muted)" }}>
            {visible.length} טיולים מתאימים
          </div>
        </div>
        {/* Mini photo stack */}
        <div className="absolute bottom-4 left-4 flex">
          {visible.slice(0, 4).map((c, i) => (
            <div
              key={c.id}
              className="w-9 h-9 rounded-full overflow-hidden border-2 border-white/40"
              style={{ marginLeft: i > 0 ? -10 : 0, zIndex: 4 - i }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.image} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Clinic list */}
      <div className="scroll-y flex-1 px-5" style={{ paddingBottom: "var(--nav-pad)" }}>
        <AnimatePresence mode="popLayout">
          <div className="flex flex-col gap-3">
            {visible.map((c, i) => (
              <ClinicRow key={c.id} clinic={c} index={i} />
            ))}
            {visible.length === 0 && (
              <div className="text-center py-12 text-sm" style={{ color: "var(--ink-muted)" }}>
                אין טיולים מתאימים
              </div>
            )}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
}
