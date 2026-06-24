"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BottomNav, type ViewId } from "@/components/bottom-nav";
import { StageView }      from "@/components/stage-view";
import { CategoriesView } from "@/components/categories-view";
import { EventsGrid }     from "@/components/events-grid";
import { CalendarView }   from "@/components/calendar-view";

const ORDER: ViewId[] = ["stage", "destinations", "trips", "calendar"];

export default function Home() {
  const [view, setView]   = useState<ViewId>("stage");
  const [prev, setPrev]   = useState<ViewId>("stage");

  const handleChange = (next: ViewId) => {
    setPrev(view);
    setView(next);
  };

  const dir = ORDER.indexOf(view) >= ORDER.indexOf(prev) ? 1 : -1;

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ background: "var(--canvas)" }}>
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
