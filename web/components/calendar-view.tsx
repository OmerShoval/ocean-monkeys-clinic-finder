"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { HOLIDAYS, CLINIC_RANGES, clinicDateRange, type Holiday } from "@/lib/holidays";
import { CLINICS } from "@/lib/clinics";

const HE_MONTHS = ["ינואר","פברואר","מרץ","אפריל","מאי","יוני","יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר"];
const HE_DAYS   = ["א׳","ב׳","ג׳","ד׳","ה׳","ו׳","ש׳"];

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

function MonthGrid({ year, month, selected, onDay }: {
  year: number; month: number; selected: string | null; onDay: (d: DayInfo) => void;
}) {
  const dim  = daysInMonth(year, month);
  const fill = firstDow(year, month);

  const days: (DayInfo | null)[] = Array(fill).fill(null);
  for (let d = 1; d <= dim; d++) {
    const ds = toDS(year, month, d);
    days.push({ day: d, dateStr: ds, clinicColors: clinicColorMap[ds] ?? [], holidays: holidayMap[ds] ?? [], isToday: ds === TODAY });
  }

  return (
    <div className="mb-8">
      {/* Month label */}
      <div
        className="text-center font-black text-[17px] mb-3"
        style={{ fontFamily: "var(--font-heebo)", color: "var(--ink)", letterSpacing: "-0.01em" }}
      >
        {HE_MONTHS[month]} {year}
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {HE_DAYS.map(d => (
          <div key={d} className="text-center text-[11px] font-bold py-1" style={{ color: "var(--ink-muted)" }}>{d}</div>
        ))}
      </div>

      {/* Cells */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {days.map((info, i) => {
          if (!info) return <div key={`e${i}`} className="h-12" />;
          const isSel      = info.dateStr === selected;
          const hasClinic  = info.clinicColors.length > 0;
          const hasHebrew  = info.holidays.some(h => h.kind === "hebrew");
          const hasWorld   = info.holidays.some(h => h.kind === "world");
          const primary    = info.clinicColors[0];
          const hasAny     = hasClinic || hasHebrew || hasWorld;

          return (
            <motion.button
              key={info.dateStr}
              whileTap={{ scale: 0.85 }}
              onClick={() => onDay(info)}
              className="flex flex-col items-center justify-center h-12 rounded-2xl border-0 cursor-pointer relative"
              style={{
                background: isSel
                  ? "var(--ink)"
                  : hasClinic
                  ? `${primary}1a`
                  : "transparent",
              }}
            >
              <span
                className="text-[14px] font-bold w-8 h-8 flex items-center justify-center rounded-full"
                style={{
                  fontFamily: "var(--font-heebo)",
                  color: isSel
                    ? "var(--canvas)"
                    : info.isToday
                    ? "var(--coral)"
                    : "var(--ink)",
                  background: info.isToday && !isSel ? "rgba(204,120,92,0.12)" : "transparent",
                }}
              >
                {info.day}
              </span>

              {/* Dots */}
              {hasAny && (
                <div className="flex gap-0.5 mt-0.5 h-1.5 items-center absolute bottom-1">
                  {hasClinic && (
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: isSel ? "#fff" : primary }} />
                  )}
                  {hasHebrew && (
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: isSel ? "#fff" : "#8B6FF0" }} />
                  )}
                  {hasWorld && (
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: isSel ? "#fff" : "#F0A830" }} />
                  )}
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
function DayDetail({ dateStr, onClose }: { dateStr: string; onClose: () => void }) {
  const holidays = holidayMap[dateStr] ?? [];
  const colors   = clinicColorMap[dateStr] ?? [];

  const activeClinics = CLINIC_RANGES
    .filter(r => colors.includes(r.color))
    .map(r => CLINICS.find(c => c.id === r.id)!)
    .filter(Boolean);

  if (!holidays.length && !activeClinics.length) return null;

  const [y, m, d] = dateStr.split("-").map(Number);
  const label = `${d} ${HE_MONTHS[m - 1]} ${y}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 4, scale: 0.97 }}
      transition={{ duration: 0.22 }}
      className="mx-4 mb-4 rounded-3xl overflow-hidden"
      style={{ background: "var(--surface)", border: "1px solid var(--line)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3" style={{ direction: "rtl", borderBottom: "1px solid var(--line)" }}>
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
            style={{ background: `${c.accentColor}12`, border: `1px solid ${c.accentColor}2a`, direction: "rtl" }}
          >
            <div className="w-1 self-stretch rounded-full flex-shrink-0" style={{ background: c.accentColor }} />
            <div className="flex-1">
              <div className="font-bold text-[14px]" style={{ color: "var(--ink)" }}>{c.flag} {c.nameHe}</div>
              <div className="text-xs" style={{ color: "var(--ink-muted)" }}>{c.datesHe}</div>
            </div>
            <span className="text-base flex-shrink-0">💬</span>
          </a>
        ))}

        {holidays.map((h, i) => (
          <div key={i} className="flex items-center gap-3 rounded-2xl p-3"
            style={{
              background: h.kind === "hebrew" ? "rgba(139,111,240,0.08)" : h.kind === "world" ? "rgba(240,168,48,0.08)" : "var(--canvas-soft)",
              border: `1px solid ${h.kind === "hebrew" ? "rgba(139,111,240,0.2)" : h.kind === "world" ? "rgba(240,168,48,0.2)" : "var(--line)"}`,
              direction: "rtl",
            }}
          >
            <span className="text-[20px] flex-shrink-0">{h.emoji}</span>
            <div>
              <div className="font-bold text-[14px]" style={{ color: "var(--ink)" }}>{h.labelHe}</div>
              <div className="text-xs" style={{ color: "var(--ink-muted)" }}>
                {h.kind === "hebrew" ? "חג יהודי" : "אירוע עולמי"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Month sequence ── */
const MONTHS = [
  { year: 2026, month: 8  },
  { year: 2026, month: 9  },
  { year: 2026, month: 10 },
  { year: 2026, month: 11 },
  { year: 2027, month: 0  },
  { year: 2027, month: 1  },
];

export function CalendarView() {
  const [selected, setSelected] = useState<string | null>(null);

  const handleDay = (info: DayInfo) => {
    if (!info.clinicColors.length && !info.holidays.length) return;
    setSelected(s => s === info.dateStr ? null : info.dateStr);
  };

  return (
    <div className="h-full flex flex-col overflow-hidden" style={{ background: "var(--canvas)" }}>

      {/* Header */}
      <div
        className="px-5 pb-2 flex-shrink-0"
        style={{ paddingTop: "max(56px, calc(var(--sat) + 44px))", direction: "rtl" }}
      >
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.22,1,0.36,1] }}>
          <h1 className="font-black text-[38px] leading-tight" style={{ color: "var(--ink)", fontFamily: "var(--font-heebo)", letterSpacing: "-0.025em" }}>
            לוח שנה
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--ink-muted)" }}>ספטמבר 2026 – פברואר 2027</p>
        </motion.div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 px-5 pb-4 flex-shrink-0" style={{ direction: "rtl" }}>
        {[
          { color: "#10b870", label: "טיולים" },
          { color: "#8B6FF0", label: "חגים יהודיים" },
          { color: "#F0A830", label: "אירועי עולם" },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1.5 text-xs" style={{ color: "var(--ink-muted)" }}>
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
            {label}
          </div>
        ))}
      </div>

      {/* Scrollable content */}
      <div className="scroll-y flex-1 px-4" style={{ paddingBottom: "var(--nav-pad)" }}>

        <AnimatePresence mode="wait">
          {selected && (
            <DayDetail key={selected} dateStr={selected} onClose={() => setSelected(null)} />
          )}
        </AnimatePresence>

        {MONTHS.map(({ year, month }, i) => (
          <motion.div
            key={`${year}-${month}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
          >
            <MonthGrid year={year} month={month} selected={selected} onDay={handleDay} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
