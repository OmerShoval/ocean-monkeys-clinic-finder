export type HolidayKind = "hebrew" | "world" | "clinic";

export interface Holiday {
  date: string; // "YYYY-MM-DD"
  label: string;
  labelHe: string;
  kind: HolidayKind;
  emoji: string;
}

export const HOLIDAYS: Holiday[] = [
  // ── Hebrew holidays 5787 (2026–2027) ──
  { date: "2026-09-11", label: "Rosh Hashanah", labelHe: "ראש השנה", kind: "hebrew", emoji: "🍎" },
  { date: "2026-09-12", label: "Rosh Hashanah II", labelHe: "ראש השנה ב׳", kind: "hebrew", emoji: "🍎" },
  { date: "2026-09-20", label: "Yom Kippur", labelHe: "יום כיפור", kind: "hebrew", emoji: "🕍" },
  { date: "2026-09-25", label: "Sukkot", labelHe: "סוכות", kind: "hebrew", emoji: "🌿" },
  { date: "2026-10-02", label: "Hoshana Raba", labelHe: "הושענא רבה", kind: "hebrew", emoji: "🌿" },
  { date: "2026-10-03", label: "Shemini Atzeret", labelHe: "שמיני עצרת", kind: "hebrew", emoji: "🍂" },
  { date: "2026-10-04", label: "Simchat Torah", labelHe: "שמחת תורה", kind: "hebrew", emoji: "📜" },
  { date: "2026-12-14", label: "Hanukkah", labelHe: "חנוכה", kind: "hebrew", emoji: "🕎" },
  { date: "2027-02-01", label: "Tu BiShvat", labelHe: "ט״ו בשבט", kind: "hebrew", emoji: "🌳" },
  { date: "2027-03-03", label: "Purim", labelHe: "פורים", kind: "hebrew", emoji: "🎭" },
  { date: "2027-04-01", label: "Passover", labelHe: "פסח", kind: "hebrew", emoji: "🫓" },
  { date: "2027-04-22", label: "Yom Ha'atzmaut", labelHe: "יום העצמאות", kind: "hebrew", emoji: "🇮🇱" },
  { date: "2027-05-14", label: "Lag BaOmer", labelHe: "לג בעומר", kind: "hebrew", emoji: "🔥" },
  { date: "2027-05-22", label: "Shavuot", labelHe: "שבועות", kind: "hebrew", emoji: "🌸" },

  // ── World events ──
  { date: "2026-08-01", label: "International Surf Day", labelHe: "יום הגלישה הבינלאומי", kind: "world", emoji: "🏄" },
  { date: "2026-09-01", label: "Spring (S. Hemisphere)", labelHe: "אביב (דרום)", kind: "world", emoji: "🌸" },
  { date: "2026-10-31", label: "Halloween", labelHe: "הלואין", kind: "world", emoji: "🎃" },
  { date: "2026-11-01", label: "Dia de Muertos", labelHe: "יום המתים", kind: "world", emoji: "💀" },
  { date: "2026-12-21", label: "Winter Solstice", labelHe: "היפוך חורף", kind: "world", emoji: "❄️" },
  { date: "2026-12-25", label: "Christmas", labelHe: "חג המולד", kind: "world", emoji: "🎄" },
  { date: "2026-12-31", label: "New Year's Eve", labelHe: "ליל השנה החדשה", kind: "world", emoji: "🎆" },
  { date: "2027-01-01", label: "New Year", labelHe: "שנה חדשה 2027", kind: "world", emoji: "🎉" },
  { date: "2027-02-14", label: "Valentine's Day", labelHe: "יום האהבה", kind: "world", emoji: "❤️" },
  { date: "2027-06-08", label: "World Ocean Day", labelHe: "יום האוקיינוסים", kind: "world", emoji: "🌊" },
  { date: "2027-06-21", label: "Summer Solstice", labelHe: "היפוך קיץ", kind: "world", emoji: "☀️" },

  // ── Ocean Monkeys clinic dates ──
  { date: "2026-09-01", label: "Mentawai — start", labelHe: "מנטאוואי מתחיל", kind: "clinic", emoji: "🌊" },
  { date: "2026-09-12", label: "Mentawai — end", labelHe: "מנטאוואי מסתיים", kind: "clinic", emoji: "🌊" },
  { date: "2026-10-03", label: "Philippines W1 — start", labelHe: "פיליפינים חלון 1 מתחיל", kind: "clinic", emoji: "🏄" },
  { date: "2026-10-13", label: "Philippines W1 — end", labelHe: "פיליפינים חלון 1 מסתיים", kind: "clinic", emoji: "🏄" },
  { date: "2026-10-17", label: "Philippines W2 — start", labelHe: "פיליפינים חלון 2 מתחיל", kind: "clinic", emoji: "🏄" },
  { date: "2026-10-27", label: "Philippines W2 — end", labelHe: "פיליפינים חלון 2 מסתיים", kind: "clinic", emoji: "🏄" },
  { date: "2026-11-13", label: "El Salvador — start", labelHe: "אל סלבדור מתחיל", kind: "clinic", emoji: "🌊" },
  { date: "2026-11-23", label: "El Salvador — end", labelHe: "אל סלבדור מסתיים", kind: "clinic", emoji: "🌊" },
  { date: "2027-01-05", label: "Mexico — start", labelHe: "מקסיקו מתחיל", kind: "clinic", emoji: "🏄" },
  { date: "2027-01-15", label: "Mexico — end", labelHe: "מקסיקו מסתיים", kind: "clinic", emoji: "🏄" },
  { date: "2027-01-14", label: "Sri Lanka W1 — start", labelHe: "סרי לנקה חלון 1 מתחיל", kind: "clinic", emoji: "🌊" },
  { date: "2027-01-23", label: "Sri Lanka W1 — end", labelHe: "סרי לנקה חלון 1 מסתיים", kind: "clinic", emoji: "🌊" },
  { date: "2027-01-30", label: "Sri Lanka W2 — start", labelHe: "סרי לנקה חלון 2 מתחיל", kind: "clinic", emoji: "🌊" },
  { date: "2027-02-08", label: "Sri Lanka W2 — end", labelHe: "סרי לנקה חלון 2 מסתיים", kind: "clinic", emoji: "🌊" },
];

export function holidaysForDate(date: string): Holiday[] {
  return HOLIDAYS.filter((h) => h.date === date);
}

/** Returns all dates in a clinic range */
export function clinicDateRange(start: string, end: string): string[] {
  const result: string[] = [];
  const cur = new Date(start);
  const endDate = new Date(end);
  while (cur <= endDate) {
    result.push(cur.toISOString().slice(0, 10));
    cur.setDate(cur.getDate() + 1);
  }
  return result;
}

export const CLINIC_RANGES = [
  { id: "mentawai", start: "2026-09-01", end: "2026-09-12", color: "#0e7fa8" },
  { id: "phil1",    start: "2026-10-03", end: "2026-10-13", color: "#10b870" },
  { id: "phil2",    start: "2026-10-17", end: "2026-10-27", color: "#2060c8" },
  { id: "elsalvador", start: "2026-11-13", end: "2026-11-23", color: "#e06010" },
  { id: "mexico",   start: "2027-01-05", end: "2027-01-15", color: "#c030c0" },
  { id: "srilanka1", start: "2027-01-14", end: "2027-01-23", color: "#e07820" },
  { id: "srilanka2", start: "2027-01-30", end: "2027-02-08", color: "#4060d8" },
];
