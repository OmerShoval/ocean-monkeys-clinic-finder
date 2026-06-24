const WA = "972542491388";
export const wa = (msg: string) =>
  `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;

export type ClinicStatus = "open" | "full" | "soon";
export type Level = "beginner" | "intermediate" | "advanced";
export type WaveType = "mellow" | "point" | "reef";
export type BoardType = "longboard" | "shortboard" | "any";
export type Season = "sep" | "oct" | "nov" | "jan";

export interface Clinic {
  id: string;
  name: string;
  nameHe: string;
  loc: string;
  locHe: string;
  flag: string;
  dates: string;
  datesHe: string;
  season: Season[];
  levels: Level[];
  waves: WaveType[];
  boards: BoardType[];
  desc: string;
  descHe: string;
  tags: string[];
  tagsHe: string[];
  status: ClinicStatus;
  gradient: string;
  accentColor: string;
  waMsg: string;
  /** Placeholder image (unsplash) — swap with real photos */
  image: string;
}

export const CLINICS: Clinic[] = [
  {
    id: "mentawai",
    name: "Mentawai Boat Charter",
    nameHe: "מנטאוואי — טיול סירה",
    loc: "Mentawai Islands, Indonesia",
    locHe: "איי מנטאוואי, אינדונזיה",
    flag: "🇮🇩",
    dates: "Sep 1–12, 2026",
    datesHe: "1–12 ספטמבר 2026",
    season: ["sep"],
    levels: ["intermediate", "advanced"],
    waves: ["reef"],
    boards: ["shortboard", "any"],
    desc: "World-class reef passes from a live-aboard boat — Lance's Right, HTs, Rifles. Late-season magic with the lowest crowds of the year.",
    descHe: "גלים מהטובים בעולם מסירה — Lance's Right, HTs, Rifles. קסם של סוף עונה עם הכי פחות גולשים בשנה.",
    tags: ["Boat trip", "Reef passes", "Low crowds", "No wetsuit"],
    tagsHe: ["טיול סירה", "ריפים", "מינימום עומס", "ללא חליפה"],
    status: "full",
    gradient: "linear-gradient(145deg, #071a2e 0%, #0a4a6e 60%, #0e7fa8 100%)",
    accentColor: "#0e7fa8",
    waMsg: "שלום עומר, אני מעוניין/ת להצטרף לרשימת ההמתנה של טיול הסירה למנטאוואי (1–12 ספטמבר 2026) 🌊",
    image: "/images/mentawai.jpg",
  },
  {
    id: "phil1",
    name: "Siargao — Cloud 9 (Window 1)",
    nameHe: "סיארגאו — Cloud 9 (חלון ראשון)",
    loc: "Siargao, Philippines",
    locHe: "סיארגאו, פיליפינים",
    flag: "🇵🇭",
    dates: "Oct 3–13, 2026",
    datesHe: "3–13 אוקטובר 2026",
    season: ["oct"],
    levels: ["beginner", "intermediate", "advanced"],
    waves: ["reef", "mellow"],
    boards: ["shortboard", "longboard", "any"],
    desc: "Peak Siargao season. Cloud 9's famous right for the chargers, mellow Jacking Horse for those progressing.",
    descHe: "שיא העונה בסיארגאו. Cloud 9 הימינית הנודעת לסחופים, Jacking Horse המתון לאלה שמתקדמים.",
    tags: ["All levels", "Peak season", "Reef + beach"],
    tagsHe: ["כל הרמות", "שיא העונה", "ריף + חוף"],
    status: "open",
    gradient: "linear-gradient(145deg, #0a2e1a 0%, #0a6e3a 60%, #10b870 100%)",
    accentColor: "#10b870",
    waMsg: "שלום עומר, אני מעוניין/ת לשמוע עוד על טיול גלישה לפיליפינים – חלון ראשון (3–13 אוקטובר 2026) 🏄",
    image: "/images/philippines.jpg",
  },
  {
    id: "phil2",
    name: "Siargao — Festival Window (Window 2)",
    nameHe: "סיארגאו — פסטיבל (חלון שני)",
    loc: "Siargao, Philippines",
    locHe: "סיארגאו, פיליפינים",
    flag: "🇵🇭",
    dates: "Oct 17–27, 2026",
    datesHe: "17–27 אוקטובר 2026",
    season: ["oct"],
    levels: ["intermediate", "advanced"],
    waves: ["reef"],
    boards: ["shortboard", "any"],
    desc: "Ride during the Siargao International Surfing Cup energy. Electric atmosphere, alternate breaks away from contest crowds.",
    descHe: "גלישה בזמן האנרגיה של גביע הגלישה הבינלאומי. אווירה חשמלית, גלים אלטרנטיביים מחוץ לעומס.",
    tags: ["Contest energy", "Intermediate+", "High season"],
    tagsHe: ["אנרגיית תחרות", "בינוני+", "עונת שיא"],
    status: "open",
    gradient: "linear-gradient(145deg, #0a1e2e 0%, #0a3a6e 60%, #2060c8 100%)",
    accentColor: "#2060c8",
    waMsg: "שלום עומר, אני מעוניין/ת לשמוע עוד על טיול גלישה לפיליפינים – חלון שני (17–27 אוקטובר 2026) 🏄",
    image: "/images/philippines.jpg",
  },
  {
    id: "elsalvador",
    name: "El Salvador Pointbreak Camp",
    nameHe: "אל סלבדור — מחנה פוינטברייק",
    loc: "La Libertad coast, El Salvador",
    locHe: "חוף לה ליברטד, אל סלבדור",
    flag: "🇸🇻",
    dates: "Nov 13–23, 2026",
    datesHe: "13–23 נובמבר 2026",
    season: ["nov"],
    levels: ["beginner", "intermediate", "advanced"],
    waves: ["point", "mellow"],
    boards: ["longboard", "shortboard", "any"],
    desc: "Endless peeling rights on the longest waves in Central America. Offshore mornings, 26–28°C water, longboard heaven.",
    descHe: "ימניות אינסופיות על הגלים הארוכים ביותר במרכז אמריקה. בוקר אופשור, מים של 26–28°C, גן עדן ללונגבורד.",
    tags: ["All levels", "Point breaks", "Longboard-friendly"],
    tagsHe: ["כל הרמות", "פוינטברייקס", "ידידותי ללונגבורד"],
    status: "open",
    gradient: "linear-gradient(145deg, #2a1200 0%, #8a3a00 60%, #e06010 100%)",
    accentColor: "#e06010",
    waMsg: "שלום עומר, אני מעוניין/ת לשמוע עוד על טיול גלישה לאל סלבדור (13–23 נובמבר 2026) 🌊",
    image: "/images/el-salvador.jpg",
  },
  {
    id: "mexico",
    name: "Saladita Longboard Retreat",
    nameHe: "סלאדיטה — ריטריט לונגבורד",
    loc: "Saladita, Guerrero, Mexico",
    locHe: "סלאדיטה, גררו, מקסיקו",
    flag: "🇲🇽",
    dates: "Jan 5–15, 2027",
    datesHe: "5–15 ינואר 2027",
    season: ["jan"],
    levels: ["beginner", "intermediate"],
    waves: ["mellow", "point"],
    boards: ["longboard", "any"],
    desc: "One of Mexico's premier point breaks — built for longboarding. 10 nights in a modern beachfront villa with chef meals and a lap pool.",
    descHe: "אחת מהפוינטברייקים הטובים במקסיקו — נבנה ללונגבורד. 10 לילות בווילה מודרנית על חוף הים עם שף ובריכה.",
    tags: ["Longboard paradise", "Villa stay", "Chef meals"],
    tagsHe: ["גן עדן ללונגבורד", "ווילה על הים", "שף"],
    status: "open",
    gradient: "linear-gradient(145deg, #1e0a30 0%, #6a1a80 60%, #c030c0 100%)",
    accentColor: "#c030c0",
    waMsg: "שלום עומר, אני מעוניין/ת לשמוע עוד על טיול גלישה למקסיקו – סלאדיטה (5–15 ינואר 2027) 🏄",
    image: "/images/mexico.jpg",
  },
  {
    id: "srilanka1",
    name: "Sri Lanka South Coast (Window 1)",
    nameHe: "סרי לנקה — חוף דרום (חלון ראשון)",
    loc: "Ahangama / Mirissa, Sri Lanka",
    locHe: "אהנגמה / מיריסה, סרי לנקה",
    flag: "🇱🇰",
    dates: "Jan 14–23, 2027",
    datesHe: "14–23 ינואר 2027",
    season: ["jan"],
    levels: ["beginner", "intermediate"],
    waves: ["mellow", "point"],
    boards: ["longboard", "shortboard", "any"],
    desc: "The friendliest waves we run. Soft beach breaks for first turns, playful points for longboarding, plus an overnight in the Ella highlands.",
    descHe: "הגלים הידידותיים ביותר שלנו. בריכות חול לתורות ראשונות, פוינטים ללונגבורד, ולינה בהרי אלה.",
    tags: ["Beginner-friendly", "Ella overnight", "Nature & culture"],
    tagsHe: ["ידידותי למתחילים", "לינה באלה", "טבע ותרבות"],
    status: "open",
    gradient: "linear-gradient(145deg, #1e1000 0%, #7a3800 60%, #e07820 100%)",
    accentColor: "#e07820",
    waMsg: "שלום עומר, אני מעוניין/ת לשמוע עוד על טיול גלישה לסרי לנקה – חלון ראשון (14–23 ינואר 2027) 🌊",
    image: "/images/sri-lanka.jpg",
  },
];

export const SEASON_LABEL: Record<Season, string> = {
  sep: "ספטמבר 2026",
  oct: "אוקטובר 2026",
  nov: "נובמבר 2026",
  jan: "ינואר 2027",
};
