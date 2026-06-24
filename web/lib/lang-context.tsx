"use client";

import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export type Lang = "he" | "en";

interface LangCtxValue { lang: Lang; setLang: (l: Lang) => void }
const LangCtx = createContext<LangCtxValue>({ lang: "he", setLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("he");
  return <LangCtx.Provider value={{ lang, setLang }}>{children}</LangCtx.Provider>;
}

export const useLang = () => useContext(LangCtx);
