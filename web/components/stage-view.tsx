"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { CLINICS, wa, type Clinic } from "@/lib/clinics";
import { useLang } from "@/lib/lang-context";
import { GlobeStickers } from "@/components/ui/cobe-globe-stickers";

const CLINIC_MARKERS = [
  { id: "mentawai",    location: [-1.50,   99.80] as [number, number], sticker: "🌊" },
  { id: "phil1",      location: [ 9.85,  126.05] as [number, number], sticker: "🌴" },
  { id: "phil2",      location: [ 9.40,  125.80] as [number, number], sticker: "🐚" },
  { id: "elsalvador", location: [13.70,  -89.20] as [number, number], sticker: "🤙" },
  { id: "mexico",     location: [17.70, -101.50] as [number, number], sticker: "🐋" },
  { id: "srilanka1",  location: [ 5.97,   80.36] as [number, number], sticker: "🦁" },
];

/* ── Detail sheet ── */
function DetailSheet({ clinic, onClose }: { clinic: Clinic; onClose: () => void }) {
  const { lang } = useLang();

  const S_LABEL: Record<string, string> = lang === "he"
    ? { open: "מקומות פנויים", full: "מלא — רשימת המתנה", soon: "נפתח בקרוב" }
    : { open: "Spots available", full: "Full — Waitlist", soon: "Coming soon" };
  const S_BG: Record<string, string> = {
    open: "var(--open-bg)", full: "var(--full-bg)", soon: "var(--soon-bg)",
  };
  const S_FG: Record<string, string> = {
    open: "var(--open-fg)", full: "var(--full-fg)", soon: "var(--soon-fg)",
  };

  const WAVE_LABELS: Record<string, string> = lang === "he"
    ? { reef: "🪸 ריף", point: "🌀 פוינט", mellow: "🏖️ חוף" }
    : { reef: "🪸 Reef", point: "🌀 Point", mellow: "🏖️ Beach" };
  const LEVEL_LABELS: Record<string, string> = lang === "he"
    ? { beginner: "🟢 מתחיל", intermediate: "🟡 בינוני", advanced: "🔴 מתקדם" }
    : { beginner: "🟢 Beginner", intermediate: "🟡 Intermediate", advanced: "🔴 Advanced" };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        className="fixed inset-0 z-40"
        style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)" }}
        onClick={onClose}
      />

      {/* Sheet */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 480, damping: 40 }}
        className="fixed inset-x-0 bottom-0 z-50 overflow-hidden"
        style={{
          borderRadius: "28px 28px 0 0",
          background: "#fff",
          maxHeight: "90vh",
          paddingBottom: "max(20px, env(safe-area-inset-bottom))",
        }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full" style={{ background: "var(--line)" }} />
        </div>

        {/* Hero image */}
        <div
          className="relative mx-4 overflow-hidden"
          style={{ height: 260, borderRadius: 20, background: "#111" }}
        >
          {/* Animated image zoom-in on open */}
          <motion.img
            src={clinic.image}
            alt={lang === "he" ? clinic.nameHe : clinic.name}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Gradient overlays */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.3) 55%, transparent 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, transparent 55%, ${clinic.accentColor}22 100%)`,
            }}
          />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center text-white text-base border-0"
            style={{ background: "rgba(0,0,0,0.40)", backdropFilter: "blur(10px)" }}
          >
            ✕
          </button>

          {/* Destination info over image */}
          <div className="absolute inset-x-0 bottom-0 p-4" style={{ direction: lang === "he" ? "rtl" : "ltr" }}>
            <div
              className="text-white font-black text-xl leading-tight"
              style={{ fontFamily: "var(--font-heebo)", textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}
            >
              {clinic.flag} {lang === "he" ? clinic.nameHe : clinic.name}
            </div>
            <div className="text-white/75 text-sm mt-0.5">
              📍 {lang === "he" ? clinic.locHe : clinic.loc}
            </div>
            <div className="mt-2">
              <span
                className="text-[11px] px-2.5 py-1 rounded-full text-white font-semibold inline-block"
                style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(8px)" }}
              >
                📅 {lang === "he" ? clinic.datesHe : clinic.dates}
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable body */}
        <div
          className="scroll-y px-5 pt-4"
          style={{ maxHeight: "calc(90vh - 300px)", direction: lang === "he" ? "rtl" : "ltr" }}
        >
          {/* Status + wave + level chips */}
          <div className="flex items-center gap-2 flex-wrap mb-4">
            <span
              className="text-xs font-bold px-3 py-1.5 rounded-full"
              style={{ background: S_BG[clinic.status], color: S_FG[clinic.status] }}
            >
              {S_LABEL[clinic.status]}
            </span>
            {clinic.waves.map((w) => (
              <span
                key={w}
                className="text-xs px-2.5 py-1.5 rounded-full font-medium"
                style={{ background: "var(--canvas-soft)", color: "var(--ink-2)" }}
              >
                {WAVE_LABELS[w]}
              </span>
            ))}
            {clinic.levels.map((l) => (
              <span
                key={l}
                className="text-xs px-2.5 py-1.5 rounded-full font-medium"
                style={{ background: "var(--canvas-soft)", color: "var(--ink-2)" }}
              >
                {LEVEL_LABELS[l]}
              </span>
            ))}
          </div>

          {/* Description */}
          <p
            className="text-[15px] leading-relaxed mb-4"
            style={{ color: "var(--ink-2)" }}
          >
            {lang === "he" ? clinic.descHe : clinic.desc}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {(lang === "he" ? clinic.tagsHe : clinic.tags).map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-bold px-3 py-1.5 rounded-full"
                style={{ background: "var(--canvas-soft)", color: "var(--ink-2)" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="px-5 pt-2">
          <a
            href={wa(clinic.waMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full rounded-2xl py-4 text-white font-black text-base no-underline"
            style={{ background: clinic.gradient }}
          >
            💬{" "}
            {clinic.status === "full"
              ? lang === "he" ? "הצטרפות לרשימת המתנה" : "Join Waitlist"
              : lang === "he" ? "שלח הודעה לעומר" : "Message Omer"}
          </a>
        </div>
      </motion.div>
    </>
  );
}

/* ── Stage view ── */
export function StageView() {
  const { lang } = useLang();
  const [selected, setSelected] = useState<Clinic | null>(null);

  const handleMarkerClick = (id: string) => {
    const clinic = CLINICS.find((c) => c.id === id);
    if (clinic) setSelected(clinic);
  };

  return (
    <div
      className="relative h-full flex flex-col items-center overflow-hidden"
      style={{ background: "var(--canvas)" }}
    >
      {/* Centered H1 */}
      <div
        className="z-20 text-center px-4 pointer-events-none w-full"
        style={{ paddingTop: "max(52px, calc(var(--sat) + 40px))" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="font-black leading-none"
            style={{
              fontSize: "clamp(44px, 13vw, 68px)",
              letterSpacing: "-0.03em",
              color: "var(--ink)",
              fontFamily: "var(--font-heebo)",
            }}
          >
            {lang === "he" ? "בחר את" : "Choose"}
          </div>
          <div
            className="font-black leading-none"
            style={{
              fontSize: "clamp(44px, 13vw, 68px)",
              letterSpacing: "-0.03em",
              fontFamily: "var(--font-heebo)",
              WebkitTextStroke: "2.5px var(--ink)",
              color: "transparent",
            }}
          >
            {lang === "he" ? "הגל שלך" : "Your Wave"}
          </div>
          <div
            className="mt-2 text-[12px] font-medium tracking-wide"
            style={{ color: "var(--ink-muted)" }}
          >
            {lang === "he"
              ? "סובב את הגלובוס • לחץ על יעד"
              : "Spin the globe • tap a destination"}
          </div>
        </motion.div>
      </div>

      {/* Globe area */}
      <div className="flex-1 flex items-center justify-center w-full relative">
        {/* Atmospheric glow behind globe */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: "min(85vw, 460px)",
            height: "min(85vw, 460px)",
            background:
              "radial-gradient(circle, rgba(40,90,255,0.14) 0%, rgba(20,50,200,0.06) 50%, transparent 75%)",
            filter: "blur(32px)",
          }}
        />

        <motion.div
          className="relative"
          style={{ width: "min(85vw, 460px)" }}
          initial={{ opacity: 0, scale: 0.82 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <GlobeStickers
            markers={CLINIC_MARKERS}
            onMarkerClick={handleMarkerClick}
            speed={0.004}
          />
        </motion.div>
      </div>

      {/* Fade-out gradient at bottom so nav doesn't clash */}
      <div
        className="absolute inset-x-0 bottom-0 z-10 pointer-events-none"
        style={{
          height: 110,
          background: "linear-gradient(to top, var(--canvas) 0%, transparent 100%)",
        }}
      />

      {/* Pulse hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2.6, delay: 2.8, repeat: 2 }}
        className="absolute inset-x-0 z-20 text-center text-xs pointer-events-none"
        style={{
          bottom: "calc(var(--nav-pad) + 10px)",
          color: "var(--ink-muted)",
        }}
      >
        {lang === "he" ? "👆 לחץ על הסמל לפרטי הטיול" : "👆 Tap a marker to explore the trip"}
      </motion.div>

      <AnimatePresence>
        {selected && (
          <DetailSheet key="sheet" clinic={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
