"use client";

import { motion } from "motion/react";
import { useLang } from "@/lib/lang-context";

export type ViewId = "stage" | "destinations" | "trips" | "calendar";

interface NavItem { id: ViewId; emoji: string; labelHe: string; labelEn: string }

const NAV: NavItem[] = [
  { id: "stage",        emoji: "🌊", labelHe: "בית",     labelEn: "Home"     },
  { id: "destinations", emoji: "🗺️",  labelHe: "יעדים",   labelEn: "Spots"    },
  { id: "trips",        emoji: "🎫", labelHe: "טיולים",  labelEn: "Trips"    },
  { id: "calendar",     emoji: "📅", labelHe: "לוח שנה", labelEn: "Calendar" },
];

export function BottomNav({
  active, onChange,
}: { active: ViewId; onChange: (id: ViewId) => void }) {
  const { lang } = useLang();

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-50 flex justify-center px-4"
      style={{ paddingBottom: "max(16px, env(safe-area-inset-bottom))" }}
    >
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 280, damping: 26, delay: 0.15 }}
        className="flex items-center gap-1 p-1.5 rounded-full"
        style={{
          background:           "rgba(255,255,255,0.9)",
          backdropFilter:       "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border:               "1px solid rgba(0,0,0,0.08)",
          boxShadow:            "0 8px 40px rgba(0,0,0,0.14), 0 1px 4px rgba(0,0,0,0.06)",
        }}
      >
        {NAV.map((item) => {
          const on = active === item.id;
          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.91 }}
              onClick={() => onChange(item.id)}
              aria-label={lang === "he" ? item.labelHe : item.labelEn}
              className="relative flex items-center rounded-full h-11 cursor-pointer border-0 outline-none select-none"
              style={{
                background:   on ? "#0a0a09" : "transparent",
                gap:          on ? 8 : 0,
                paddingLeft:  on ? 14 : 12,
                paddingRight: on ? 16 : 12,
                minWidth:     44,
                transition:   "background 0.18s ease, padding 0.18s ease",
              }}
            >
              <span className="text-[19px] leading-none flex-shrink-0">{item.emoji}</span>
              <motion.span
                initial={false}
                animate={{ width: on ? "auto" : 0, opacity: on ? 1 : 0 }}
                transition={{ type: "spring", stiffness: 380, damping: 34 }}
                className="overflow-hidden whitespace-nowrap text-[12px] font-bold"
                style={{ color: "#f9f8f4", display: "block" }}
              >
                {lang === "he" ? item.labelHe : item.labelEn}
              </motion.span>
            </motion.button>
          );
        })}
      </motion.nav>
    </div>
  );
}
