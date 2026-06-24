"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BottomNav, type ViewId } from "@/components/bottom-nav";
import { StageView }      from "@/components/stage-view";
import { CategoriesView } from "@/components/categories-view";
import { EventsGrid }     from "@/components/events-grid";
import { CalendarView }   from "@/components/calendar-view";
import { LangProvider, useLang } from "@/lib/lang-context";

const ORDER: ViewId[] = ["stage", "destinations", "trips", "calendar"];

function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <button
      onClick={() => setLang(lang === "he" ? "en" : "he")}
      className="fixed z-50 flex items-center justify-center rounded-full text-[12px] font-black border-0 cursor-pointer select-none"
      style={{
        top:                  "max(18px, calc(env(safe-area-inset-top) + 12px))",
        left:                 16,
        width:                44,
        height:               44,
        background:           "rgba(255,255,255,0.88)",
        backdropFilter:       "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        boxShadow:            "0 2px 12px rgba(0,0,0,0.14)",
        color:                "#0a0a09",
        letterSpacing:        "0.02em",
      }}
    >
      {lang === "he" ? "EN" : "עב"}
    </button>
  );
}

function AppShell() {
  const [view, setView] = useState<ViewId>("stage");
  const [prev, setPrev] = useState<ViewId>("stage");

  const handleChange = (next: ViewId) => { setPrev(view); setView(next); };
  const dir = ORDER.indexOf(view) >= ORDER.indexOf(prev) ? 1 : -1;

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ background: "var(--canvas)" }}>
      <LangToggle />

      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={view}
          custom={dir}
          initial={{ opacity: 0, x: dir * 36 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: dir * -36 }}
          transition={{ duration: 0.26, ease: [0.32, 0, 0.24, 1] }}
          className="absolute inset-0"
        >
          {view === "stage"        && <StageView />}
          {view === "destinations" && <CategoriesView />}
          {view === "trips"        && <EventsGrid />}
          {view === "calendar"     && <CalendarView />}
        </motion.div>
      </AnimatePresence>

      <BottomNav active={view} onChange={handleChange} />
    </div>
  );
}

export default function Home() {
  return (
    <LangProvider>
      <AppShell />
    </LangProvider>
  );
}
