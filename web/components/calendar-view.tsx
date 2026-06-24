"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { HOLIDAYS, CLINIC_RANGES, clinicDateRange, type Holiday } from "@/lib/holidays";
import { CLINICS } from "@/lib/clinics";
import { useLang } from "@/lib/lang-context";

const HE_MONTHS = ["ינואר","פברואר","מרץ","אפריל","מאי","יוני","יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר"];
const EN_MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const HE_DAYS   = ["א׳","ב׳","ג׳","ד׳","ה׳","ו׳","ש׳"];
const EN_DAYS   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

/* ── Precompute date maps once ── */
const clinicColorMap: Record<string, string[]> = {};
CLINIC_RANGES.forEach(r => {
  clinicDateRange(r.start, r.end).forEach(d => {
    (clinicColorMap[d] ??= []).push(r.color);
  });
});

const holidayMap: Record<string, Holiday[]> = {};
HOLIDAYS.forEach(h => { (holidayMap[h.date] ??= []).push(h); });

const TODAY = new Date().toISOString().slice(0, 10);

function pad(n: number) { return String(n).padStart(2, "0"); }
function toDS(y: number, m: number, d: number) { return `${y}-${pad(m + 1)}-${pad(d)}`; }
function daysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate(); }
function firstDow(y: number, m: number) { return new Date(y, m, 1).getDay(); }

interface DayInfo { day: number; dateStr: string; clinicColors: string[]; holidays: Holiday[]; isToday: boolean }

function MonthGrid({ year, month, selected, onDay, lang }: {
  year: number; month: number; selected: string | null; onDay: (d: DayInfo) => void; lang: "he" | "en";
}) {
  const dim  = daysInMonth(year, month);
  const fill = firstDow(year, month);

  const days: (DayInfo | null)[] = Array(fill).fill(null);
  for (let d = 1; d <= dim; d++) {
    const ds = toDS(year, month, d);
    days.push({ day: d, dateStr: ds, clinicColors: clinicColorMap[ds] ?? [], holidays: holidayMap[ds] ?? [], isToday: ds === TODAY });
  }

  const MONTHS = lang === "he" ? HE_MONTHS : EN_MONTHS;
  const DAYS   = lang === "he" ? HE_DAYS   : EN_DAYS;

  return (
    <div className="mb-8">
      <div className="text-center font-black text-[17px] mb-3" style={{ fontFamily: "var(--font-heebo)", color: "var(--ink)", letterSpacing: "-0.01em" }}>
        {MONTHS[month]} {year}
      </div>

      <div className="grid grid-cols-7 mb-1">
        {DAYS.map(d => (
          <div key={d} className="text-center text-[11px] font-bold py-1" style={{ color: "var(--ink-muted)" }}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-0.5">
        {days.map((info, i) => {
          if (!info) return <div key={`e${i}`} className="h-12" />;
          const isSel     = info.dateStr === selected;
          const hasClinic = info.clinicColors.length > 0;
          const hasHebrew = info.holidays.some(h => h.kind === "hebrew");
          const hasWorld  = info.holidays.some(h => h.kind === "world");
          const primary   = info.clinicColors[0];
          const hasAny    = hasClinic || hasHebrew || hasWorld;

          return (
            <motion.button
              key={info.dateStr}
              whileTap={{ scale: 0.85 }}
              onClick={() => onDay(info)}
              className="flex flex-col items-center justify-center h-12 rounded-2xl border-0 cursor-pointer relative"
              style={{ background: isSel ? "var(--ink)" : hasClinic ? `${primary}1a` : "transparent" }}
            >
              <span
                className="text-[14px] font-bold w-8 h-8 flex items-center justify-center rounded-full"
                style={{
                  fontFamily: "var(--font-heebo)",
                  color: isSel ? "var(--canvas)" : info.isToday ? "var(--coral)" : "var(--ink)",
                  background: info.isToday && !isSel ? "rgba(204,120,92,0.12)" : "transparent",
                }}
              >
                {info.day}
              </span>

              {hasAny && (
                <div className="flex gap-0.5 mt-0.5 h-1.5 items-center absolute bottom-1">
                  {hasClinic && <div className="w-1.5 h-1.5 rounded-full" style={{ background: isSel ? "#fff" : primary }} />}
                  {hasHebrew && <div className="w-1.5 h-1.5 rounded-full" style={{ background: isSel ? "#fff" : "#8B6FF0" }} />}
                  {hasWorld  && <div className="w-1.5 h-1.5 rounded-full" style={{ background: isSel ? "#fff" : "#F0A830" }} />}
                </div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Selected-day detail card ── */
function DayDetail({ dateStr, onClose, lang }: { dateStr: string; onClose: () => void; lang: "he" | "en" }) {
  const holidays      = holidayMap[dateStr] ?? [];
  const colors        = clinicColorMap[dateStr] ?? [];
  const MONTHS        = lang === "he" ? HE_MONTHS : EN_MONTHS;

  const activeClinics = CLINIC_RANGES
    .filter(r => colors.includes(r.color))
    .map(r => CLINICS.find(c => c.id === r.id)!)
    .filter(Boolean);

  if (!holidays.length && !activeClinics.length) return null;

  const [y, m, d] = dateStr.split("-").map(Number);
  const label = lang === "he" ? `${d} ${MONTHS[m - 1]} ${y}` : `${MONTHS[m - 1]} ${d}, ${y}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 4, scale: 0.97 }}
      transition={{ duration: 0.22 }}
      className="mx-4 mb-4 rounded-3xl overflow-hidden flex-shrink-0"
      style={{ background: "var(--surface)", border: "1px solid var(--line)" }}
    >
      <div className="flex items-center justify-between px-4 py-3" style={{ direction: lang === "he" ? "rtl" : "ltr", borderBottom: "1px solid var(--line)" }}>
        <span className="font-black text-[15px]" style={{ fontFamily: "var(--font-heebo)", color: "var(--ink)" }}>{label}</span>
        <button onClick={onClose} className="w-7 h-7 rounded-full flex items-center justify-center border-0 cursor-pointer text-sm" style={{ background: "var(--canvas-soft)", color: "var(--ink-muted)" }}>✕</button>
      </div>

      <div className="px-4 py-3 flex flex-col gap-2.5">
        {activeClinics.map(c => (
          <a
            key={c.id}
            href={`https://wa.me/972542491388?text=${encodeURIComponent(c.waMsg)}`}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-2xl p-3 no-underline"
            style={{ background: `${c.accentColor}12`, border: `1px solid ${c.accentColor}2a`, direction: lang === "he" ? "rtl" : "ltr" }}
          >
            <div className="w-1 self-stretch rounded-full flex-shrink-0" style={{ background: c.accentColor }} />
            <div className="flex-1">
              <div className="font-bold text-[14px]" style={{ color: "var(--ink)" }}>{c.flag} {lang === "he" ? c.nameHe : c.name}</div>
              <div className="text-xs" style={{ color: "var(--ink-muted)" }}>{lang === "he" ? c.datesHe : c.dates}</div>
            </div>
            <span className="text-base flex-shrink-0">💬</span>
          </a>
        ))}

        {holidays.map((h, i) => (
          <div key={i} className="flex items-center gap-3 rounded-2xl p-3"
            style={{
              background: h.kind === "hebrew" ? "rgba(139,111,240,0.08)" : h.kind === "world" ? "rgba(240,168,48,0.08)" : "var(--canvas-soft)",
              border: `1px solid ${h.kind === "hebrew" ? "rgba(139,111,240,0.2)" : h.kind === "world" ? "rgba(240,168,48,0.2)" : "var(--line)"}`,
              direction: lang === "he" ? "rtl" : "ltr",
            }}
          >
            <span className="text-[20px] flex-shrink-0">{h.emoji}</span>
            <div>
              <div className="font-bold text-[14px]" style={{ color: "var(--ink)" }}>{h.labelHe}</div>
              <div className="text-xs" style={{ color: "var(--ink-muted)" }}>
                {h.kind === "hebrew"
                  ? (lang === "he" ? "חג יהודי" : "Jewish holiday")
                  : (lang === "he" ? "אירוע עולמי" : "World event")}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

const MONTHS_SEQ = [
  { year: 2026, month: 8  },
  { year: 2026, month: 9  },
  { year: 2026, month: 10 },
  { year: 2026, month: 11 },
  { year: 2027, month: 0  },
  { year: 2027, month: 1  },
];

export function CalendarView() {
  const { lang } = useLang();
  const [selected, setSelected] = useState<string | null>(null);

  const handleDay = (info: DayInfo) => {
    if (!info.clinicColors.length && !info.holidays.length) return;
    setSelected(s => s === info.dateStr ? null : info.dateStr);
  };

  return (
    <div className="h-full flex flex-col overflow-hidden" style={{ background: "var(--canvas)" }}>

      {/* Header */}
      <div className="px-5 pb-2 flex-shrink-0" style={{ paddingTop: "max(56px, calc(var(--sat) + 44px))", direction: "rtl" }}>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.22,1,0.36,1] }}>
          <h1 className="font-black text-[38px] leading-tight" style={{ color: "var(--ink)", fontFamily: "var(--font-heebo)", letterSpacing: "-0.025em" }}>
            {lang === "he" ? "לוח שנה" : "Calendar"}
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--ink-muted)" }}>
            {lang === "he" ? "ספטמבר 2026 – פברואר 2027" : "Sep 2026 – Feb 2027"}
          </p>
        </motion.div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 px-5 pb-3 flex-shrink-0" style={{ direction: lang === "he" ? "rtl" : "ltr" }}>
        {[
          { color: "#10b870", labelHe: "טיולים",         labelEn: "Trips" },
          { color: "#8B6FF0", labelHe: "חגים יהודיים",   labelEn: "Jewish holidays" },
          { color: "#F0A830", labelHe: "אירועי עולם",    labelEn: "World events" },
        ].map(({ color, labelHe, labelEn }) => (
          <div key={color} className="flex items-center gap-1.5 text-xs" style={{ color: "var(--ink-muted)" }}>
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
            {lang === "he" ? labelHe : labelEn}
          </div>
        ))}
      </div>

      {/* ── DayDetail lives OUTSIDE the scroll container so it stays visible ── */}
      <AnimatePresence mode="wait">
        {selected && (
          <DayDetail key={selected} dateStr={selected} onClose={() => setSelected(null)} lang={lang} />
        )}
      </AnimatePresence>

      {/* Scrollable months */}
      <div className="scroll-y flex-1 px-4" style={{ paddingBottom: "var(--nav-pad)" }}>
        {MONTHS_SEQ.map(({ year, month }, i) => (
          <motion.div
            key={`${year}-${month}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
          >
            <MonthGrid year={year} month={month} selected={selected} onDay={handleDay} lang={lang} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
