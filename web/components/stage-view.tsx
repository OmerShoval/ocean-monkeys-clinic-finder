"use client";

import { motion, useAnimationFrame, AnimatePresence } from "motion/react";
import { useRef, useState } from "react";
import { CLINICS, wa, type Clinic } from "@/lib/clinics";
import { useLang } from "@/lib/lang-context";

/* ── Drift configs ── */
const DRIFT = [
  { x: 5,  y: 12, rot: -6,  dx: 14, dy: 10, spd: 0.00038 },
  { x: 52, y: 8,  rot:  5,  dx: 10, dy: 14, spd: 0.00032 },
  { x: 2,  y: 45, rot: -9,  dx: 16, dy:  8, spd: 0.00044 },
  { x: 55, y: 42, rot:  7,  dx:  8, dy: 12, spd: 0.00036 },
  { x: 24, y: 26, rot: -4,  dx: 12, dy: 16, spd: 0.00040 },
  { x: 62, y: 20, rot:  8,  dx:  9, dy: 11, spd: 0.00030 },
  { x: 34, y: 56, rot: -5,  dx: 18, dy:  7, spd: 0.00046 },
] as const;

const CARD_W = [160, 140, 130, 160, 145, 135, 150];

function FloatingCard({
  clinic, drift, w, index, onClick,
}: {
  clinic: Clinic;
  drift: typeof DRIFT[number];
  w: number;
  index: number;
  onClick: (c: Clinic) => void;
}) {
  const { lang } = useLang();
  const t = useRef(index * 900);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useAnimationFrame((_, dt) => {
    t.current += dt;
    const s = t.current * drift.spd;
    setOffset({ x: Math.sin(s) * drift.dx, y: Math.sin(s * 1.4) * drift.dy });
  });

  const STATUS_COLOR: Record<string, string> = { open: "#10b870", full: "#e05050", soon: "#aaa" };
  const STATUS_LABEL: Record<string, string> = lang === "he"
    ? { open: "פנוי", full: "מלא", soon: "בקרוב" }
    : { open: "Open", full: "Full", soon: "Soon" };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.75 }}
      animate={{ opacity: 1, scale: 1, x: offset.x, y: offset.y }}
      transition={{
        opacity: { duration: 0.45, delay: index * 0.08, ease: "easeOut" },
        scale:   { duration: 0.45, delay: index * 0.08, ease: "easeOut" },
        x: { duration: 0 },
        y: { duration: 0 },
      }}
      whileHover={{ scale: 1.07, zIndex: 30 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(clinic)}
      className="absolute cursor-pointer border-0 bg-transparent p-0"
      style={{ left: `${drift.x}%`, top: `${drift.y}%`, rotate: `${drift.rot}deg`, width: w, zIndex: 12 - index }}
    >
      <div
        className="relative overflow-hidden w-full"
        style={{
          background:   "#111",
          borderRadius: 22,
          aspectRatio:  "3 / 4",
          boxShadow:    "0 16px 48px rgba(0,0,0,0.28), 0 2px 8px rgba(0,0,0,0.16)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={clinic.image}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Status pill */}
        <div
          className="absolute top-2.5 right-2.5 text-[9px] font-bold px-2 py-0.5 rounded-full"
          style={{
            background:     STATUS_COLOR[clinic.status] + "28",
            color:          STATUS_COLOR[clinic.status],
            border:         `1px solid ${STATUS_COLOR[clinic.status]}55`,
            backdropFilter: "blur(8px)",
          }}
        >
          {STATUS_LABEL[clinic.status]}
        </div>

        {/* Bottom text */}
        <div
          className="absolute inset-x-0 bottom-0 p-3"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 100%)" }}
        >
          <div className="text-white font-black text-[11px] leading-snug" style={{ fontFamily: "var(--font-heebo)" }}>
            {clinic.flag} {lang === "he" ? clinic.nameHe : clinic.name}
          </div>
          <div className="text-white/65 text-[9px] mt-0.5 font-medium">
            {lang === "he" ? clinic.datesHe : clinic.dates}
          </div>
        </div>
      </div>
    </motion.button>
  );
}

/* ── Full-screen bottom sheet ── */
function DetailSheet({ clinic, onClose }: { clinic: Clinic; onClose: () => void }) {
  const { lang } = useLang();
  const S_LABEL: Record<string, string> = lang === "he"
    ? { open: "מקומות פנויים", full: "מלא — רשימת המתנה", soon: "נפתח בקרוב" }
    : { open: "Spots available", full: "Full — Waitlist", soon: "Coming soon" };
  const S_BG: Record<string, string> = { open: "var(--open-bg)", full: "var(--full-bg)", soon: "var(--soon-bg)" };
  const S_FG: Record<string, string> = { open: "var(--open-fg)", full: "var(--full-fg)", soon: "var(--soon-fg)" };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-40"
        style={{ background: "rgba(0,0,0,0.48)", backdropFilter: "blur(6px)" }}
        onClick={onClose}
      />

      <motion.div
        initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 340, damping: 34 }}
        className="fixed inset-x-0 bottom-0 z-50 overflow-hidden"
        style={{ borderRadius: "28px 28px 0 0", background: "#fff", maxHeight: "88vh", paddingBottom: "max(20px, env(safe-area-inset-bottom))" }}
      >
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full" style={{ background: "var(--line)" }} />
        </div>

        {/* Hero image — natural, no overlay */}
        <div className="relative mx-4 overflow-hidden" style={{ height: 200, borderRadius: 20, background: "#111" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={clinic.image} alt={clinic.nameHe} className="absolute inset-0 w-full h-full object-cover" />
          <button
            onClick={onClose}
            className="absolute top-3 left-3 w-9 h-9 rounded-full flex items-center justify-center text-white text-base border-0"
            style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(8px)" }}
          >✕</button>
          <div className="absolute inset-x-0 bottom-0 p-4" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 100%)" }}>
            <div className="text-white font-black text-xl leading-tight" style={{ fontFamily: "var(--font-heebo)" }}>
              {clinic.flag} {lang === "he" ? clinic.nameHe : clinic.name}
            </div>
            <div className="text-white/75 text-sm mt-0.5">{lang === "he" ? clinic.locHe : clinic.loc}</div>
          </div>
        </div>

        <div className="scroll-y px-5 pt-4" style={{ maxHeight: "calc(88vh - 260px)" }}>
          <div className="flex items-center gap-2 flex-wrap mb-4" style={{ direction: lang === "he" ? "rtl" : "ltr" }}>
            <span className="text-xs font-bold px-3 py-1.5 rounded-full" style={{ background: S_BG[clinic.status], color: S_FG[clinic.status] }}>
              {S_LABEL[clinic.status]}
            </span>
            <span className="text-sm font-semibold" style={{ color: "var(--ink-muted)" }}>
              {lang === "he" ? clinic.datesHe : clinic.dates}
            </span>
          </div>

          <p className="text-[15px] leading-relaxed mb-4" style={{ color: "var(--ink-2)", direction: lang === "he" ? "rtl" : "ltr" }}>
            {lang === "he" ? clinic.descHe : clinic.desc}
          </p>

          <div className="flex flex-wrap gap-2 mb-6" style={{ direction: lang === "he" ? "rtl" : "ltr" }}>
            {(lang === "he" ? clinic.tagsHe : clinic.tags).map((tag) => (
              <span key={tag} className="text-[11px] font-bold px-3 py-1.5 rounded-full" style={{ background: "var(--canvas-soft)", color: "var(--ink-2)" }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="px-5 pt-2">
          <a
            href={wa(clinic.waMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full rounded-2xl py-4 text-white font-black text-base no-underline"
            style={{ background: clinic.gradient }}
          >
            💬 {clinic.status === "full"
              ? (lang === "he" ? "הצטרפות לרשימת המתנה" : "Join Waitlist")
              : (lang === "he" ? "שלח הודעה לעומר" : "Message Omer")}
          </a>
        </div>
      </motion.div>
    </>
  );
}

export function StageView() {
  const { lang } = useLang();
  const [selected, setSelected] = useState<Clinic | null>(null);

  return (
    <div className="relative h-full overflow-hidden" style={{ background: "var(--canvas)" }}>

      <div
        className="absolute inset-x-0 top-0 z-20 px-5 pointer-events-none"
        style={{ paddingTop: "max(56px, calc(var(--sat) + 44px))", direction: "rtl" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="font-black leading-none"
            style={{ fontSize: "clamp(54px, 17vw, 80px)", letterSpacing: "-0.03em", color: "var(--ink)", fontFamily: "var(--font-heebo)" }}
          >
            {lang === "he" ? "בחר את" : "Choose"}
          </div>
          <div
            className="font-black leading-none"
            style={{ fontSize: "clamp(54px, 17vw, 80px)", letterSpacing: "-0.03em", fontFamily: "var(--font-heebo)", WebkitTextStroke: "2.5px var(--ink)", color: "transparent" }}
          >
            {lang === "he" ? "הגל שלך" : "Your Wave"}
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0" style={{ top: "max(190px, 30%)" }}>
        {CLINICS.map((clinic, i) => (
          <FloatingCard
            key={clinic.id}
            clinic={clinic}
            drift={DRIFT[i % DRIFT.length]}
            w={CARD_W[i % CARD_W.length]}
            index={i}
            onClick={setSelected}
          />
        ))}
      </div>

      <div
        className="absolute inset-x-0 bottom-0 z-10 pointer-events-none"
        style={{ height: 120, background: "linear-gradient(to top, var(--canvas) 0%, transparent 100%)" }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2.4, delay: 2.5, repeat: 2 }}
        className="absolute inset-x-0 z-20 text-center text-sm pointer-events-none"
        style={{ bottom: "calc(var(--nav-pad) + 12px)", color: "var(--ink-muted)" }}
      >
        {lang === "he" ? "הקש על כרטיס לפרטים" : "Tap a card for details"}
      </motion.div>

      <AnimatePresence>
        {selected && (
          <DetailSheet key="sheet" clinic={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
